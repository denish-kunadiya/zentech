import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

import * as loginAction from "../../redux/auth/action";
import { connect } from "react-redux";

const Register = ({ loginData, isLoggedIn }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, []);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // console.log('formValues', formValues)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formValues.name) {
      setLoading(false);
      toast.error("Please enter name");
    } else if (!formValues.email) {
      setLoading(false);
      toast.error("Please enter email");
    } else if (!formValues.password) {
      setLoading(false);
      toast.error("Please enter password");
    } else {
      createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      )
        .then((userCredential) => {
          // Registration successful, you can access the registered user via userCredential.user
          const user = userCredential.user;
          loginData({
            name: formValues.name,
            user,
          });
          updateProfile(user, {
            displayName: formValues.name,
          });
          navigate("/home");
          setLoading(false);
        })
        .catch((error) => {
          // Registration failed, handle the error
          setLoading(false);
          toast.error(error.code);
        });
    }
  };

  return (
    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')",
      }}
    >
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img
              src="https://www.logo.wine/a/logo/Trello/Trello-Logo.wine.svg"
              width="150"
              alt=""
              srcset=""
            />
            <h1 className="mb-2 text-2xl">Trello Task Board</h1>
            <span className="text-gray-300">Register</span>
          </div>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="text"
                name="email"
                placeholder="id@email.com"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="Password"
                name="password"
                placeholder="*********"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 text-xs flex justify-end px-2 underline">
              <Link to="/">Alredy have an account ? SignIn.</Link>
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              {/* <Link to="/"> */}
              <div className="flex items-center justify-center ">
                <button
                  type="submit"
                  className={`w-full rounded-full  px-10 py-2 text-sm  leading-6  text-center bg-yellow-400 bg-opacity-50  text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600 ${
                    loading && "cursor-not-allowed"
                  }`}
                  disabled={loading}
                >
                  <div className="inline-flex items-center">
                    {loading && (
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
                    Register
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProp = (state) => {
  return {
    isLoggedIn: state?.loginReducer?.isLoggedIn,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    loginData: (data) => dispatch(loginAction.setLoginUser(data)),
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Register);
