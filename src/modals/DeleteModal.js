import React from "react";

function DeleteModal({
  type,
  title,
  onDeleteBtnClick,
  setIsDeleteModalOpen,
  disabled,
}) {
  return (
    // Modal Container
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsDeleteModalOpen(false);
      }}
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown"
    >
      {/* Delete Modal  */}

      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-gray-50 dark:bg-gray-800 text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl ">
        <h3 className=" font-bold text-red-500 text-xl  ">
          Delete this {type}?
        </h3>
        {type === "task" ? (
          <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
            Are you sure you want to delete the "{title}" task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="text-gray-500 font-[600] tracking-wide text-xs pt-6">
            Are you sure you want to delete the "{title}" board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className=" flex w-full mt-4 items-center justify-center space-x-4 ">
          <button
            onClick={onDeleteBtnClick}
            className={`w-full py-2 justify-center flex items-center text-white hover:opacity-75 bg-red-500 rounded-full border-red-400 ${
              disabled && "cursor-not-allowed"
            }`}
          >
            {disabled && (
              <svg
                className="w-5 h-5 mr-2 -ml-1 text-indigo-500 dark:text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Delete
          </button>
          <button
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
            className="w-full rounded-full  px-4 py-2 text-sm  leading-6 text-[#635fc7] font-bold transition duration-150 ease-in-out border-2 border-indigo-400 text-center shadow"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
