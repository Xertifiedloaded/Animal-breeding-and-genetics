import React from 'react';
import { FaLinkedin, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { MdCall, MdEmail } from 'react-icons/md';

export default function ResponseModal({ closeModal, selectedRow }) {
    const mail = () => {
        window.location.href = `mailto:${selectedRow.emailAddress}`;
    }

    const call = () => {
        window.location.href = `tel:${selectedRow.phoneNumber}`;
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 w-full md:w-[50%] shadow-lg">
                <div className="flex items-center mb-6">
                    <img
                        src={selectedRow.avatar || 'https://via.placeholder.com/150'}
                        alt="User Avatar"
                        className="sm:w-16 sm:h-16 rounded-full w-10 h-10 mr-4"
                    />
                    <div>
                        <h2 className="sm:text-2xl text-sm  font-bold">{selectedRow.firstName} {selectedRow.lastName}</h2>
                        <p className="text-gray-600 text-xs sm:text-sm">{selectedRow.currentJob}</p>
                    </div>
                </div>

                <div className="space-y-2 mb-6">
                    <p className="flex  sm:text-lg items-center"><FaMapMarkerAlt className="mr-2 text-xs sm:text-lg text-gray-600" /> {selectedRow.locationOrCountry}</p>
                </div>

                <div className="space-y-3 mb-6">
                    <p className="flex  items-center cursor-pointer">
                        <MdEmail className="mr-2  text-gray-600" />
                        <strong>Email:</strong> {selectedRow.emailAddress}
                    </p>
                    <p className="flex items-center cursor-pointer"><MdCall className="mr-2 text-gray-600" />
                        <strong>Phone Number:</strong> {selectedRow.phoneNumber}
                    </p>
                    <p><strong>Middle Name:</strong> {selectedRow.middleName}</p>
                    <p><strong>Supervisor:</strong> {selectedRow.supervisor}</p>
                    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 h-24 overflow-y-auto">
                        <p><strong>Advice:</strong> {selectedRow.advice}</p>
                    </blockquote>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-bold text-blue-700 mb-2">Admin Actions</h3>
                    <div className="space-y-2">
                        <p onClick={mail} className="flex justify-center items-center cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition ease-in-out duration-150">
                            <FaEnvelope className="mr-2 text-blue-600" />
                            <span className="text-blue-600 font-semibold">Send Email</span>
                        </p>
                        <p onClick={call} className="flex items-center justify-center cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition ease-in-out duration-150">
                            <FaPhoneAlt className="mr-2 text-blue-600" />
                            <span className="text-blue-600 font-semibold">Call</span>
                        </p>
                    </div>
                </div>

                <div className="flex space-x-4 mb-6">
                    <a href={`https://linkedin.com/in/${selectedRow.linkedin}`} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-blue-700 text-2xl" />
                    </a>
                    <a href={`https://twitter.com/${selectedRow.twitter}`} target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-blue-500 text-2xl" />
                    </a>
                </div>

                <button className="mt-4 px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition ease-in-out duration-150" onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>
    );
}