import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as loginAction from "../../redux/auth/action";
import { auth } from "../../firebase";

const Login = ({ loginData, isLoggedIn }) => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formValues.email) {
      toast.error("Please enter email");
    } else if (!formValues.password) {
      toast.error("Please enter password");
    } else {
      signInWithEmailAndPassword(auth, formValues.email, formValues.password)
        .then((userCredential) => {
          // Registration successful, you can access the registered user via userCredential.user
          const user = userCredential.user;
          loginData({
            name: user.displayName,
            user,
          });
          navigate("/home");
          toast.success("Login Successfully");
        })
        .catch((error) => {
          // Registration failed, handle the error
          const errorMessage = error.message;
          toast.error(errorMessage);
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
              src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
              width="150"
              alt=""
              srcset=""
            />
            <h1 className="mb-2 text-2xl">Instagram</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <form method="POST" onSubmit={handleSubmit}>
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
              <Link to="/register">Don't have an account ? SignUp.</Link>
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              {/* <Link to="/home"> */}
              <button
                type="submit"
                className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
              >
                Login
              </button>
              {/* </Link> */}
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

export default connect(mapStateToProp, mapDispatchToProp)(Login);
