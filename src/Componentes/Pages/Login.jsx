import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@material-tailwind/react";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../AppContext/AppContext";
import { auth, onAuthStateChanged } from "../firebase/firebase";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { signInWithGoogle, loginWithEmailAndPassword } =
    useContext(AuthContext);

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
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("correo invalido.").required("Required"),
    password: Yup.string()
      .required("Required")
      .min("6", "Debe tener al menos 6 caracteres")
      .matches(/^[a-zA-Z]+$/, "Constraseña solo puede contener letras."),
  });

  const handleSumbit = (e) => {
    e.preventDefault();
    const { email, password } = formik.values;
    if (formik.isValid === true) {
      loginWithEmailAndPassword(email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Revise los datos ingresados.");
    }
    console.log("formik", formik);
  };
  const formik = useFormik({ initialValues, validationSchema, handleSumbit });

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <ClipLoader color="#0b33c2" size={150} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
            <form onSubmit={handleSumbit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter your email"
                  {...formik.getFieldProps("email")}
                />
              </div>
              <div>
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
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter your password"
                  {...formik.getFieldProps("password")}
                />
              </div>
              <div>
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
                Sign In
              </button>
              <button
                type="button"
                className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 mb-4"
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </button>
            </form>
            <div className="mt-4 text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </div>
            <div className="mt-2 text-center">
              Forgot your password?{" "}
              <Link to="/reset" className="text-blue-500 hover:underline">
                Reset Password
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
