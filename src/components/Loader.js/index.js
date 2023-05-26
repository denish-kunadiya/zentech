import React from "react";

const Loader = () => {
  return (
    // <!-- component -->
    <div class="flex justify-center items-center h-screen">
      <div class="relative w-full h-full animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
      </div>
    </div>
  );
};

export default Loader;
