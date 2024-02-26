import * as Yup from "yup";

export const signupSchema = Yup.object({
  username: Yup.string().min(3).max(30).required("Username is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirm_password: Yup.string()
    .required("Confirm Password is Required")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password must match"
    ),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(8, "min 8 characters")
    .required("Password is required"),
});
