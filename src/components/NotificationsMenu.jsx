import React, { useState, useEffect, useRef } from 'react';

const NotificationsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        id="dropdownNotificationButton"
        onClick={toggleDropdown}
        className="relative inline-flex items-center text-sm mt-4 font-medium text-center text-gray-400 hover:text-white focus:outline-none"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
        <div className="absolute block w-3 h-3 bg-red-500 border-2 border-gray-800 rounded-full -top-0.5 start-2.5" />
      </button>
      {isOpen && (
        <div
          id="dropdownNotification"
          className="absolute right-0 mt-2 z-20 w-80 max-w-lg bg-gray-900 divide-y divide-gray-700 rounded-lg shadow-lg"
        >
          <div className="block px-4 py-2 font-medium text-center text-white rounded-t-lg bg-gray-900">
            Notifications
          </div>
          <div className="divide-y divide-gray-700">
            <a href="#" className="flex px-4 py-3 hover:bg-gray-800">
              <div className="flex-shrink-0">
                <img className="rounded-full w-11 h-11" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgB730p0ChSl_CNr5N6n05AGzEtEAhFypOFg&s" alt="Jese image" />
                <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-gray-800 rounded-full">
                  <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                    <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                  </svg>
                </div>
              </div>
              <div className="w-full ps-3">
                <div className="text-gray-400 text-sm mb-1.5">New message from <span className="font-semibold text-white">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                <div className="text-xs text-blue-500">a few moments ago</div>
              </div>
            </a>
          </div>
          <a
            href="#"
            className="block py-2 text-sm font-medium text-center text-white rounded-b-lg bg-gray-900 hover:bg-gray-800"
          >
            <div className="inline-flex items-center">
              <svg
                className="w-4 h-4 me-2 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              View all
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default NotificationsMenu;
