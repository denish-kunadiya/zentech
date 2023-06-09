import React, { useState } from "react";
import crossIcon from "../assets/icon-cross.svg";
// import boardsSlice from "../redux/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { connect, useDispatch, useSelector } from "react-redux";
import { createBoard, editBoards } from "../helper/board";
import { toast } from "react-toastify";
import StyledButton from "../shared/StyledButton";

function AddEditBoardModal({
  type,
  setIsBoardModalOpen,
  board,
  boardIndex,
  setRefresh,
  refresh,
  processing,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(false);

  if (type === "edit" && isFirstLoad && board) {
    setNewColumns(
      board?.columns?.map((col, index) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };
  const onChange = (id, newValue, index) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      column["columnIndex"] = index;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };
  const onSubmit = (type) => {
    setLoading(true);
    if (type === "add") {
      // dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
      createBoard(name, newColumns)
        .then((res) => {
          setIsBoardModalOpen(false);
          setRefresh(refresh + 1);
          toast.success("Board created successfully.");
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          setIsBoardModalOpen(false);
          toast.error("Error in creating board.");
          setLoading(false);
        });
    } else {
      setLoading(true);
      editBoards(name, newColumns, board.id)
        .then((res) => {
          setRefresh(refresh + 1);
          setIsBoardModalOpen(false);
          toast.success("Board updated successfully.");
          setLoading(false);
        })
        .catch((err) => {
          setIsBoardModalOpen(false);
          toast.error("Error in updating board.");
          setLoading(false);
        });
      // dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="  fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-gray-50 dark:bg-gray-800 text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">{type === "edit" ? "Edit" : ""} Board</h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Board Name
          </label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* Board Columns */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className=" text-sm dark:text-white text-gray-500">
            Board Columns
          </label>

          {newColumns.map((column, index) => (
            <div key={index} className=" flex items-center w-full ">
              <input
                className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                onChange={(e) => {
                  onChange(column.id, e.target.value, index);
                }}
                type="text"
                value={column.name}
              />
              <img
                src={crossIcon}
                onClick={() => {
                  onDelete(column.id);
                }}
                className=" m-4 cursor-pointer "
              />
            </div>
          ))}
          <div>
            <button
              className=" w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
              }}
            >
              + Add New Column
            </button>

            <StyledButton
              onClick={() => {
                const isValid = validate();
                if (isValid === true) onSubmit(type);
              }}
              disabled={loading}
              btnText={type === "add" ? "Create New Board" : "Save Changes"}
            />
          </div>
        </div>
      </div>
    </div>
    // <>dsfdsf</>
  );
}

const mapStateToProp = (state) => {
  return {
    processing: state?.boardReducer?.processing,
  };
};

export default connect(mapStateToProp)(AddEditBoardModal);
