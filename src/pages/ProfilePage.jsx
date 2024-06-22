import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import profile from '../assets/profileicon.jpg'

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">User Profile</h1>
          <Link to="/profile/edit" className="bg-purple-600 hover:bg-purple-800 text-white py-2 px-4 rounded-lg">
            Edit Profile
          </Link>
        </div>
        <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg">
          <div className="flex items-center mb-8">
            <img
              src={userInfo.profilePicture || profile}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-600"
            />
            <div className="ml-6">
              <h2 className="text-3xl font-semibold">{userInfo.name}</h2>
              <p className="text-lg text-gray-400">{userInfo.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Bio</h3>
              <p className="text-gray-300">{userInfo.bio || 'No bio available'}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Contact</h3>
              <p className="text-gray-300">{userInfo.contact || 'No contact information available'}</p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Social Links</h3>
            <div className="flex space-x-4">
              {userInfo.socialLinks?.facebook && (
                <a href={userInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-400">
                  Facebook
                </a>
              )}
              {userInfo.socialLinks?.twitter && (
                <a href={userInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-200">
                  Twitter
                </a>
              )}
              {userInfo.socialLinks?.linkedin && (
                <a href={userInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-600">
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
