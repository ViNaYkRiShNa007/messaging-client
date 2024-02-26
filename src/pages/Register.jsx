import React from "react";
import { Link } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "../utils/APIRoutes";
const Register = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const navigate = useNavigate();
  const { values, errors, handleSubmit, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,
      onSubmit: async (values, action) => {
        console.log(values);
        let req = await axios.post("/auth/register", {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        if (req.data === "Created") {
          toast.success(
            "Account Created!, Redirecting to Login Page",
            toastOptions
          );
          action.resetForm();
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          toast.error("User exists!, try logging in", toastOptions);
          action.resetForm();
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      },
    });
  return (
    <center>
      <ToastContainer />
      <div
        className="card max-w-96 bg-base-100 shadow-xl m-6  login-form"
        data-theme="cupcake"
      >
        <div className="card-body">
          <center>
            <div className="avatar">
              <div className="w-28 ">
                <img src="/logo.png" className="logo" />
              </div>
            </div>
          </center>
          <div className="prose">
            <h1>Register</h1>
            <form
              className="form-control w-full max-w-xs"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                placeholder="Username"
                className={`input input-bordered ${
                  errors.username && touched.username ? "input-error" : ""
                } w-full max-w-xs text-center`}
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="label">
                <span className="label-text-alt text-red-500">
                  {touched.username ? errors.username : ""}
                </span>
              </div>
              <br />
              <input
                type="email"
                placeholder="Email ID"
                className={`input input-bordered ${
                  errors.email && touched.email ? "input-error" : ""
                } w-full max-w-xs text-center`}
                id="email"
                name="email"
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
                className={`input input-bordered ${
                  errors.password && touched.password ? "input-error" : ""
                } w-full max-w-xs text-center`}
                id="password"
                name="password"
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
              <input
                type="password"
                placeholder="Confirm Password"
                className={`input input-bordered ${
                  errors.confirm_password && touched.confirm_password
                    ? "input-error"
                    : ""
                } w-full max-w-xs text-center`}
                id="confirm_password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="label">
                <span className="label-text-alt text-red-500">
                  {touched.confirm_password ? errors.confirm_password : ""}
                </span>
              </div>
              <br />
              <button
                type="submit"
                className="btn text-white text-2xl font-bold bg-orange-400"
              >
                <IoMdPersonAdd />
                Create Account
              </button>
            </form>
            <br />
            <Link to="/" className="text-blue-600">
              Have an account, Try Logging in
            </Link>
          </div>
        </div>
      </div>
    </center>
  );
};

export default Register;
