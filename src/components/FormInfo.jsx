import { useApiContext } from "@/context-provider/ApiProvider";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function FormInfo() {
  const { handleSubmitForm } = useApiContext()
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
    setPayload((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    setPayload((prevData) => ({
      ...prevData,
      phoneNumber,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      phoneNumber: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    handleSubmitForm(errors,payload,setErrors,setLoading,setPayload)

  };

  return (
    <main className="w-[90%] mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="w-full translate-y-[-60px] p-8 bg-white shadow-lg rounded-lg mt-12 border border-gray-200">
          <p className="text-xl font-semibold text-gray-800 mb-6">
            Dear Esteemed Geneticists,
          </p>
          <p className="text-xs lg:text-[16px] text-gray-700 leading-[1.4] lg:leading-[1.5]">
            The Department of Animal Breeding and Genetics at FUNAAB invites you to complete this Alumni Survey Form and join our vibrant ABG family. Your insights are invaluable to us as we reconnect and strengthen our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            'firstName',
            'middleName',
            'lastName',
            'emailAddress',
            'graduatedYear',
            'previousJob',
            'currentJob',
            'locationOrCountry',
            'supervisor',
            'social',
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="text-sm mb-1" htmlFor={field}>
                {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
              </label>
              <input
                type="text"
                id={field}
                name={field}
                className="p-3 h-[45px] placeholder:text-sm text-[16px] rounded-md border border-gray-300 w-full outline-none"
                value={payload[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
              />
              {errors[field] && <span>{errors[field]}</span>}
            </div>
          ))}
          <div className="flex flex-col">
            <label className="text-sm mb-1" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <PhoneInput
              id="phoneNumber"
              className="h-[45px] text-[16px] placeholder:text-sm rounded-md border border-gray-300 w-full outline-none"
              placeholder="Provide your Phone Number for instance +234"
              name="phoneNumber"
              value={payload.phoneNumber}
              onChange={handlePhoneNumberChange}
              country="us"
              inputProps={{ required: true }}
            />
            {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
          </div>
        </div>
        <div>
          <label className="text-sm mb-1" htmlFor="advice">
            Advice for the Department:
          </label>
          <textarea
            id="advice"
            name="advice"
            className="p-3 h-[150px] placeholder:text-sm text-[16px] rounded-md border border-gray-300 w-full outline-none"
            value={payload.advice}
            onChange={handleChange}
            placeholder="Advice for the Department"
          />
          {errors.advice && <span>{errors.advice}</span>}
        </div>
        <div className="text-center">
          <button
            className="w-full md:w-[20%] h-[50px] rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'SUBMIT'}
          </button>
        </div>
      </form>
    </main>
  );
}