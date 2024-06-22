import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../slices/authSlice';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('#dropdownAvatar')) {
        closeDropdown();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="md:block hidden absolute top-2 right-10 w-8 h-8 mt-4 mb-2 hover:cursor-pointer bg-gray-800 rounded-full md:me-0"
        type="button"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgB730p0ChSl_CNr5N6n05AGzEtEAhFypOFg&s"
          alt="user photo"
        />
      </button>
      {/* Dropdown menu */}
      <div
        id="dropdownAvatar"
        className={`z-10 ${isOpen ? 'block' : 'hidden'} absolute right-10 top-[72px] bg-gray-900 divide-y divide-gray-700 rounded-lg shadow w-44 `}
      >
        <div className="px-4 py-3 text-sm text-white">
          <div>{userInfo.name}</div>
        </div>
        <ul
          className="py-2 text-sm text-gray-300 dark:text-gray-200"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <li>
            <Link
              to = "/profile"
              className="block px-4 py-2 hover:bg-gray-800"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/profile/edit"
              className="block px-4 py-2 hover:bg-gray-800 "
            >
              Settings
            </Link>
          </li>
        </ul>
        <div className="py-2">
          <a
            href="#" onClick = {() => logoutHandler()}
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
          >
            Sign out
          </a>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
