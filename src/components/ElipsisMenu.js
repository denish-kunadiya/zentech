import React from "react";
import { connect } from "react-redux";
import * as loginAction from "../redux/auth/action"
import { useNavigate } from "react-router-dom";


function ElipsisMenu({ type, setOpenEditModal, setOpenDeleteModal,logout }) {

const navigate = useNavigate()
  const logoutUser = ()=>{
    logout()
    navigate("/")
  }


  return (
    <div
      className={
        type === "Boards"
          ? " absolute  top-16  right-5"
          : " absolute  top-6  right-4"
      }
    >
      <div className=" flex justify-end items-center">
        <div className=" w-40 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg  h-auto pr-12">
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className=" cursor-pointer dark:text-gray-400 text-gray-700"
          >
            Edit {type}
          </p>

          <p
            onClick={() => setOpenDeleteModal()}
            className=" cursor-pointer text-red-500"
          >
            Delete {type}
          </p>
          <p
            onClick={logoutUser}
            className=" cursor-pointer text-red-500"
          >
          Logout
          </p>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProp = dispatch => {
  return {
    logout: (data) => dispatch(loginAction.logout(data)),
  };
};

export default connect(null,mapDispatchToProp)(ElipsisMenu);
