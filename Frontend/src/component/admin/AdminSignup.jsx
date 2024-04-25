import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import image from '../../assets/signup-image.jpg';
import * as Yup from 'yup';

const AdminSignup = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    code: Yup.string().required('Code is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch('http://localhost:3000/admin/signup', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          enqueueSnackbar('Admin Added Successfully', { variant: 'success' });
          navigate('/AdminLogin');
        } else {
          const error = await res.json();
          enqueueSnackbar(error.message || 'Admin not added', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Network error', { variant: 'error' });
      }
    }
  });

  return (
<<<<<<< HEAD
    <>
      <div className="min-h-screen flex items-center justify-center  admin-bg">
        {/* Sign up form */}
        <div className="bg-white shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] rounded-3xl px-12 py-4  mb-4 flex flex-col md:flex-row   pad">
          <div className="w-full mb-4 md:mb-0 md:w-auto">
            <h2 className="text-3xl md:text-5xl mt-12 font-bold mb-12 text-center md:text-left work">Sign up</h2>
            <form method="POST" className="mt-8" onSubmit={loginForm.handleSubmit}>
              <div className="mb-8 flex">
                <label
                  htmlFor="name"
                  className=" flex items-center"
                >
                  <i className="fa-solid fa-user" />
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.name}
                  placeholder="Your Name"
                  className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-80"
                />
              </div>
              <div className="mb-8 flex">
                <label
                  htmlFor="email"
                  className="flex items-center"
                >
                  <i className="fa-regular fa-envelope"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.email}
                  placeholder="Your Email"
                  className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-80"
                />
                <span style={{ color: 'red', fontsize: '50px', marginLeft: '10px' }}>{loginForm.errors.email}</span>

              </div>
              <div className="mb-8 flex">
                <label
                  htmlFor="pass"
                  className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
                >
                  <i className="fa-solid fa-lock"></i>
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="pass"
                  placeholder="Password"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.password}
                  className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-80"
                />
                <i onClick={togglePasswordVisibility} className={`ml-2 cursor-pointer fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                <span style={{ color: 'red', fontsize: '10' }}>{loginForm.touched.password && loginForm.errors.password}</span>
              </div>
              <div className="mb-8 flex">
                <label
                  htmlFor="re_pass"
                  className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
                >
                  <i className="fa-solid fa-lock"></i>
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  placeholder="Enter the Code"
                  onChange={loginForm.handleChange}
                  value={loginForm.values.code}
                  className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-80"
                />
              </div>
              <div className="mb-8">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="agree-term"
                    id="agree-term"
                    className="form-checkbox text-indigo-600"
                  />
                  <span className="ml-2">
                    I agree all statements in{" "}
                    <p  className="text-indigo-600 hover:text-indigo-800">
                      Terms of service
                    </p>
                  </span>
                </label>
              </div>
              <div className="flex items-center justify-center mb-2 cursor-pointer">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md cursor-pointer focus:outline-none focus:shadow-outline"
                  defaultValue="Register"
                />
              </div>
            </form>
          </div>
          <div className="hidden md:flex ml-20 mr-15 flex-col items-center justify-center">
            <figure>
              <img className="" src={image} alt="sign up image" />
            </figure>
            <Link to="/AdminLogin" className="text-blue-800 mt-3 hover:text-red-600">
              I am already member
            </Link>
          </div>
        </div>
        ```</div>
    </>
  )
}
=======
    <div className="min-h-screen flex items-center justify-center admin-bg">
      <div className="bg-white shadow-lg rounded-3xl px-12 py-8 mb-4 flex flex-col md:flex-row">
        <div className="w-full mb-4 md:mb-0 md:w-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center md:text-left">Sign up</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4 flex items-center">
              <FaUser className="text-lg" />
              <input
                type="text"
                name="name"
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="Your Name"
                className="border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ml-2 flex-grow"
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
            )}

            <div className="mb-4 flex items-center">
              <FaEnvelope className="text-lg" />
              <input
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Your Email"
                className="border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ml-2 flex-grow"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
            )}

            <div className="mb-4 flex items-center">
              <FaLock className="text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Password"
                className="border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ml-2 flex-grow"
              />
              <div onClick={togglePasswordVisibility} className="cursor-pointer ml-2">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs italic">{formik.errors.password}</p>
            )}

            <div className="mb-4 flex items-center">
              <FaLock className="text-lg" />
              <input
                type="text"
                name="code"
                id="code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
                placeholder="Enter the Code"
                className="border-0 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 ml-2 flex-grow"
              />
            </div>
            {formik.touched.code && formik.errors.code && (
              <p className="text-red-500 text-xs italic">{formik.errors.code}</p>
            )}

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="agree-term"
                  id="agree-term"
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2">
                  I agree all statements in{" "}
                  <Link to="/terms-of-service" className="text-blue-500 hover:text-blue-800">
                    Terms of service
                  </Link>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-center mb-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="hidden md:flex ml-20 flex-col items-center justify-center">
          <img src={image} alt="Sign up" />
          <Link to="/AdminLogin" className="text-blue-800 mt-3 hover:text-red-600">I am already a member</Link>
        </div>
      </div>
    </div>
  );
};
>>>>>>> b22f8a6352c8cc8171f6a9ae9b4cd9b95cf9e63f

export default AdminSignup;
