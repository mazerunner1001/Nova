import React from "react";
import logo from '../assets/logo.png';
import {
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const SidebarWithBurgerMenu = () => {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div className="relative z-50">
        <button className="ml-5 w-10 h-10 my-1 rounded-full hover:backdrop-brightness-50 hover:shadow-md" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-6 w-6 stroke-white stroke-2" />
          ) : (
            <Bars3Icon className="h-6 w-6 translate-x-2 stroke-white stroke-2" />
          )}
        </button>
      </div>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeDrawer}
        ></div>
      )}
      <div className={`fixed inset-y-0 left-0 w-64 bg-drawer-P z-50 transform transition-transform ease-in-out duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="ml-4 mb-5 flex items-center gap-2 px-6 pb-6 pt-4">
          <img
            src={logo}
            alt="brand"
            className="h-8 w-8"
          />
         <h1 className="text-white text-3xl font-bold">Project-X</h1>
        </div>
        <div className="overflow-auto">
          <ul>
            <li>
              <button className="flex py-3 px-2 w-11/12 rounded-lg mx-3 hover:bg-primary-dark" onClick={() => handleOpen(1)}>
                <PresentationChartBarIcon className="text-gray-400 ml-2 h-5 w-5" />
                <span className="ml-10 text-white">Dashboard</span>
              </button>
              {open === 1 && (
                <ul className="pl-4">
                  <li className="text-gray-300 p-2 mx-auto">Analytics</li>
                  <li className="text-gray-300 p-2 mx-auto">Reporting</li>
                  <li className="text-gray-300 p-2 mx-auto">Projects</li>
                </ul>
              )}
            </li>
            <li>
              <button className="flex py-3 px-2 w-11/12 rounded-lg mx-3 hover:bg-primary-dark" onClick={() => handleOpen(2)}>
                <ShoppingBagIcon className="text-gray-400 ml-2 h-5 w-5" />
                <span className="ml-10 text-white">E-Commerce</span>
              </button>
              {open === 2 && (
                <ul className="pl-4">
                  <li className="text-gray-300 p-2 mx-auto">Orders</li>
                  <li className="text-gray-300 p-2 mx-auto">Products</li>
                </ul>
              )}
            </li>
            <hr className="my-2 border-gray-400 w-10/12 mx-auto" />
            <button className="flex py-3 px-2 w-11/12 rounded-lg mx-3 hover:bg-primary-dark">
              <InboxIcon className="text-gray-400 ml-2 h-5 w-5" />
              <span className="ml-10 text-white">Inbox</span>
              <Chip value="14" size="sm" className="ml-16 rounded-full" />
            </button>
            <button className="flex py-3 px-2 w-11/12 rounded-lg mx-3 hover:bg-primary-dark">
              <UserCircleIcon className="text-gray-400 ml-2 h-5 w-5" />
              <span className="ml-10 text-white">Profile</span>
            </button>
            <button className="flex py-3 px-2 w-11/12 rounded-lg mx-3 hover:bg-primary-dark">
              <Cog6ToothIcon className="text-gray-400 ml-2 h-5 w-5" />
              <span className="ml-10 text-white">Settings</span>
            </button>
            <button className="flex py-3 px-2 w-11/12 rounded-lg mx-3 hover:bg-primary-dark">
              <PowerIcon className="text-gray-400 ml-2 h-5 w-5" />
              <span className="ml-10 text-white">Log Out</span>
            </button>
          </ul>
          <hr className="my-2 border-gray-400 w-10/12 mx-auto" />
          <div className="mt-16 p-4">
            <CubeTransparentIcon className="text-gray-400 mb-4 h-12 w-12" />
            <h6 className="mb-1 text-white">Upgrade to PRO</h6>
            <p className="text-sm font-normal text-white opacity-80">
              Upgrade to Material Tailwind PRO and get even more components,
              plugins, advanced features and premium.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-sm font-medium text-white opacity-80" onClick={() => setOpenAlert(false)}>
                Dismiss
              </a>
              <a href="#" className="text-sm font-medium text-white">
                Upgrade Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarWithBurgerMenu;
