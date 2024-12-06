import { useApiContext } from "@/context-provider/ApiProvider";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function AlumniForm() {
  const { handleSubmitForm } = useApiContext();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    middleName: "",
    phoneNumber: "",
    graduatedYear: "",
    previousJob: "",
    currentJob: "",
    locationOrCountry: "",
    supervisor: "",
    advice: "",
    social: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    setPayload((prev) => ({ ...prev, phoneNumber }));
    setErrors((prev) => ({ ...prev, phoneNumber: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    handleSubmitForm(errors, payload, setErrors, setLoading, setPayload);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12  lg:px-8">
      <div className="max-w-7xl w-full space-y-8 bg-white shadow-xl rounded-xl p-10">

        <div className="text-center">
          <h2 className="lg:text-3xl text-2xl font-extrabold text-gray-900">
            FUNAAB Alumni Network
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Help us strengthen our academic community by sharing your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "firstName",
              "middleName",
              "lastName",
              "emailAddress",
              "graduatedYear",
              "previousJob",
              "currentJob",
              "locationOrCountry",
              "supervisor",
              "social",
            ].map((field) => (
              <div key={field} className="space-y-1">
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={payload[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                />
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-500">{errors[field]}</p>
                )}
              </div>
            ))}

            <div className="space-y-1">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <PhoneInput
                country="us"
                value={payload.phoneNumber}
                onChange={handlePhoneNumberChange}
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                  className:
                    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                }}
                containerStyle={{ width: "100%" }}
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="advice"
              className="block text-sm font-medium text-gray-700"
            >
              Advice for the Department
            </label>
            <textarea
              id="advice"
              name="advice"
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={payload.advice}
              onChange={handleChange}
              placeholder="Share your insights and suggestions"
            />
            {errors.advice && (
              <p className="mt-1 text-xs text-red-500">{errors.advice}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Submitting..." : "Submit Alumni Information"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
