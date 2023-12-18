import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import PathConverter from "./components/PathConverter";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";

function App() {
  const [toggleHelp, setToggleHelp] = useState(false) 
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const playSound = () => {
    const heySound = new Audio("/karatechop.mp3");
    heySound.play();
  };

  return (
    <div className="flex flex-col items-center bg-black/80 h-screen">
      <header className="text-white font-semibold mb-10">
        <Navbar toggleHelp={toggleHelp} setToggleHelp={setToggleHelp} user={user} onLogout={handleLogout} onLogin={handleLogin} />
        <div className="flex flex-col justify-center items-center mt-10">
          <img src="cglogo.png" alt="Logo" onClick={playSound} className="w-20 h-20 mt-5 cursor-pointer hover:scale-105 hover:animate-spin transition-all duration-300"/>
          <h1 className="font-bold text-lg m-4">Welcome to PathLink{user? `, ${user.name}!`: "!"}</h1>
          {toggleHelp && (
          <Hero />
          )}
        </div>
      </header>
      <div className="flex flex-col justify-center items-center w-screen">
        {user ? (
        <PathConverter user={user} />
        ): (<Login onLogin={handleLogin} />)}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        className="text-sm"
      />
    </div>
  );
}

export default App;
