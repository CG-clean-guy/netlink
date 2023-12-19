import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <nav className="fixed top-0 left-0 max-h-12 w-full flex flex-1 flex-row bg-yellow-500 text-black">
        <div>
          <div className="h-10 flex flex-1 items-center justify-start mx-3 cursor-pointer hover:scale-105 transition-all duration-300" onClick={playSound}>
            <img src="cglogo.png" alt="logo" className="h-8" />
          </div>
        </div>
        <ul className="text-sm flex flex-row space-x-5 justify-start items-center">
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
            >
              {toggleHelp? "Minimize Help" : "Help"}
            </button>
          </li>
        </ul>
        <div className="flex flex-1 justify-end items-center text-sm mx-4">
          <button
            onClick={() => {user? toast.success(`Hi, ${user.name}! `) : toast.warning("If you need a username and password please contact the program administrator.")}}
          >
            <div className="flex flex-row items-center">
            {user && (<img src={user.img} alt={user.name} className="w-5 h-5 rounded-full mr-1 border-[1px] border-black drop-shadow-md" />)}
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
