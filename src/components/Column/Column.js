import { shuffle } from "lodash";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
// import boardsSlice from "../redux/boardsSlice";
import Task from "../Task/Task";
import { editTask } from "../../helper/task";

function Column({ colIndex, boards, col, setRefresh, refresh, boardIndex }) {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const dispatch = useDispatch();
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      let ab = boards[boardIndex].columns.find((col, i) => i === colIndex);
      const prevCol = boards[boardIndex].columns.find(
        (col, i) => i === prevColIndex
      );
      const task = prevCol.tasks.splice(taskIndex, 1);
      task[0].status = ab.name;
      ab.tasks.push(...task);

      // dispatch();
      const taskObject = {
        title: task[0].title,
        description: task[0].description,
        status: task[0].status,
        subtasks: task[0].subtasks,
      };
      editTask(boards[boardIndex].id, taskIndex, prevColIndex, ...task)
        .then((res) => {
          setRefresh(refresh + 1);
          // setIsAddTaskModalOpen(false);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className="scrollbar-hide   mx-5 pt-[90px] min-w-[280px] "
    >
      <p className=" font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3] bg-gray-200 dark:bg-[#101204] p-2 rounded-2xl">
        <div className={`rounded-full w-4 h-4 ${color} `} />
        {col.name} ({col.tasks.length})
      </p>

      {col.tasks.map((task, index) => (
        <Task
          key={index}
          taskIndex={index}
          colIndex={colIndex}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ))}
    </div>
  );
}

const mapStateToProp = (state) => {
  // console.log("state", state);
  return {
    boards: state?.boardReducer?.boards,
    boardIndex: state?.boardReducer?.index,
  };
};

export default connect(mapStateToProp)(Column);
