import React from 'react'

export default function JoinAction() {
  return (
    <div className="bg-blue-600 text-white py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
      <p className="max-w-2xl mx-auto mb-8 text-xl">
        Connect with fellow alumni, stay updated on research, and contribute
        to our ongoing mission.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100">
          Update Profile
        </button>
        <button className="border border-white px-8 py-3 rounded-lg hover:bg-blue-700">
          Upcoming Events
        </button>
      </div>
    </div>
  </div>
  )
}
