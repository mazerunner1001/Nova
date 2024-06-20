import React from 'react'
import logo from '../assets/logo.png'
import SidebarWithBurgerMenu from './Drawer'
import ProfileMenu from './ProfileMenu'
import NotificationsMenu from './NotificationsMenu'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <header className="header flex py-2">
        <SidebarWithBurgerMenu className="md:block hidden" />
        <div className=" container ml-5 flex items-cente justify-between">
          <a href="navbar.html" className="header__logo flex items-center">
            <img src={logo} alt="logo" id="logo" className="w-8 mr-2 hover:animate-spin" />
            <h1 className="text-white text-3xl font-bold">Project-X</h1>
          </a>
          <form className="rounded-3xl mt-3 translate-x-[-60px] h-10 bg-black bg-opacity-50 lg:block hidden" method="GET" action="">
            <label className=" py-1.5 px-4 flex space-x-12 xl:space-x-32 2xl:space-x-52">
              <input name="q" placeholder="Search for posts" className="bg-transparent text-white outline-none" />
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 w-6 h-6" viewBox="-3 -3 36 36">
                <title>search</title>
                <path d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12s-12 5.383-12 12c0 6.617 5.383 12 12 12 2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10s4.486-10 10-10c5.514 0 10 4.486 10 10s-4.486 10-10 10z" style={{ stroke: "rgb(72, 120, 165)", strokeWidth: 2 }}></path>
              </svg>
            </label>
          </form>


          <div className="md:block hidden">

            {userInfo ? (
              <><nav className="profile absolute flex space-x-8 mt-2 right-32">
                <Link to="/" className="text-gray-300 hover:text-gray-600 text-[16px] mt-3">Explore</Link>
                <p className="text-gray-500 text-2xl mt-2">|</p>
                <NotificationsMenu />
              </nav>
                <ProfileMenu />
              </>
            ) : (
              <div className="flex space-x-4 absolute mt-3 right-16">
                <a href="/login" className="text-white">Login</a>
                <a href="/signup" className="text-white">Sign Up</a>
              </div>
            )}


          </div>
        </div>
      </header>
    </>


  )
}

export default Navbar
