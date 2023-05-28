import React from "react";

const StyledButton = ({ onClick, disabled, btnText }) => {
  return (
    <div className="flex items-center justify-center mt-8 ">
      <button
        type="button"
        className={`w-full rounded-full  px-4 py-2 text-sm  leading-6 text-[#635fc7] font-bold transition duration-150 ease-in-out border-2 dark:text-white border-indigo-400 dark:border-white text-center shadow ${
          disabled && "cursor-not-allowed"
        }`}
        disabled={disabled}
        onClick={onClick}
      >
        <div className="inline-flex items-center">
          {disabled && (
            <svg
              className="w-5 h-4 mr-3 -ml-1 text-indigo-500 dark:text-white animate-spin"
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
          {btnText}
        </div>
      </button>
    </div>
  );
};

export default StyledButton;
