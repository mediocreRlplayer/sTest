"use client";

// importing react / axios
import React, { useState } from "react";
import axios from "axios";
import { convertToE164 } from "@/utils/helpers";
import { smsDisclosure } from "@/utils/data/smsDisText";

export default function Form() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    referralCode: "",
    referralName: "",
    sms: false,
  });

  // timecrunch fix dropping all checks and just sending to klaviyo

  const handleKlaviyoSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const klaviyoUrl = "api/klaviyo/general";
    const klaviyoFormData = {
      type: "profile",
      attributes: {
        email: formData.email.toLowerCase(),
        phone_number: convertToE164(formData.phone),
        first_name: formData.firstName.toLowerCase(),
        last_name: formData.lastName.toLowerCase(),
        properties: {
          generalSignup: true,
          refCode: formData.referralCode
            ? formData.referralCode.toLowerCase()
            : "",
          referrerName: formData.referralCode
            ? formData.referralName.toLowerCase()
            : "",
        },
      },
    };
    try {
      const response = await axios.post(klaviyoUrl, {
        data: klaviyoFormData,
        boolean: formData.sms,
      });
    } catch (error) {
      console.error(error);
      setSubmitMessage("Something went wrong. Please try again.");
    }
    setSubmitMessage("Success! Thank you for signing up!");
    setIsSubmitted(true);
    setIsLoading(false);
  };

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // prevent default form submission behavior
    setIsLoading(true); // set loading state to true

    const airtableUrl = "api/airtable/table-npfl";
    const klaviyoUrl = "api/klaviyo/general";

    let existingAirtableRecord = false;
    let existingKlaviyoRecord = false;
    let airtableRecordId = "";
    let klaviyoRecordId = "";

    const airtableFormData = {
      Email: formData.email.toLowerCase(),
      Phone: formData.phone,
      FirstName: formData.firstName.toLowerCase(),
      LastName: formData.lastName.toLowerCase(),
      RefCode: formData.referralCode ? formData.referralCode.toLowerCase() : "",
    };

    const klaviyoFormData = {
      type: "profile",
      attributes: {
        email: formData.email.toLowerCase(),
        phone_number: convertToE164(formData.phone),
        first_name: formData.firstName.toLowerCase(),
        last_name: formData.lastName.toLowerCase(),
        properties: {
          npflSignup: true,
          refCode: formData.referralCode
            ? formData.referralCode.toLowerCase()
            : "",
          referrerName: formData.referralCode
            ? formData.referralName.toLowerCase()
            : "",
        },
      },
    };

    const jsonFormData = JSON.stringify(airtableFormData);

    // Check if record already exists on Airtable
    try {
      const response = await axios.get(airtableUrl);
      response.data.forEach((record: any) => {
        if (
          record.fields.Email.toLowerCase() === formData.email.toLowerCase()
        ) {
          existingAirtableRecord = true;
          airtableRecordId = record.id;
        }
      });
    } catch (error) {
      console.error(error);
    }

    /* Check if record already exists on Klaviyo only sending 20 records need to add pagination
    try {
      const response = await axios.get(klaviyoUrl);
      console.log(response.data.data);
      response.data.data.forEach((record: any) => {
        if (
          record.attributes.email.toLowerCase() === formData.email.toLowerCase()
        ) {
          existingKlaviyoRecord = true;
          klaviyoRecordId = record.id;
        }
      });
    } catch (error) {
      console.error(error);
    }
    */

    // If record does not exist, create a new record on both Airtable and Klaviyo
    if (!existingAirtableRecord && !existingKlaviyoRecord) {
      try {
        const response = await axios.post(airtableUrl, jsonFormData);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await axios.post(klaviyoUrl, {
          data: klaviyoFormData,
          boolean: formData.sms,
        });
      } catch (error) {
        console.error(error);
      }

      setSubmitMessage("Success! Thank you for signing up!");

      // If record exists on Klaviyo but not on Airtable, create a new record on Airtable and update the existing record on Klaviyo
    } else if (!existingAirtableRecord && existingKlaviyoRecord) {
      try {
        const response = await axios.post(airtableUrl, jsonFormData);
      } catch (error) {
        console.error(error);
      }

      const klaviyoFormUpdateData = {
        id: klaviyoRecordId,
        data: {
          data: {
            type: "profile",
            id: klaviyoRecordId,
            attributes: klaviyoFormData.attributes,
          },
        },
      };

      try {
        const response = await axios.patch(klaviyoUrl, klaviyoFormUpdateData);
      } catch (error) {
        console.error(error);
      }
      setSubmitMessage("Success! Thank you for signing up!");

      // If record exists on Airtable but not on Klaviyo, create a new record on Klaviyo and update the existing record on Airtable
    } else if (existingAirtableRecord && !existingKlaviyoRecord) {
      try {
        const response = await axios.post(klaviyoUrl, {
          data: klaviyoFormData,
          boolean: formData.sms,
        });
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await axios.put(airtableUrl, {
          id: airtableRecordId,
          fields: airtableFormData,
        });
      } catch (error) {
        console.error(error);
      }

      setSubmitMessage("Success! Thank you for signing up!");

      // If record exists on both Airtable and Klaviyo, update the existing records
    } else if (existingAirtableRecord && existingKlaviyoRecord) {
      const klaviyoFormUpdateData = {
        id: klaviyoRecordId,
        data: {
          data: {
            type: "profile",
            id: klaviyoRecordId,
            attributes: klaviyoFormData.attributes,
          },
        },
      };

      try {
        const response = await axios.patch(klaviyoUrl, klaviyoFormUpdateData);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await axios.put(airtableUrl, {
          id: airtableRecordId,
          fields: airtableFormData,
        });
      } catch (error) {
        console.error(error);
      }

      setSubmitMessage("Looks like you've already signed up! Thank you!");
    } else {
      setSubmitMessage("Something went wrong. Please try again.");
    }

    setIsSubmitted(true);
    setIsLoading(false);
  };

  // Function to handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "email") {
      // Email validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        // Invalid email format
        setIsError(true);
        // You can display an error message or handle the invalid email format as needed
      } else {
        setIsError(false);
      }
    } else if (name === "phone") {
      // Remove all non-digit characters from the phone number
      updatedValue = value.replace(/\D/g, "");

      // Limit the phone number to a maximum of 10 characters
      updatedValue = updatedValue.slice(0, 10);

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

    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSmsChange = (e: any) => {
    setFormData({ ...formData, sms: e.target.checked });
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="w-full md:w-1/2 py-[3rem]">
            <h2 className="text-2xl text-center font-bold mb-5 animate-pulse">
              Loading...
            </h2>
          </div>
        </>
      ) : isSubmitted ? (
        <div className="w-full md:w-1/2 py-[3rem]">
          <h2 className="text-2xl text-center font-bold mb-5">
            {submitMessage}
          </h2>
        </div>
      ) : (
        <form
          className="w-full md:w-1/2 py-[3rem] mx-auto"
          onSubmit={handleKlaviyoSubmit}
        >
          <div className="flex flex-col md:flex-row justify-between items-center px-3">
            {/* input-box */}
            <div className="flex flex-col gap-5 w-full md:w-3/4 mx-auto">
              <div className="flex flex-col justify-between items-center">
                {/* Email */}
                {/* Invalid email label */}
                {isError && (
                  <label htmlFor="email" className="text-red-500">
                    Invalid email format
                  </label>
                )}
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                placeholder="Phone"
                max={10}
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
              />

              {/* First Name */}
              <input
                type="text"
                name="firstName"
                id="first-name"
                required
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="form-input"
              />

              {/* Last Name */}
              <input
                type="text"
                name="lastName"
                id="last-name"
                required
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-input"
              />

              {/* Referral Code */}
              <input
                type="text"
                name="referralCode"
                id="referral"
                // required
                placeholder="Referral Code"
                value={formData.referralCode}
                onChange={handleInputChange}
                className="form-input"
              />
              <input
                type="text"
                name="referralName"
                id="referralName"
                // required
                placeholder="Referral Name"
                value={formData.referralName}
                onChange={handleInputChange}
                className="form-input"
              />

              {/* Sms consent */}
              <div className="flex justify-center">
                <input
                  style={{ transform: "scale(1.5)", marginRight: "1rem" }}
                  type="checkbox"
                  name="sms"
                  id="sms"
                  onChange={handleSmsChange}
                />
                <label htmlFor="sms"> Opt in to SMS</label>
              </div>
              <p className="text-center">{smsDisclosure}</p>

              {/* Submit */}
              <div className="flex flex-col justify-between items-center">
                <button type="submit" className="submit-button">
                  Submit
                </button>

                <p className="w-full text-[.8rem] text-center uppercase mt-[1rem]">
                  *Limited to the first 100 signups
                </p>
                <br />
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
