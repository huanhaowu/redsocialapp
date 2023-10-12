import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@material-tailwind/react";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../AppContext/AppContext";
import { auth, onAuthStateChanged } from "../firebase/firebase";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { registerWithEmailAndPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  let initialValues = {
    email: "",
    password: "",
    name: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[a-zA-Z]+$/, "Name can only contain letters."),
    email: Yup.string().email("Invalid email.").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Must be at least 6 characters")
      .matches(/^[a-zA-Z]+$/, "Password can only contain letters."),
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const { email, password, name } = formik.values;
    if (formik.isValid === true) {
      registerWithEmailAndPassword(name, email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Revise los campos ingresados.");
    }
  };

  const formik = useFormik({ initialValues, validationSchema, handleRegister });

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <ClipLoader color="#0b33c2" size={150} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  {" "}
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter your name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <Typography variant="small" color="red">
                    {formik.errors.name}
                  </Typography>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter your email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <Typography variant="small" color="red">
                    {formik.errors.email}
                  </Typography>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter your password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography variant="small" color="red">
                    {formik.errors.password}
                  </Typography>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mb-4"
              >
                Register
              </button>
            </form>
            <div className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
