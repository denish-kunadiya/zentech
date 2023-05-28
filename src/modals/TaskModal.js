import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import ElipsisMenu from "../components/HeaderDropdown/ElipsisMenu";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
// import boardsSlice from "../redux/boardsSlice";
import CheckableSubtask from "../components/Task/CheckableSubtask";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteModal from "./DeleteModal";
import { deleteBoard } from "../helper/board";
import { deleteTask } from "../helper/task";
import { toast } from "react-toastify";
import TaskProgress from "../components/Task/TaskProgress";

function TaskModal({
  taskIndex,
  colIndex,
  setIsTaskModalOpen,
  boards,
  boardIndex,
  setRefresh,
  refresh,
}) {
  const dispatch = useDispatch();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const columns = boards[boardIndex]?.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col?.tasks?.find((task, i) => i === taskIndex);
  const subtasks = task?.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });
  const percentage = (completed / subtasks.length) * 100;

  const [status, setStatus] = useState(task.status);

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    // dispatch(
    //   boardsSlice.actions.setTaskStatus({
    //     taskIndex,
    //     colIndex,
    //     newColIndex,
    //     status,
    //   })
    // );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    setLoading(true);
    if (e.target.textContent === "Delete") {
      deleteTask(boards[boardIndex].id, taskIndex, colIndex)
        .then((res) => {
          setRefresh(refresh + 1);
          setIsTaskModalOpen(false);
          setIsDeleteModalOpen(false);
          toast.success("Task successfully deleted");
          setLoading(false);
        })
        .catch((err) => {
          setIsTaskModalOpen(false);
          setLoading(false);
          setIsDeleteModalOpen(false);
        });
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      onClick={onClose}
      className=" fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
    >
      {/* MODAL SECTION */}

      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-gray-50 dark:bg-gray-800 text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
        <div className=" relative flex   justify-between w-full items-center">
          <h1 className=" text-lg">{task.title}</h1>

          <img
            onClick={() => {
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>

        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Task Description
          </label>
          <p className=" tracking-wide text-xs">{task.description}</p>
        </div>
        <p className=" pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        {/* subtasks section */}

        <div className=" mt-3 space-y-2">
          {subtasks.map((subtask, index) => {
            return (
              <CheckableSubtask
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={index}
                taskDetail={subtask}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            );
          })}
        </div>
        <TaskProgress percentage={percentage} />

        {/* Current Status Section */}

        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <label>{status}</label>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          disabled={loading}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
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

export default connect(mapStateToProp)(TaskModal);
