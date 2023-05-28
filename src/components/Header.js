import React, { useEffect, useState } from "react";
import Logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropdown/HeaderDropDown";
import ElipsisMenu from "./HeaderDropdown/ElipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { connect, useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modals/DeleteModal";
// import boardsSlice from "../redux/boardsSlice";
import { auth } from "../firebase";
import { deleteBoard } from "../helper/board";
import * as boardActions from "../redux/boards/action";
import { toast } from "react-toastify";

function Header({
  setIsBoardModalOpen,
  isBoardModalOpen,
  user,
  boards,
  boardIndex,
  setBoardDispatch,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBoardDispatch();
  }, [refresh]);

  const dispatch = useDispatch();

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    setLoading(true);
    if (e.target.textContent === "Delete") {
      let id = boards[boardIndex].id;
      deleteBoard(id)
        .then((res) => {
          setRefresh(refresh + 1);
          setIsDeleteModalOpen(false);
          toast.success("Board successfully deleted.");
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
        });
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
      <header className=" flex justify-between dark:text-white items-center  ">
        {/* Left Side  */}
        <div className=" flex items-center space-x-2  md:space-x-4">
          <img src={Logo} alt=" Logo " className=" h-6 w-6" />
          <h3 className=" md:text-5xl  hidden md:inline-block font-bold  font-sans">
            Trello
          </h3>
          <div className=" flex items-center ">
            <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">
              {boards[boardIndex]?.name}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className=" w-3 ml-2 md:hidden"
              onClick={onDropdownClick}
            />
          </div>
        </div>

        {/* Right Side */}

        <div className=" flex space-x-4 items-center md:space-x-6 ">
          <button
            className=" w-36 rounded-full  px-0 py-2 text-sm   text-[#635fc7] font-bold transition duration-150 ease-in-out border-2 dark:text-white border-indigo-400 dark:border-white text-center shadow hidden md:block "
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            + Add New Task
          </button>
          <button
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
            className=" font-bold transition duration-150 ease-in-out button py-1 px-3 md:hidden "
          >
            +
          </button>

          <span
            onClick={() => {
              setBoardType("edit");
              setOpenDropdown(false);
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer h-6"
          >
            {user?.name}
          </span>
          {isElipsisMenuOpen && (
            <ElipsisMenu
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setIsBoardModalOpen={setIsBoardModalOpen}
          />
        )}
      </header>
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
          board={boards[boardIndex]}
          boardIndex={boardIndex}
          setRefresh={setRefresh}
          refresh={refresh}
          // prevColIndex={prevColIndex}
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
          board={boards[boardIndex]}
          boardIndex={boardIndex}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={boards[boardIndex].name}
          onDeleteBtnClick={onDeleteBtnClick}
          setRefresh={setRefresh}
          refresh={refresh}
          disabled={loading}
        />
      )}
    </div>
  );
}

const mapStateToProp = (state) => {
  return {
    user: state?.loginReducer?.user,
    boards: state?.boardReducer?.boards,
    boardIndex: state?.boardReducer?.index,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setBoardDispatch: () => dispatch(boardActions.setBoardsAction()),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Header);
