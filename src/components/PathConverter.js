// PathConverter.js
import React, { useState, useEffect, useCallback } from "react";
import { detectPathType, convertPath } from "../utils/pathUtils";
import { debounce } from "../utils/debounce";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PathConverter(props) {
  const { user } = props;
  const [inputPath, setInputPath] = useState("");
  const [convertedPath, setConvertedPath] = useState("");
  const [pathOS, setPathOS] = useState("");
  const [selectedOption, setSelectedOption] = useState("ACE"); // Default to ACE
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
      const { convertedPath, notification } = convertPath(path, pathType, user, selectedOption);
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

  const validateAndConvertPath = useCallback(debouncedFunction, [
    debouncedFunction,
  ]);

  const handleInputChange = (event) => {
    const path = event.target.value;
    setInputPath(path);
    validateAndConvertPath(path);
  };

  const handleButtonClick = () => {
    // Perform any actions you want when the button is clicked
    console.log("Button clicked!");
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
      <div className="w-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-sm font-semibold mb-1">If you are pasting a MAC path, first choose a windows drive to convert to:</h1>
        <div className="flex flex-row justify-center items-center space-x-5 border-4 border-black rounded-xl p-2">
          <button
            className={`active:scale-90 transition-all duration-150 ease-in-out text-sm bg-gray-600 p-4 w-20 h-20 flex justify-center items-center space-x-1 rounded-xl text-white font-bold ${
              selectedOption === "ACE"
                ? "bg-blue-500 border-2 border-black font-bold text-yellow-200"
                : "bg-gray-700 hover:bg-gray-400 font-medium"
            }`}
            onClick={() => {
              setSelectedOption("ACE");
              handleButtonClick();
            }}
          >
            <label htmlFor="ace" className="cursor-pointer flex flex-col justify-center items-center"><img src='/hd.svg' alt="hd" className="w-5 h-5" />ACE</label>
          </button>
          <button
            className={`active:scale-90 transition-all duration-150 ease-in-out text-sm bg-gray-600 p-4 w-20 h-20 flex justify-center items-center space-x-1 rounded-xl text-white font-bold ${
              selectedOption === "KEN"
                ? "bg-blue-500 border-2 border-black font-bold text-yellow-200"
                : "bg-gray-700 hover:bg-gray-400 font-medium"
            }`}
            onClick={() => {
              setSelectedOption("KEN");
              handleButtonClick();
            }}
          >
            <label htmlFor="ace" className="cursor-pointer flex flex-col justify-center items-center"><img src='/hd.svg' alt="hd" className="w-5 h-5" />KEN</label>
          </button>
          <button
            className={`active:scale-90 transition-all duration-150 ease-in-out text-sm bg-gray-600 p-4 w-20 h-20 flex justify-center items-center space-x-1 rounded-xl text-white ${
              selectedOption === "GOOGLE"
                ? "bg-blue-500 border-2 border-black font-bold text-yellow-200"
                : "bg-gray-700 hover:bg-gray-400 font-medium"
            }`}
            onClick={() => {
              setSelectedOption("GOOGLE");
              handleButtonClick();
            }}
          >
            <label htmlFor="ace" className="cursor-pointer flex flex-col justify-center items-center"><img src='/hd.svg' alt="hd" className="w-5 h-5" />GOOGLE</label>
          </button>
        </div>
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
              <h1 className="text-white">
                <code
                  onClick={copyPath}
                  className="bg-black/30 border-2 border-black p-2 rounded-lg text-green-200 font-mono text-sm ml-1 cursor-pointer hover:bg-neutral-700 transition-all duration-150 ease-in"
                >
                  {convertedPath}
                </code>
              </h1>
              <button
                onClick={copyPath}
                className="bg-black/70 p-2 border-2 border-black hover:bg-black/30 rounded-md ml-1 gbutton"
              >
                <img
                  src="clipboard.svg"
                  alt="copy"
                  className="w-4 h-4 hover:text-green-300"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PathConverter;
