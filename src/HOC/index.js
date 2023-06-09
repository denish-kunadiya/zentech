import React, { useEffect, useState } from "react";
import Sidebar from "../components/Layouts/Sidebar";
import Header from "../components/Layouts/Header";

const AfterAuth = ({ children }) => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div
      className={
        windowSize[0] >= 768 && isSideBarOpen
          ? " bg-gray-50 dark:bg-gray-800 scrollbar-hide h-screen flex  overflow-x-scroll gap-6  ml-[261px]"
          : "bg-gray-50 dark:bg-gray-800 scrollbar-hide h-screen flex overflow-x-scroll gap-6 "
      }
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          setIsBoardModalOpen={setIsBoardModalOpen}
          isBoardModalOpen={isBoardModalOpen}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}

      <Header
        setIsBoardModalOpen={setIsBoardModalOpen}
        isBoardModalOpen={isBoardModalOpen}
      />

      {/* Columns Section */}

      {children}
    </div>
  );
};

export default AfterAuth;
