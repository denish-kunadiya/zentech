import React from "react";

const TaskProgress = ({ percentage }) => {
  return (
    <div className="mt-6">
      <label className="  text-sm dark:text-white text-gray-500">
        Task Completed
      </label>
      <div className="w-full mt-3 bg-gray-200 rounded   flex flex-col space-y-3">
        <div
          id="progress-bar"
          className={`h-2  rounded  transition-width duration-500 ${
            percentage === 100 ? "bg-green-500" : "bg-indigo-500"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TaskProgress;
