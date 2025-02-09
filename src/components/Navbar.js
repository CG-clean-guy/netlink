import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hero from "./Hero";

const Navbar = ({toggleHelp, setToggleHelp, user, onLogout, onLogin}) => {

const handleHelpToggle =() => {
  setToggleHelp(!toggleHelp)
}

const playSound = () => {
  const heySound = new Audio("/hey.aac");
  heySound.play();
};

  return (
    <>
      <nav className="fixed top-0 left-0 max-h-20 w-full flex flex-1 flex-row bg-yellow-500 text-black">
        <div>
          <div className="h-14 flex flex-1 items-center justify-start mx-3 cursor-pointer hover:scale-105 transition-all duration-300" onClick={playSound}>
            <img src="cglogo.png" alt="logo" className="h-8" />
          </div>
        </div>
        <ul className="text-md flex flex-row space-x-5 justify-start items-center">
          <li className="hover:text-gray-500 active:scale-90 transition-all duration-150 ease-in">
            <a href="/">Home</a>
          </li>
          <li className="hover:text-gray-500 active:scale-90 transition-all duration-150 ease-in">
            <button
              onClick={() => {
                toast.info("PathLink built by Jason Ross Levy ©️2023");
              }}
            >
              About
            </button>
          </li>
          <li className="hover:text-gray-500 active:scale-90 transition-all duration-150 ease-in">
            <button
              onClick={handleHelpToggle}
            ><div className="flex flex-row">Help <h1 className={`ml-1 transition-transform duration-200 ${toggleHelp ? "rotate-90" : "rotate-0"}`}>→</h1></div>
              
            </button>
          </li>
        </ul>
          <div className={`absolute top-12 left-10 md:left-20 bg-neutral-400 border-2 shadow-md drop-shadow-lg p-5 rounded-xl transition-all duration-300 ease-in-out ${toggleHelp ? "z-50 opacity-100 translate-y-1" : "-z-50 opacity-0 -translate-y-1 invisible"}`}>
          <Hero />
          </div>
        <div className="flex flex-1 justify-end items-center text-md mx-4">
          <button
            onClick={() => {user? toast.success(`Hi, ${user.name}! `) : toast.warning("If you need a username and password please contact the program administrator.")}}
          >
            <div className="flex flex-row items-center">
            {user && (<img src={user.img} alt={user.name} className="w-10 h-10 bg-black rounded-full mr-1 border-[2px] border-black drop-shadow-md" />)}
            {user? `${user.name}` : "Login"}
            </div>
          </button>
          {user && (<button onClick={onLogout} className="ml-5">Log Out</button>)}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
