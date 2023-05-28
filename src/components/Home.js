import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import AfterAuth from "../HOC";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column/Column";
import EmptyBoard from "./Boards/EmptyBoard";
import Sidebar from "./Sidebar";
import * as boardActions from "../redux/boards/action";
function Home({ boards, boardIndex, setBoardDispatch }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [columns, setColumns] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setBoardDispatch();
  }, [refresh]);
  useEffect(() => {
    setColumns(boards[boardIndex]?.columns);
  }, [boardIndex, boards]);

  return (
    <AfterAuth>
      {/* Columns Section */}
      {boards?.length > 0 ? (
        <>
          {columns?.length > 0 ? (
            <>
              {columns.map((col, index) => (
                <Column
                  key={index}
                  colIndex={index}
                  col={col}
                  setRefresh={setRefresh}
                  refresh={refresh}
                />
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
              board={boards}
              setRefresh={setRefresh}
              refresh={refresh}
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

const mapDispatchToProp = (dispatch) => {
  return {
    setBoardDispatch: () => dispatch(boardActions.setBoardsAction()),
  };
};

const mapStateToProp = (state) => {
  return {
    boards: state?.boardReducer?.boards,
    boardIndex: state?.boardReducer?.index,
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Home);
