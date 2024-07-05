import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Designer from '../assets/Designer.png';
import logo from '../assets/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '../components/loader.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center text-white relative">
      <img
        src={Designer}
        alt="designer"
        className="absolute inset-0 w-full h-full object-cover bg-gray-500 bg-opacity-75"
      />
      <div className="absolute bg-black opacity-30 inset-0 z-0" />
      <div className="absolute bg-gradient-to-b h-20 from-black to-transparent inset-0 z-0">
        <div className="flex items-center justify-center absolute top-4 left-4 mb-6 space-x-2">
          <img src={logo} alt="logo" className="w-12 mb-2 hover:animate-spin" />
          <div className="text-4xl font-bold text-white">Nova</div>
        </div>
      </div>

      <div className="relative flex mx-auto w-[450px] flex-col lg:flex-row items-center justify-center bg-black bg-opacity-100 py-8 px-16 rounded-xl">
        <div className="w-full z-20">
          <div className="flex justify-center space-x-4 mb-6">
          <span className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg border-2 border-white">
              <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </span>
            <span className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg border-2 border-white">
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
            </span>
            <span className="w-10 h-10 flex items-center justify-center rounded-full font-bold text-2xl border-2 border-white">G</span>
            
          </div>
          <p className="text-gray-100 mb-6">or use email to login</p>
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 text-md rounded-lg bg-gray-900 border-2 border-gray-600 shadow-lg shadow-black focus:ring-3 focus:ring-primary-300"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full p-2 text-md rounded-lg bg-gray-900 border-2 border-gray-600 shadow-lg shadow-black focus:ring-3 focus:ring-primary-300"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-300 cursor-pointer">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-gray-300 hover:underline">Forgot password?</a>
            </div>

            {isLoading && <Loader />}

            <button
              type="submit"
              className="w-full p-3 text-lg rounded-full bg-orange-500 hover:bg-orange-700 focus:outline-none uppercase"
            >
              Sign in
            </button>
            <p className="text-gray-300">
              Don't have an account? <Link to="/signup" className="text-gray-100 hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="absolute bottom-4 flex justify-center space-x-8 w-full">
        <a href="https://x.com/praneethswarna" className="cursor-pointer ">
          <span>
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </span>
        </a>
        <a href="https://www.facebook.com/praneethchandra123/" className="cursor-pointer">
          <span>
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </span>
        </a>
        <a href="https://www.instagram.com/praneethchandra123/" className="cursor-pointer">
          <span>
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </span>
        </a>
        <a href="https://github.com/mazerunner1001" className="cursor-pointer translate-y-[-4px]">
          <span>
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 28 28">
              <path
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
};

export default LoginPage;
