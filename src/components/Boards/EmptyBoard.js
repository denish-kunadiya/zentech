import React, { useEffect, useState } from "react";
import AddEditBoardModal from "../../modals/AddEditBoardModal";
import { connect } from "react-redux";
import * as boardActions from "../../redux/boards/action";

function EmptyBoard({ type, boards, boardIndex, setBoardDispatch }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setBoardDispatch();
  }, [refresh]);

  return (
    <div className=" bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center">
      <h3 className=" text-gray-500 font-bold">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className="w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full"
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
          board={boards[boardIndex]}
          boardIndex={boardIndex}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
    </div>
  );
}

const mapStateToProp = (state) => {
  return {
    boards: state?.boardReducer?.boards,
    boardIndex: state?.boardReducer?.index,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setBoardDispatch: () => dispatch(boardActions.setBoardsAction()),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(EmptyBoard);
