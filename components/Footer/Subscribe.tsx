"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Subsribe() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
  });

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // prevent default form submission behavior
    setIsLoading(true); // set loading state to true

    const airtableUrl = "api/airtable/table-subscribe";
    const klaviyoUrl = "api/klaviyo/newsletter";
    const klaviyoEmailCheckUrl = "api/klaviyo/findByEmail";

    let existingAirtableRecord = false;
    let existingKlaviyoRecord = false;
    let airtableRecordId = "";
    let klaviyoRecordId = "";

    const airtableFormData = {
      Email: formData.email.toLowerCase(),
    };

    const klaviyoFormData = {
      type: "profile",
      attributes: {
        email: formData.email.toLowerCase(),
        properties: {
          subscribe: true,
        },
      },
    };

    const jsonFormData = JSON.stringify(airtableFormData);

    // Check if record already exists on Airtable and Klaviyo
    try {
      const airTableResponse = await axios.get(airtableUrl);
      airTableResponse.data.forEach((record: any) => {
        if (
          record.fields.Email.toLowerCase() === formData.email.toLowerCase()
        ) {
          existingAirtableRecord = true;
          airtableRecordId = record.id;
        }
      });

      const klaviyoResponse = await axios.post(klaviyoEmailCheckUrl, {
        email: formData.email.toLowerCase(),
      });

      if (klaviyoResponse.data.data.length > 0) {
        existingKlaviyoRecord = true;
        klaviyoRecordId = klaviyoResponse.data.data[0].id;
      }
    } catch (error) {
      console.error(error);
    }

    // If record does not exist, create a new record on both Airtable and Klaviyo
    if (!existingAirtableRecord && !existingKlaviyoRecord) {
      try {
        const response = await axios.post(klaviyoUrl, {
          data: klaviyoFormData,
        });
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await axios.post(airtableUrl, jsonFormData);
      } catch (error) {
        console.error(error);
      }

      setSubmitMessage("Success! Thank you for signing up!");

      // If record exists on Klaviyo but not on Airtable, create a new record on Airtable and update the existing record on Klaviyo
    } else if (!existingAirtableRecord && existingKlaviyoRecord) {
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
        const response = await axios.post(airtableUrl, jsonFormData);
      } catch (error) {
        console.error(error);
      }

      setSubmitMessage("Success! Thank you for signing up!");

      // If record exists on Airtable but not on Klaviyo, create a new record on Klaviyo and update the existing record on Airtable
    } else if (existingAirtableRecord && !existingKlaviyoRecord) {
      try {
        const response = await axios.post(klaviyoUrl, {
          data: klaviyoFormData,
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
        console.log("Patch Response for Klaviyo: ", response);
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
    }

    setFormData({ ...formData, [name]: updatedValue });
  };

  return (
    <form onSubmit={handleSubmit}>
      {isLoading ? (
        <>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl text-center font-bold mb-5 animate-pulse">
              Loading...
            </h2>
          </div>
        </>
      ) : isSubmitted ? (
        <div className="flex flex-col justify-center items-center">
          <p className="my-[2rem] text-white text-center text-[2rem] font-bold">
            {submitMessage}
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-5 mt-[2rem] px-3">
            {/* Email */}
            <div className="flex flex-col justify-between items-center">
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-[300px] md:w-[350px] h-[50px] rounded-[10px] border-[1px] border-[#E2E0DF] px-[1rem] text-[1.2rem] text-[#101212] focus:outline-none focus:ring-[#101212] ${
                  isError ? "focus:border-red-500" : "focus:border-[#101212]"
                }  shadow`}
              />
            </div>

            <button
              type="submit"
              disabled={isError || isLoading}
              className="w-[150px] h-[50px] mx-auto rounded-[10px] bg-[#101212] text-[1.2rem] text-white disabled:text-gray-600 focus:outline-none focus:ring-[#101212] focus:border-[#101212] shadow disabled:scale-100 hover:scale-105 transition-all ease-in-out duration-500"
            >
              Subscribe
            </button>
          </div>
        </>
      )}
    </form>
  );
}
