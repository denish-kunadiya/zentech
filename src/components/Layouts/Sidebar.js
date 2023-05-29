import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import useDarkMode from "../../hooks/useDarkMode";
import darkIcon from "../../assets/icon-dark-theme.svg";
import lightIcon from "../../assets/icon-light-theme.svg";

import * as loginAction from "../../redux/auth/action";

// import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../../modals/AddEditBoardModal";

import * as boardActions from "../../redux/boards/action";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

function Sidebar({
  isSideBarOpen,
  setIsSideBarOpen,
  setBoardDispatch,
  setBoardActive,
  boardIndex,
  board,
  logout,
}) {
  const navigate = useNavigate();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  useEffect(() => {
    setBoardDispatch();
  }, [refresh]);
  useEffect(() => {
    setBoards(board);
  }, [board]);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };
  const logoutUser = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <button
            data-drawer-target="separator-sidebar"
            data-drawer-toggle="separator-sidebar"
            aria-controls="separator-sidebar"
            type="button"
            class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 fixed top-[72px]"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <aside
            id="separator-sidebar"
            class="fixed top-[60px] left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 "
            aria-label="Sidebar"
          >
            <div class=" px-3 py-4  overflow-y-auto bg-gray-50 dark:bg-gray-800 h-[100vh]">
              <ul class="space-y-2 font-medium mt-4">
                {boards?.map((board, index) => (
                  <li>
                    <a
                      key={index}
                      onClick={() => setBoardActive(index)}
                      class={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
                        boardIndex === index && "bg-gray-300"
                      } hover:bg-gray-300 dark:hover:bg-gray-700 ${
                        boardIndex === index && "dark:bg-gray-700"
                      }`}
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
                    </a>
                  </li>
                ))}
              </ul>
              <ul
                class={`pt-4 mt-4 space-y-2 font-medium   bottom-0 ${
                  boards?.length &&
                  "border-t border-gray-200 dark:border-gray-700"
                }`}
              >
                <li>
                  <a
                    onClick={logoutUser}
                    class="flex items-center p-2 cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
                  </a>
                </li>

                <li>
                  <a
                    onClick={() => {
                      setIsBoardModalOpen(true);
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
              <div className=" mx-2  p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg bottom-0">
                <img src={lightIcon} alt="sun indicating light mode" />

                <Switch
                  checked={darkSide}
                  onChange={toggleDarkMode}
                  className={`${
                    darkSide ? "bg-[#635fc7]" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span
                    className={`${
                      darkSide ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>

                <img src={darkIcon} alt="moon indicating dark mode" />
              </div>
            </div>
          </aside>
        </>
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
    </div>
  );
}

const mapDispatchToProp = (dispatch) => {
  return {
    setBoardDispatch: () => dispatch(boardActions.setBoardsAction()),
    setBoardActive: (data) => dispatch(boardActions.setBoardActive(data)),
    logout: (data) => dispatch(loginAction.logout(data)),
  };
};

const mapStateToProp = (state) => {
  return {
    boardIndex: state?.boardReducer?.index,
    board: state?.boardReducer?.boards,
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Sidebar);
