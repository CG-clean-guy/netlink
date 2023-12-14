import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import PathConverter from "./components/PathConverter";

function App() {
  const [toggleHelp, setToggleHelp] = useState(false)

  return (
    <div className="flex flex-col items-center bg-black/70 h-screen">
      <header className="text-white font-semibold mb-10">
        <Navbar toggleHelp={toggleHelp} setToggleHelp={setToggleHelp} />
        <div className="flex flex-col justify-center items-center mt-10">
          <img src="cglogo.png" alt="Logo" className="w-20 h-20 mt-5"/>
          <h1 className="font-bold text-lg m-4">Welcome to PathLink</h1>
          {toggleHelp && (
          <Hero />
          )}
        </div>
      </header>
      <div className="flex flex-col justify-center items-center w-screen">
        <PathConverter />
      </div>
    </div>
  );
}

export default App;
