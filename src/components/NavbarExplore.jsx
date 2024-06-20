import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import SidebarWithBurgerMenu from '../components/Drawer';
import ProfileMenu from '../components/ProfileMenu';
import NotificationsMenu from '../components/NotificationsMenu';
import Discover from '../components/Discover';
import SearchBar from './search';

const NavbarExplore = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getLinkClass = (path) => {
    return location.pathname === path ? 'border-b-[3px] border-white' : '';
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full flex py-2 z-10 transition-colors duration-150 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}`}>
        <SidebarWithBurgerMenu />
        <div className="container ml-5 flex items-center justify-between">
          <a href="navbar.html" className="header__logo flex items-center">
            <img src={logo} alt="logo" id="logo" className="w-8 mr-2 hover:animate-spin" />
            <h1 className="text-white text-3xl font-bold">Project-X</h1>
          </a>
          <div className="ml-16 translate-y-[4px] xl:block hidden mx-auto space-x-6">
            <Link to="/" className={`text-white hover:text-gray-500 font-medium font-sans pb-3 ${getLinkClass('/')}`}>Home</Link>
            <Link to="/popular" className={`text-white hover:text-gray-500 font-medium font-sans pb-3 ${getLinkClass('/popular')}`}>Popular</Link>
            <Link to="/top_rated" className={`text-white hover:text-gray-500 font-medium font-sans pb-3 ${getLinkClass('/top_rated')}`}>Top Rated</Link>
            <Link to="/upcoming" className={`text-white hover:text-gray-500 font-medium font-sans pb-3 ${getLinkClass('/upcoming')}`}>Upcoming</Link>
            <Discover />
          </div>
          <div className="profile md:block hidden absolute mt-2 right-32">
            {userInfo ? (
              <div className="flex items-center space-x-8">
                <SearchBar />
                <Link to="/feed" className="text-gray-300 hover:text-gray-500 mt-1 font-medium font-sans">Feed</Link>
                <span className="text-2xl text-gray-500">|</span>
                <NotificationsMenu />
              </div>
            ) : (
              <div className="flex space-x-4 translate-x-16 right-16">
                <Link to="/login" className="text-white hover:text-gray-500">Login</Link>
                <Link to="/signup" className="text-white hover:text-gray-500">Sign Up</Link>
              </div>
            )}
          </div>
          {userInfo && <ProfileMenu />}
        </div>
      </header>
    </>
  );
};

export default NavbarExplore;
