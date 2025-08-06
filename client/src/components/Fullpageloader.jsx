import React from "react";

const Fullpageloader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-10 h-10">
        <div className="absolute w-full h-full border-4 border-gray-300 rounded-full opacity-30"></div>
        <div className="absolute w-full h-full border-4 border-t-blue-500 border-b-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Fullpageloader;
