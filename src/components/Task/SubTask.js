import React from "react";
import crossIcon from "../../assets/icon-cross.svg";

const SubTask = ({ subtasks, onChangeSubtasks, onDelete }) => {
  return (
    <>
      <label className="  text-sm dark:text-white text-gray-500">
        Subtasks
      </label>
      {subtasks.map((subtask, index) => (
        <div key={index} className=" flex items-center w-full ">
          <input
            onChange={(e) => {
              onChangeSubtasks(subtask.id, e.target.value);
            }}
            type="text"
            value={subtask.title}
            className=" bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
            placeholder=" e.g Take coffee break"
          />
          <img
            src={crossIcon}
            onClick={() => {
              onDelete(index);
            }}
            className=" m-4 cursor-pointer "
          />
        </div>
      ))}
    </>
  );
};

export default SubTask;
