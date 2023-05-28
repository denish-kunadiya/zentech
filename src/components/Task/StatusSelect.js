import React from "react";

const StatusSelect = ({ status, onChangeStatus, columns }) => {
  return (
    <>
      <label className="  text-sm dark:text-white text-gray-500">
        Current Status
      </label>
      <select
        value={status}
        onChange={onChangeStatus}
        className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
      >
        {columns?.map((column, index) => (
          <option key={index}>{column?.name}</option>
        ))}
      </select>
    </>
  );
};

export default StatusSelect;
