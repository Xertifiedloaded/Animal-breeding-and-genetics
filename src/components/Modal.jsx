import React from 'react';
import { FaLinkedin, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { MdCall, MdEmail } from 'react-icons/md';

export default function ResponseModal({ closeModal, selectedRow }) {
  const mail = () => {
    window.location.href = `mailto:${selectedRow.emailAddress}`;
  };

  const call = () => {
    window.location.href = `tel:${selectedRow.phoneNumber}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-4 sm:mx-6 lg:mx-8 transform transition-all duration-300 ease-in-out">
        
        <div className="flex items-center mb-6">
          <img
            src={selectedRow.avatar || 'https://via.placeholder.com/150'}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border border-gray-200 shadow-sm mr-4"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800">{selectedRow.firstName} {selectedRow.lastName}</h2>
            <p className="text-sm text-gray-500">{selectedRow.currentJob}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Contact Information</h3>
          <div className="flex flex-col space-y-3">
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
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Additional Details</h3>
          <div className="space-y-2">
            <p><strong>Middle Name:</strong> {selectedRow.middleName || 'N/A'}</p>
            <p><strong>Supervisor:</strong> {selectedRow.supervisor || 'N/A'}</p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
              <p><strong>Advice:</strong> {selectedRow.advice || 'No advice provided.'}</p>
            </blockquote>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Admin Actions</h3>
          <div className="flex flex-col space-y-3">
            <button
              onClick={mail}
              className="flex items-center justify-center w-full bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition duration-150"
            >
              <FaEnvelope className="mr-2" />
              Send Email
            </button>
            <button
              onClick={call}
              className="flex items-center justify-center w-full bg-green-100 text-green-600 py-2 rounded-lg hover:bg-green-200 transition duration-150"
            >
              <FaPhoneAlt className="mr-2" />
              Call
            </button>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          {selectedRow.linkedin && (
            <a href={`https://linkedin.com/in/${selectedRow.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800 transition duration-150">
              <FaLinkedin className="text-2xl" />
            </a>
          )}
          {selectedRow.twitter && (
            <a href={`https://twitter.com/${selectedRow.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition duration-150">
              <FaTwitter className="text-2xl" />
            </a>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition ease-in-out duration-150"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}