import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import AfterAuth from "../HOC";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import { getBoards } from "../helper/board";

function Home({ boards, boardIndex }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [columns, setColumns] = useState([]);
  const [editData, setEditData] = useState();

  // const boards = useSelector((state) => state.boards);
  // const board = boards.find((board) => board.isActive === true);
  // const columns = boards[boardIndex].columns;

  useEffect(() => {
    setColumns(boards[boardIndex].columns);
  }, [boardIndex]);

  console.log("columns", columns);
  console.log("boards :::::::::::::::::::;", boards);
  console.log("boards :::::::::::::::::::;boardIndex", boardIndex);

  return (
    <AfterAuth>
      {/* Columns Section */}
      {boards?.length > 0 ? (
        <>
          {columns.length > 0 ? (
            <>
              {columns.map((col, index) => (
                <Column key={index} colIndex={index} col={col} />
              ))}
              {/* FOR ADD NEW COLUMNS */}
              {/*  */}
              {/* <div
                onClick={() => {
                  setIsBoardModalOpen(true);
                }}
                className=" h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg "
              >
                + New Column
              </div> */}
            </>
          ) : (
            <>
              <EmptyBoard type="edit" />
            </>
          )}
          {isBoardModalOpen && (
            <AddEditBoardModal
              type="edit"
              setIsBoardModalOpen={setIsBoardModalOpen}
              board="boards"
              ab={boards}
            />
          )}
        </>
      ) : (
        <>
          <EmptyBoard type="add" />
        </>
      )}
    </AfterAuth>
  );
}

const mapStateToProp = (state) => {
  console.log("state", state);
  return {
    boards: state?.boardReducer?.boards,
    boardIndex: state?.boardReducer?.index,
  };
};

export default connect(mapStateToProp)(Home);
