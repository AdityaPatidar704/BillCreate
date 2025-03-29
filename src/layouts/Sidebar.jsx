import React from "react";
import { NavLink } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import myimage from "../assets/Logo2.png"
const Sidebar = () => {
  return (
    <>
      {/* Header Section */}
      <div className="font-roboto bg-gray-200">
      <div className="flex h-14 items-center justify-between gap-8 px-4 sm:px-6 bg-[#3A5B76] w-screen p-6">
            <div className="flex items-center">
                <h1>
                    <img className="w-[120px] h-[50px] object-contain" src={myimage} alt="" />
                </h1>
            </div>
            <button id="menu-toggle" className="sm:hidden text-white focus:outline-none">
            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
            </svg>
        </button>
            <div className="flex items-center gap-40 max-md:hidden">

                <div className="flex items-center gap-3 max-md:hidden">
                    {/* Theme Icon */}
                    <form className="justify-content p-1">
                        <button>
                            <svg 
                                className="absolute right-48 bg-white rounded-full top-2.5 w-9 p-2 text-gray-700" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" 
                                />
                            </svg>
                        </button>      
                    </form>

                    {/* Notification Icon */}
                    <form className="justify-content p-1">
                        <button>
                            <svg 
                                className="absolute right-36 bg-white rounded-full top-2.5 w-9 p-2 text-gray-700" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                                />
                            </svg>
                        </button>
                    </form>

                    {/* Profile Icon */}
                    <form className="justify-content p-1">
                        <button>
                            <svg 
                                className="absolute right-24 bg-white rounded-full top-2.5 w-9 p-2 text-gray-700" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M12 11c2.485 0 4.5-2.015 4.5-4.5S14.485 2 12 2 7.5 4.015 7.5 6.5 9.515 11 12 11zm0 2c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7z"
                                />
                            </svg>
                        </button>
                    </form>

                    {/* Logout Icon */}
                    <form className="justify-content p-1">
                      <NavLink to="/">
                        <button>
                            <svg 
                                className="absolute right-12 bg-blue-50 rounded-full top-2.5 w-9 p-2 text-gray-700 hover:bg-red-600 hover:text-white" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" 
                                />
                            </svg>
                        </button>    
                        </NavLink>       
                    </form>
                </div>
            </div>
        </div>

        {/* White navigation bar starting */}
        <nav className="bg-white w-full">
            <div className="container mx-auto px-4">
                <div className="hidden sm:flex justify-center gap-4 py-2">
            <NavLink to="/dashboard">
                <button className="py-1 px-4 text-gray-500 hover:text-gray-950 focus:outline-none border-b-2 border-transparent hover:border-[#3A5B76] focus:border-[#3A5B76]">
                    Dashboard
                </button>
                    </NavLink>
                    <NavLink to="/display">
                <button className="py-1 px-4 text-gray-500 hover:text-gray-700 focus:outline-none border-b-2 border-transparent hover:border-[#3A5B76] focus:border-[#3A5B76]">
                    Customer
                </button>
                </NavLink>
                <NavLink to="/products">
                <button className="py-1 px-4 text-gray-500 hover:text-gray-700 focus:outline-none border-b-2 border-transparent hover:border-[#3A5B76] focus:border-[#3A5B76]">
                    Items
                </button>
                </NavLink>
                <NavLink to="/invoices">
                <button className="py-1 px-4 text-gray-500 hover:text-gray-700 focus:outline-none border-b-2 border-transparent hover:border-[#3A5B76] focus:border-[#3A5B76]">
                    Sales
                </button>
                </NavLink>
                <NavLink to="/challan">
                <button className="py-1 px-4 text-gray-500 hover:text-gray-700 focus:outline-none border-b-2 border-transparent hover:border-[#3A5B76] focus:border-[#3A5B76]">
                    Purchase
                </button>
                </NavLink>
                <NavLink to="/quotation">
                <button className="py-1 px-4 text-gray-500 hover:text-gray-700 focus:outline-none border-b-2 border-transparent hover:border-[#3A5B76] focus:border-[#3A5B76]">
                    Automated Bills
                </button>
                </NavLink>
                <button className="py-1 px-4 text-gray-500 hover:text-gray-700 focus:outline-none border-b-2 border-transparent hover:border-[#3A5B76] focus:border-[#3A5B76]">
                    Users
                </button>
                <button className="py-1 px-4 text-gray-500 hover:text-gray-700 focus:outline-none border-b-2 border-transparent hover:border-[#3A5B76] focus:border-[#3A5B76]">
                    Reports
                </button>
                <NavLink to="/bussiness-profile">
                <button className="py-1 px-4 text-gray-500 hover:text-gray-700 focus:outline-none border-b-2 border-transparent hover:border-[#3A5B76] focus:border-[#3A5B76]">
                    Bussiness
                </button>
                </NavLink>
            </div>
            </div>
        </nav>
        </div>
    </>
  );
};

export default Sidebar;