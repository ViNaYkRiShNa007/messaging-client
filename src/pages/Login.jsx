import React from "react";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { loginSchema } from "../schemas";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/slices/userSlice";
import { baseURL } from "../utils/Constants";
const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues,

      validationSchema: loginSchema,

      onSubmit: async (values, actions) => {
        try {
          localStorage.clear();
          let checkUser = await axios.post(`${baseURL}/auth/login`, {
            email: values.email,
            password: values.password,
          });

          if (checkUser.data.message === "Login Successful") {
            toast.success("Login Success", toastOptions);
            localStorage.setItem("auth_token", checkUser.data.auth_token);

            actions.resetForm();
            const userCred = await axios.post(
              `${baseURL}/auth/getuser`,
              {},
              {
                headers: { "auth-token": localStorage.getItem("auth_token") },
              }
            );
            localStorage.setItem("user", JSON.stringify(userCred.data));
            dispatch(userActions.getUser(userCred.data));

            setTimeout(() => {
              navigate("/setavatar");
            }, 3000);
          } else if (checkUser.data.message === "Invalid Credentials") {
            toast.error("Invalid Credentials", toastOptions);
            actions.resetForm();
          }
        } catch (error) {
          console.log(error.message);
          toast.error("Server Down!", toastOptions);
        }
      },
    });
  return (
    <center>
      <div
        className="card max-w-96 bg-base-100 shadow-xl m-6  login-form"
        data-theme="cupcake"
      >
        <ToastContainer />
        <div className="card-body">
          <center>
            <div className="avatar">
              <div className="w-28 ">
                <img src="/logo.png" className="logo" />
              </div>
            </div>
          </center>
          <div className="prose">
            <h1>Login</h1>
            <form
              className="form-control w-full max-w-xs"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Email ID"
                name="email"
                className={`input input-bordered ${
                  errors.email && touched.email ? "input-error" : ""
                } w-full max-w-xs text-center`}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="label">
                <span className="label-text-alt text-red-500">
                  {touched.email ? errors.email : ""}
                </span>
              </div>
              <br />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className={`input input-bordered ${
                  errors.password && touched.password ? "input-error" : ""
                } w-full max-w-xs text-center`}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="label">
                <span className="label-text-alt text-red-500">
                  {touched.password ? errors.password : ""}
                </span>
              </div>
              <br />
              <button
                type="submit"
                className="btn text-white text-2xl font-bold bg-blue-400"
              >
                <IoMdLogIn /> Login
              </button>
            </form>
            <br />
            <Link to={"/register"} className="text-blue-600">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </center>
  );
};

export default Login;
