import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../../assets/icon-board.svg";
import useDarkMode from "../../hooks/useDarkMode";
import darkIcon from "../../assets/icon-dark-theme.svg";
import lightIcon from "../../assets/icon-light-theme.svg";
import * as boardActions from "../../redux/boards/action";

function HeaderDropDown({
  setOpenDropdown,
  setIsBoardModalOpen,
  setBoardActive,
  board,
  boardIndex,
}) {
  const dispatch = useDispatch();
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const [boards, setBoards] = useState([]);
  useEffect(() => {
    setBoards(board);
  }, [board]);
  console.log("boards", boards);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div
      className=" py-4 px-2 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className=" bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          ALL BOARDS ({boards?.length})
        </h3>

        <div className=" dropdown-borad  ">
          {boards.map((board, index) => (
            <div
              className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                boardIndex === index && "bg-gray-100"
              } hover:bg-gray-100 dark:hover:bg-gray-700 ${
                boardIndex === index && "dark:bg-gray-700"
              }`}
              key={index}
              onClick={() => setBoardActive(index)}
            >
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span class="ml-3">{board.name}</span>
            </div>
          ))}

          {/* <div
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className=" flex items-baseline space-x-2  text-[#635fc7] px-5 py-4  "
          >
            <img src={boardIcon} className="   filter-white  h-4 " />
            <p className=" text-lg font-bold  ">Create New Board </p>
          </div> */}

          <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700  bottom-0">
            <li>
              <a
                onClick={() => {
                  setIsBoardModalOpen(true);
                  setOpenDropdown(false);
                }}
                class="cursor-pointer flex items-center p-2 mb-8 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
                <span class="ml-3">Create New Board </span>
              </a>
            </li>
          </ul>

          <div className=" mx-2  p-4  space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
            <img src={lightIcon} alt="sun indicating light mode" />

            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>

            <img src={darkIcon} alt="moon indicating dark mode" />
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProp = (state) => {
  return {
    user: state?.loginReducer?.user,
    board: state?.boardReducer?.boards,
    boardIndex: state?.boardReducer?.index,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setBoardActive: (data) => dispatch(boardActions.setBoardActive(data)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(HeaderDropDown);
