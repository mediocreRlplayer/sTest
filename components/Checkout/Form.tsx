"use client";

// importing next / react / axios
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

// importing helpers / fonts
import { convertToE164 } from "@/utils/helpers";
import { titleFont } from "@/utils/fonts";

// importing crossmint
import {
  CrossmintPaymentElement,
  useCrossmintEvents,
} from "@crossmint/client-sdk-react-ui";

const goldClientId = process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_ID_GOLD as string;
const crimsonClientId = process.env
  .NEXT_PUBLIC_CROSSMINT_CLIENT_ID_CRIMSON as string;

export default function Form({ membership }: { membership: string }) {
  const [email, setEmail] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [klaviyoProfileId, setKlaviyoProfileId] = useState<string>("");
  const [enabledSMS, setEnabledSMS] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("emailCapture"); // "" shows crossmint payment form

  const { listenToMintingEvents } = useCrossmintEvents({
    environment: "staging", // staging | production
  });

  // Function to validate the email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
  };

  // Call the validateEmail function whenever the email state changes
  useEffect(() => {
    validateEmail(email);
  }, [email]);

  // Function to handle phone number input change
  const handlePhoneInputChange = (e: any) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "phone") {
      // Remove all non-digit characters from the phone number
      updatedValue = value.replace(/\D/g, "");

      // Limit the phone number to a maximum of 10 characters
      updatedValue = updatedValue.slice(0, 10);

      // Check if the phone number has exactly 10 digits
      if (updatedValue.length !== 10) {
        // Invalid phone number format
        setPhoneError(true);
        // You can display an error message or handle the invalid phone number format as needed
      } else {
        setPhoneError(false);
      }

      // Add dashes to the phone number
      if (updatedValue.length > 3 && updatedValue.length <= 6) {
        updatedValue = `${updatedValue.slice(0, 3)}-${updatedValue.slice(3)}`;
      } else if (updatedValue.length > 6) {
        updatedValue = `${updatedValue.slice(0, 3)}-${updatedValue.slice(
          3,
          6
        )}-${updatedValue.slice(6)}`;
      }
    }

    setPhonenumber(updatedValue);
  };

  // Handling crossmint events
  function onEvent(event: any) {
    switch (event.type) {
      case "payments:collection.sold-out":
        setStatus("soldOut");
        break;
      case "payment:process.started":
        console.log("Payment started");
        setStatus("paymentProcessing");
        break;
      case "payment:process.succeeded":
        console.log("Payment succeeded");
        const { orderIdentifier } = event.payload;
        listenToMintingEvents({ orderIdentifier: orderIdentifier }, (event) => {
          switch (event.type) {
            case "order:process.started":
              console.log("Minting started");
              setStatus("mintingStarted");
              break;
            case "order:process.finished":
              console.log("Minting finished");
              setStatus("mintingFinished");
              break;
            case "transaction:fulfillment.succeeded":
              console.log("Minting succeeded");

              // Adding the user to the correct member list
              handleUserBoughtMembership();
              setStatus("mintingSucceeded");
              break;
            case "transaction:fulfillment.failed":
              console.log("Minting failed");
              setStatus("mintingFailed");
              break;
            default:
              break;
          }
        });
        break;
      default:
        break;
    }
  }

  const handleSumbitEmail = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    let walletAddress = "";
    const crossObject = {
      email: email.toLowerCase(),
      chain: "polygon",
    };

    // Creating a wallet with crossmint
    try {
      const response = await axios.post(
        "/api/crossmint/createWallet",
        crossObject
      );

      if (response.status === 200) {
        setWalletAddress(response.data.publicKey);
        walletAddress = response.data.publicKey;
      } else {
        console.log("Error creating wallet");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error(error);
    }

    const smsChecked = e.target.sms.checked;
    const klaviyoEmailCheckUrl = "/api/klaviyo/findByEmail";
    const klaviyoUrl =
      membership === "gold"
        ? "/api/klaviyo/gold"
        : "/api/klaviyo/crimson-signup"; // once crimson is available change this to /api/klaviyo/crimson
    const klaviyoFormData = {
      type: "profile",
      attributes: {
        email: email.toLowerCase(),
        phone_number: convertToE164(phonenumber),
        external_id: walletAddress,
        properties:
          membership === "gold"
            ? {
                is_gold: true,
                crossmintWalletAddress: walletAddress,
                signupDate: new Date().toISOString(),
              }
            : {
                is_crimson: true,
                crossmintWalletAddress: walletAddress,
                signupDate: new Date().toISOString(),
              },
      },
    };

    try {
      const klaviyoResponse = await axios.post(klaviyoEmailCheckUrl, {
        email: email.toLowerCase(),
      });

      // If the user exists in Klaviyo
      if (klaviyoResponse.data.data.length > 0) {
        const phoneNumber =
          klaviyoResponse.data.data[0].attributes.phone_number;
        const klaviyoId = klaviyoResponse.data.data[0].id;
        setKlaviyoProfileId(klaviyoId);
        const klaviyoFormUpdateData = {
          id: klaviyoId,
          data: {
            data: {
              type: "profile",
              id: klaviyoId,
              attributes: {
                email: email.toLowerCase(),
                phone_number: phoneNumber,
                external_id: walletAddress,
                properties:
                  membership === "gold"
                    ? {
                        is_gold: true,
                        crossmintWalletAddress: walletAddress,
                        signupDate: new Date().toISOString(),
                      }
                    : {
                        is_crimson: true,
                        crossmintWalletAddress: walletAddress,
                        signupDate: new Date().toISOString(),
                      },
              },
            },
          },
          sms: smsChecked,
        };

        if (smsChecked) {
          if (phoneNumber === null) {
            setLoading(false);
            setStatus("smsCapture");
            return;
          } else {
            // user exists in Klaviyo and has a phone number, updating user with sms and wallet address
            try {
              const response = await axios.patch(
                klaviyoUrl,
                klaviyoFormUpdateData
              );

              if (response.status === 200) {
                setStatus(
                  membership === "gold" ? "crossmintCheckout" : "crimsonSignup"
                );
                setLoading(false);
              }
            } catch (error) {
              console.error(error);
              setLoading(false);
            }
          }
        } else {
          // user exists in Klaviyo but does not want sms, updating user with wallet address
          try {
            const response = await axios.patch(
              klaviyoUrl,
              klaviyoFormUpdateData
            );

            if (response.status === 200) {
              setStatus(
                membership === "gold" ? "crossmintCheckout" : "crimsonSignup"
              );
              setLoading(false);
            }
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        }

        // If the user does not exist in Klaviyo
      } else {
        if (smsChecked) {
          setLoading(false);
          setStatus("smsCapture");
          return;
        } else {
          // Adding user to Klaviyo and making a wallet with crossmint
          try {
            const response = await axios.post(klaviyoUrl, {
              data: klaviyoFormData,
              sms: false,
            });

            if (response.status === 200) {
              setStatus(
                membership === "gold" ? "crossmintCheckout" : "crimsonSignup"
              );
              setLoading(false);
              return;
            }
          } catch (error) {
            console.error(error);
            setLoading(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSumbitPhone = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const klaviyoUrl =
      membership === "gold"
        ? "/api/klaviyo/gold"
        : "/api/klaviyo/crimson-signup";
    const klaviyoFormData = {
      // Create new user in Klaviyo
      type: "profile",
      attributes: {
        email: email.toLowerCase(),
        phone_number: convertToE164(phonenumber),
        external_id: walletAddress,
        properties:
          membership === "gold"
            ? {
                is_gold: true,
                crossmintWalletAddress: walletAddress,
                signupDate: new Date().toISOString(),
              }
            : {
                is_crimson: true,
                crossmintWalletAddress: walletAddress,
                signupDate: new Date().toISOString(),
              },
      },
    };
    const klaviyoFormUpdateData = {
      // Update existing user in Klaviyo
      id: klaviyoProfileId,
      data: {
        data: {
          type: "profile",
          id: klaviyoProfileId,
          attributes: {
            email: email.toLowerCase(),
            phone_number: convertToE164(phonenumber),
            external_id: walletAddress,
            properties:
              membership === "gold"
                ? {
                    is_gold: true,
                    crossmintWalletAddress: walletAddress,
                    signupDate: new Date().toISOString(),
                  }
                : {
                    is_crimson: true,
                    crossmintWalletAddress: walletAddress,
                    signupDate: new Date().toISOString(),
                  },
          },
        },
      },
      sms: true, // This submit is handled after the user has already opted in to sms
    };

    // If the user exists in Klaviyo, update the user with the wallet address and phone number
    if (klaviyoProfileId !== "") {
      try {
        const response = await axios.patch(klaviyoUrl, klaviyoFormUpdateData);

        if (response.status === 200) {
          setStatus(
            membership === "gold" ? "crossmintCheckout" : "crimsonSignup"
          );
          setLoading(false);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      // If the user does not exist in Klaviyo, create a new user with the wallet address and phone number
      try {
        const response = await axios.post(klaviyoUrl, {
          data: klaviyoFormData,
          sms: true,
        });

        if (response.status === 200) {
          setStatus(
            membership === "gold" ? "crossmintCheckout" : "crimsonSignup"
          );
          setLoading(false);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleUserBoughtMembership = async () => {
    const klaviyoUrl =
      membership === "gold"
        ? "/api/klaviyo/gold/buyer"
        : "/api/klaviyo/crimson/buyer";
    const klaviyoFormUpdateData = {
      // Update existing user in Klaviyo
      id: klaviyoProfileId,
      data: {
        data: {
          type: "profile",
          id: klaviyoProfileId,
          attributes: enabledSMS
            ? {
                email: email.toLowerCase(),
                phone_number: convertToE164(phonenumber),
                external_id: walletAddress,
                properties:
                  membership === "gold"
                    ? {
                        is_gold_buyer: true,
                        crossmintWalletAddress: walletAddress,
                        signupDate: new Date().toISOString(),
                      }
                    : {
                        is_crimson_buyer: true,
                        crossmintWalletAddress: walletAddress,
                        signupDate: new Date().toISOString(),
                      },
              }
            : {
                email: email.toLowerCase(),
                external_id: walletAddress,
                properties:
                  membership === "gold"
                    ? {
                        is_gold_buyer: true,
                        crossmintWalletAddress: walletAddress,
                        signupDate: new Date().toISOString(),
                      }
                    : {
                        is_crimson_buyer: true,
                        crossmintWalletAddress: walletAddress,
                        signupDate: new Date().toISOString(),
                      },
              },
        },
      },
      sms: enabledSMS, // This submit is handled after the user has already opted in to sms
    };

    try {
      const response = await axios.patch(klaviyoUrl, klaviyoFormUpdateData);

      if (response.status === 200) {
        console.log("Bought membership");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center w-full">
        {status !== "emailCapture" && (
          <button
            className="w-[300px] px-3 py-1 bg-black hover:bg-black/80 border-2 border-black rounded text-white transition-colors duration-300 ease-in-out"
            onClick={() => setStatus("emailCapture")}
          >
            Back
          </button>
        )}
      </div>

      <div className="relative flex flex-col justify-center items-center h-full">
        <div
          className={`flex flex-col justify-center items-center w-full h-full min-h-[600px] bg-white ${
            status !== "crossmintCheckout" ? "z-20" : "z-[-1]"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-3xl font-bold text-center">Loading...</h1>
                <h2>Do not close this window</h2>

                <div className="animate-spin rounded-full h-[4rem] w-[4rem] border-t-2 border-b-2 border-gray-900"></div>
              </div>
            </div>
          ) : status === "crimsonSignup" ? (
            <>
              <div className="mx-auto">
                <h1 className="text-3xl font-bold text-center">
                  Thanks for signing up!
                </h1>

                <h2 className="text-center">
                  We'll contact you when the crimson pass drops
                </h2>
              </div>
            </>
          ) : status === "emailCapture" ? ( // Email capture
            <>
              <form
                onSubmit={handleSumbitEmail}
                className="flex flex-col justify-center items-center gap-5 min-h-[400px] h-full"
              >
                <h1
                  className={`text-3xl font-bold text-center ${titleFont.className}`}
                >
                  Ready to become a member?
                </h1>

                <h2>Enter your email to get started</h2>

                <input
                  type="text"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[300px] p-1 pl-3 border-2 border-black rounded"
                />

                <div className="flex justify-center w-full ml-2">
                  <input
                    style={{ transform: "scale(1.3)", marginRight: "1rem" }}
                    type="checkbox"
                    name="sms"
                    id="sms"
                    onChange={(e) => setEnabledSMS(e.target.checked)}
                  />
                  <label htmlFor="sms">Sign me up for SMS alerts</label>
                </div>

                {membership === "gold" ? (
                  <button
                    type="submit"
                    className="w-[300px] p-1 bg-black hover:bg-black/80 disabled:bg-gray-300 border-2 border-black rounded text-white disabled:text-gray-500 transition-colors duration-300 ease-in-out"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-[300px] p-1 bg-black hover:bg-black/80 disabled:bg-gray-300 border-2 border-black rounded text-white disabled:text-gray-500 transition-colors duration-300 ease-in-out"
                  >
                    Sign Up
                  </button>
                )}
              </form>
            </>
          ) : status === "smsCapture" ? ( // Phone number capture
            <>
              <form
                onSubmit={handleSumbitPhone}
                className="flex flex-col justify-center items-center gap-5 min-h-[400px] h-full"
              >
                <h1
                  className={`text-3xl font-bold text-center ${titleFont.className}`}
                >
                  Help us connect!
                </h1>

                <h2>Enter your phone number to continue</h2>

                <input
                  className="w-full p-1 border-2 border-black rounded"
                  type="text"
                  name="phone"
                  placeholder="555-555-5555"
                  value={phonenumber}
                  onChange={(e) => handlePhoneInputChange(e)}
                />

                <p className="text-[.8rem]">
                  {"* Must be a valid US Phone number"}
                </p>

                <button
                  type="submit"
                  disabled={phoneError}
                  className="w-[300px] p-1 bg-black hover:bg-black/80 disabled:bg-gray-300 border-2 border-black rounded text-white disabled:text-gray-500 transition-colors duration-300 ease-in-out"
                >
                  Continue
                </button>
              </form>
            </>
          ) : status === "paymentProcessing" ? (
            <div className="flex justify-center items-center w-full h-full">
              <div className="flex flex-col justify-center items-center gap-5 min-h-[400px] h-full">
                <h1 className="text-3xl font-bold text-center animate-pulse">
                  Processing your payment...
                </h1>

                <h2 className="text-red-500 font-bold text-center">
                  Do not close this window, this can take a few minutes to
                  complete!
                </h2>

                <div className="animate-spin rounded-full h-[2rem] w-[2rem] border-t-2 border-b-2 border-gray-900" />
              </div>
            </div>
          ) : status === "mintingStarted" || status === "mintingSucceeded" ? (
            <div className="flex justify-center items-center w-full h-full">
              <div className="flex flex-col justify-center items-center gap-5 min-h-[400px] h-full">
                <h1 className="text-3xl font-bold text-center">
                  Minting your membership...
                </h1>

                <h2 className="text-red-500 font-bold text-center">
                  Do not close this window, this can take a few minutes to
                  complete!
                </h2>

                <div className="animate-spin rounded-full h-[2rem] w-[2rem] border-t-2 border-b-2 border-gray-900" />
              </div>
            </div>
          ) : status === "mintingFinished" ? (
            <div className="flex justify-center items-center w-full h-full min-h-[400px]">
              <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-3xl font-bold text-center">
                  Minting succeeded!
                </h1>

                <h2>Your membership has been emailed to you!</h2>

                <Link
                  href="https://help.crossmint.com/hc/en-us/articles/9612476375309-Tell-me-more-about-my-Crossmint-wallet-"
                  target="_blank"
                >
                  Crossmint Wallet Help
                </Link>
              </div>
            </div>
          ) : status === "mintingFailed" ? (
            <div className="flex justify-center items-center w-full h-full min-h-[400px]">
              <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-3xl font-bold text-center">
                  Minting failed
                </h1>
                <h2>Try again, if it fails again contact us!</h2>
              </div>
            </div>
          ) : status === "soldOut" ? (
            <div className="flex justify-center items-center w-full h-full min-h-[400px]">
              <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-3xl font-bold text-center">Sold out</h1>
                <h2>Looks like we're sold out!</h2>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-full min-h-[400px]">
              <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-3xl font-bold text-center">Error</h1>
                <h2>Something went wrong</h2>
              </div>
            </div>
          )}
        </div>

        <div
          className={`${
            membership !== "gold" ? "hidden" : "flex"
          } justify-center items-center w-[300px] absolute ${
            status === "crossmintCheckout" ? "z-20" : "z-[-1]"
          }`}
        >
          <CrossmintPaymentElement
            clientId={membership === "gold" ? goldClientId : crimsonClientId}
            environment="staging" // "production" | "staging"
            recipient={{
              email: email,
              wallet: walletAddress,
            }}
            currency="USD"
            locale="en-US"
            uiConfig={{
              colors: {
                background: "#ffffff",
                backgroundSecondary: "#ffffff",
                backgroundTertiary: "#000000",
                textPrimary: "#000000",
                textSecondary: "#ffffff",
                accent: "#C6990B",
                danger: "#C63B0B",
                textLink: "#C6990B",
              },
              fontSizeBase: "1rem",
              spacingUnit: "0.25rem",
              borderRadius: "4px",
              fontWeightPrimary: "500",
              fontWeightSecondary: "500",
            }}
            mintConfig={{
              type: "erc-721",
              totalPrice: membership === "gold" ? "50" : "20",
              _quantity: 1,
            }}
            // @ts-ignore
            onEvent={onEvent}
          />
        </div>
      </div>
    </>
  );
}
