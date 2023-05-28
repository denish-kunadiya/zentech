import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
// import boardsSlice from "../redux/boardsSlice";
import { addTask, editTask } from "../helper/task";
import { toast } from "react-toastify";
import StyledButton from "../shared/StyledButton";
import StatusSelect from "../components/Task/StatusSelect";
import SubTask from "../components/Task/SubTask";

function AddEditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex,
  board,
  boardIndex,
  setRefresh,
  refresh,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [label, setlabel] = useState({
    label: "",
    color: "",
  });
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const columns = board?.columns;
  const col = columns?.find((col, index) => index === prevColIndex);
  const task = col
    ? col?.tasks?.find((task, index) => index === taskIndex)
    : [];
  const [status, setStatus] = useState(
    prevColIndex ? columns[prevColIndex]?.name : columns[0]?.name
  );
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      toast.error("Please enter title.");
      return false;
    }
    if (!description.trim()) {
      toast.error("Please enter description.");
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        toast.error("Please enter subtask.");
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onDelete = (idx) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      newState.splice(idx, 1);
      // subtask.title = newValue;
      return newState;
    });
  };
  const onSubmit = (type) => {
    setLoading(true);
    if (type === "add") {
      const taskObject = {
        title,
        description,
        status,
        subtasks,
      };
      addTask(board.id, status, taskObject)
        .then((res) => {
          setRefresh(refresh + 1);
          setIsAddTaskModalOpen(false);
          toast.success(res);
          setLoading(false);
        })
        .catch((err) => {
          toast.success("Error in creating task.");
          setLoading(false);
        });
    } else {
      setLoading(true);
      const taskObject = {
        title,
        description,
        status,
        subtasks,
      };
      editTask(board.id, taskIndex, prevColIndex, taskObject)
        .then((res) => {
          console.log("res", res);
          setRefresh(refresh + 1);
          setIsAddTaskModalOpen(false);
          toast.success("Task updated successfully.");
          setIsTaskModalOpen(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
          toast.success("Error in updating task.");
          setLoading(false);
        });
    }
  };

  return (
    <div
      className={
        device === "mobile"
          ? "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
          : "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      {/* Modal Section */}

      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-gray-50 dark:bg-gray-800 text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Take coffee break"
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className=" bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
            placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
          />
        </div>

        {/* Subtasks */}

        <div className="mt-8 flex flex-col space-y-3">
          <SubTask
            subtasks={subtasks}
            onChangeSubtasks={onChangeSubtasks}
            onDelete={onDelete}
          />

          <button
            className=" w-full items-center dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
          >
            + Add New Subtask
          </button>
        </div>

        {/* current Status  */}
        <div className="mt-8 flex flex-col space-y-3">
          <StatusSelect
            status={status}
            onChangeStatus={onChangeStatus}
            columns={columns}
          />
          <StyledButton
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
              }
            }}
            disabled={loading}
            btnText={type === "edit" ? " save edit" : "Create task"}
          />
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
