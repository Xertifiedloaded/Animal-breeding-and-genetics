import React from 'react';
import {
  FaLinkedin,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';
import { MdCall, MdEmail } from 'react-icons/md';

export default function ResponseModal({ closeModal, selectedRow }) {
  const mail = () => {
    window.location.href = `mailto:${selectedRow.emailAddress}`;
  };

  const call = () => {
    window.location.href = `tel:${selectedRow.phoneNumber}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex text-xs lg:text-sm items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-xl p-6 mx-4 max-w-md sm:max-w-lg lg:max-w-2xl transition-transform duration-300 ease-in-out transform">
        <div className="flex items-center mb-4">
          <img
            src={selectedRow.avatar || 'https://via.placeholder.com/150'}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-2 border-blue-400 shadow-md mr-4"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800">
              {selectedRow.firstName} {selectedRow.lastName}
            </h2>
            <p className="text-sm text-gray-500 italic">{selectedRow.currentJob}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-3">Contact Information</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <FaMapMarkerAlt className="text-blue-600 mr-2" />
            <span>{selectedRow.locationOrCountry || 'Location not provided'}</span>
          </div>
          <div className="flex items-center text-gray-700 cursor-pointer" onClick={mail}>
            <MdEmail className="text-blue-600 mr-2" />
            <span>{selectedRow.emailAddress || 'Email not provided'}</span>
          </div>
          <div className="flex items-center text-gray-700 cursor-pointer" onClick={call}>
            <MdCall className="text-blue-600 mr-2" />
            <span>{selectedRow.phoneNumber || 'Phone number not provided'}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-blue-600 border-b border-gray-300 pb-2 mt-4 mb-2">Additional Details</h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Middle Name:</strong> {selectedRow.middleName || 'N/A'}
          </p>
          <p>
            <strong>Supervisor:</strong> {selectedRow.supervisor || 'N/A'}
          </p>
          <div className="max-h-32 overflow-y-auto border-l-4 border-blue-400 pl-4 text-gray-600">
            <p>
              <strong>Advice:</strong> {selectedRow.advice || 'No advice provided.'}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-blue-600 border-b border-gray-300 pb-2 mt-4 mb-2">Admin Actions</h3>
        <div className="flex flex-col space-y-2">
          <button
            onClick={mail}
            className="flex items-center justify-center w-full bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition duration-150 shadow-md"
          >
            <FaEnvelope className="mr-2" />
            Send Email
          </button>
          <button
            onClick={call}
            className="flex items-center justify-center w-full bg-green-100 text-green-600 py-2 rounded-lg hover:bg-green-200 transition duration-150 shadow-md"
          >
            <FaPhoneAlt className="mr-2" />
            Call
          </button>
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          {selectedRow.linkedin && (
            <a
              href={`https://linkedin.com/in/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800 transition duration-150"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          )}
          {selectedRow.twitter && (
            <a
              href={`https://twitter.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition duration-150"
            >
              <FaTwitter className="text-2xl" />
            </a>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition ease-in-out duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
