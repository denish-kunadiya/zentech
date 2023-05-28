import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { editSubTask } from "../../helper/task";
import { toast } from "react-toastify";

function CheckableSubtask({
  index,
  taskIndex,
  colIndex,
  boards,
  boardIndex,
  taskDetail,
}) {
  // const boards = useSelector((state) => state.boards);
  // const board = boards.find((board) => board.isActive === true);
  // const col = boards[boardIndex].columns.find((col, i) => i === colIndex);
  // const task = col.tasks.find((task, i) => i === taskIndex);
  // const subtask = task.subtasks.find((subtask, i) => i === index);
  const [checked, setChecked] = useState(taskDetail.isCompleted);
  // const checked = subtask.isCompleted;

  const onChange = (e, subtaskId) => {
    console.log("subtaskId", subtaskId);
    setChecked(e.target.checked);
    editSubTask(boards[boardIndex].id, subtaskId, e.target.checked)
      .then((res) => {
        toast.success("Subtask status is changed");
      })
      .catch((err) => console.log("err", err));
  };
  // console.log("taskDetail", taskDetail);
  return (
    <div className=" w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c]  p-3 gap-4  bg-[#f4f7fd]">
      <input
        className=" w-4 h-4  accent-[#635fc7] cursor-pointer "
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e, taskDetail.id)}
      />
      <p className={checked && " line-through opacity-30 "}>
        {taskDetail.title}
      </p>
    </div>
  );
}

const mapStateToProp = (state) => {
  return {
    boards: state?.boardReducer?.boards,
    boardIndex: state?.boardReducer?.index,
  };
};

export default connect(mapStateToProp)(CheckableSubtask);
