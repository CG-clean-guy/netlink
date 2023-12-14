import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="lg:max-w-3xl max-w-sm text-sm flex flex-col lg:flex-row justify-center items-start space-x-0 space-y-5 lg:space-x-16 lg:space-y-0">
        <div className="flex flex-row justify-start items-start">
          <h1 className="font-extrabold text-5xl mr-2 text-green-200">1</h1>
          <p>
            This is a very simple app used to share local or network drives with
            CG coworkers.
          </p>
        </div>
        <div className="flex flex-row justify-start items-start">
          <h1 className="font-extrabold text-5xl mr-2 text-green-200">2</h1>
          <p>
            Simply copy the directory path from either Windows File Explorer or macOS Finder,
            and paste into the input box.
          </p>
        </div>
        <div className="flex flex-row justify-start items-start">
          <h1 className="font-extrabold text-5xl mr-2 text-green-200">3</h1>
          <p>
            PathLink will determine which OS you are using, automatically
            convert the link to the opposite format, and copy the new path to the
            clipboard for easy sharing. All you have to do is paste, and paste!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
