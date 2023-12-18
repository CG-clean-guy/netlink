// PathConverter.js
import React, { useState, useEffect, useCallback } from "react";
import { detectPathType, convertPath } from "../utils/pathUtils";
import { debounce } from "../utils/debounce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PathConverter(props) {
  const { user } = props
  const [inputPath, setInputPath] = useState("");
  const [convertedPath, setConvertedPath] = useState("");
  const [pathOS, setPathOS] = useState("");
  const buttonSound = new Audio("/button.aac");


  useEffect(() => {
    if (convertedPath) {
      navigator.clipboard
        .writeText(convertedPath)
        .then(() => toast.success("File path copied to clipboard! 🎉"))
        .catch((err) => {
          console.error("Failed to copy path: ", err);
          toast.error("Failed to copy path to clipboard 🤔");
        });
    }
  }, [convertedPath]);

  

  const debouncedFunction = debounce((path) => {
    const pathType = detectPathType(path);
    if (pathType === "invalid") {
      toast.error("Invalid file path 😫");
      setConvertedPath("");
      setPathOS("");
    } else {
      const { convertedPath, notification } = convertPath(path, pathType, user);
      setConvertedPath(convertedPath);
      setPathOS(pathType);
  
      if (notification) {
        toast.info(notification);
      } else if (pathType !== "invalid") {
        buttonSound
          .play()
          .catch((err) => console.error("Error playing sound:", err));
      }
    }
  }, 300);
  
  const validateAndConvertPath = useCallback(debouncedFunction, [debouncedFunction]); 

  const handleInputChange = (event) => {
    const path = event.target.value;
    setInputPath(path);
    validateAndConvertPath(path);
  };

  const clearInput = () => {
    setInputPath("");
    setConvertedPath("");
    setPathOS("");
  };

  const pasteInput = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setInputPath(clipboardText);
      validateAndConvertPath(clipboardText);
    } catch (error) {
      console.error("Error reading from clipboard:", error);
      toast.error("Failed to read from clipboard 🤔");
    }
  };

  const copyPath = () => {
    if (convertedPath) {
      navigator.clipboard
        .writeText(convertedPath)
        .then(() => toast.success("Converted path copied to clipboard! 🎉"))
        .catch((err) => {
          console.error("Failed to copy converted path: ", err);
          toast.error("Failed to copy converted path to clipboard 🤔");
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="w-screen flex flex-col">
          
      <div className="flex flex-col md:flex-row flex-1 w-full items-center justify-center">
             
      
        <input
          type="text"
          value={inputPath}
          onChange={handleInputChange}
          placeholder="Paste file path here..."
          className="border rounded-md p-2 my-5 text-black w-2/5 truncate-right"
        />
     <div className="flex flex-row mb-3 md:mb-0">
     <button
            onClick={clearInput}
            className="gbutton textbutton"
          >
            CLEAR
          </button>
        <button
          onClick={pasteInput}
          className="gbutton textbutton"
        >
          PASTE
        </button>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center mt-5">
        {pathOS ? (
          <h1 className="text-sm text-white animate-pulse mb-2">
          <span className="text-yellow-400">{pathOS}</span> path detected...
          </h1>
        ) : (
          <h1 className="text-sm text-white animate-pulse mb-2">
          <span className="text-yellow-400">{pathOS}</span> detecting path...
          </h1>
        )}
      
        {convertedPath && (
            <div className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 mt-5">
        <h2 className="text-sm text-white md:mr-1">Converted Path:</h2>
        <h1 className="text-white"><code onClick={copyPath} className="bg-black/30 border-2 border-black p-2 rounded-lg text-green-200 font-mono text-sm ml-1 cursor-pointer hover:bg-neutral-700 transition-all duration-150 ease-in">{convertedPath}</code></h1>
         <button
          onClick={copyPath}
          className="bg-black/70 p-2 border-2 border-black hover:bg-black/30 rounded-md ml-1 gbutton"
        >
          <img src="clipboard.svg" alt="copy" className="w-4 h-4 hover:text-green-300" />
        </button>
        </div>
        )}
      </div>
   
      </div>
   
    </div>
  );
}

export default PathConverter;
