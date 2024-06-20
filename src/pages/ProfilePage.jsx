import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className=" text-white min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
  
      <form onSubmit={submitHandler} className="flex flex-col space-y-4 w-full max-w-sm">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm mb-1 font-medium">Name</label>
          <input
            type="name"
            id="name"
            className="rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm mb-1 font-medium">Email Address</label>
          <input
            type="email"
            id="email"
            className="rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm mb-1 font-medium">Password</label>
          <input
            type="password"
            id="password"
            className="rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="rounded-md px-3 py-2 border mb-6 border-gray-700 focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
  
        <button type="submit" className="bg-blue-500 rounded-full hover:bg-blue-700 text-white font-bold py-2 px-4rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
          Update
        </button>
        {isLoading && (
          <div className="text-center mt-2">Updating profile...</div>
        )}
      </form>
    </div>
  );
  
};

export default ProfileScreen;