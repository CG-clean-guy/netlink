// PathConverter.js
import React, { useState, useEffect, useCallback } from "react";
import { detectPathType, convertPath } from "../utils/pathUtils";
import { debounce } from "../utils/debounce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PathConverter() {
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

  const validateAndConvertPath = useCallback(
    debounce((path) => {
      const pathType = detectPathType(path);
      if (pathType === "invalid") {
        toast.error("Invalid file path 😫");
        setConvertedPath("");
        setPathOS("");
      } else {
        setConvertedPath(convertPath(path, pathType));
        setPathOS(pathType);
        if (pathType !== "invalid") {
          buttonSound
            .play()
            .catch((err) => console.error("Error playing sound:", err));
        }
      }
    }, 300),
    []
  );

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

  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="flex flex-row flex-1 w-full items-center justify-center space-x-2">
        <input
          type="text"
          value={inputPath}
          onChange={handleInputChange}
          placeholder="Paste file path here..."
          className="border rounded-md p-2 my-5 text-black w-3/5 truncate-right"
        />
        {inputPath && (
          <button
            onClick={clearInput}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            X
          </button>
        )}
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        {pathOS && (
          <h1 className="text-sm text-white animate-pulse mb-2">
            {pathOS} path detected...
          </h1>
        )}
        <h2 className="text-base text-white">
          <code className="text-green-300">
            Converted Path: <span className="text-white">{convertedPath}</span>
          </code>
        </h2>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        className="text-sm"
      />
    </div>
  );
}

export default PathConverter;
