import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import image from '../assets/signup-image.jpg';
import './Design.css'

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const signSchema = yup.object({
    email: yup.string().email('Invalid Email').required('Required'),
    password: yup.string().required('Required').min(8),
    confirm_password: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    validationSchema: signSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await fetch('http://localhost:3000/user/add', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          enqueueSnackbar('User Added Successfully', { variant: 'success' });
          navigate('/email-verification');
          actions.resetForm();
        } else {
          enqueueSnackbar('User not added', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Error submitting form', { variant: 'error' });
        console.error('Form submission error', error);
      }
      actions.setSubmitting(false);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center back-bg">
      <div className="bg-white bg-opacity-3 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-3xl px-12 py-4  flex flex-col md:flex-row pad">
        <div className="w-full mb-4 md:mb-0 md:w-auto">
          <div>
             <h2 className="text-3xl md:text-5xl mt-12 font-bold mb-12 text-center md:text-left work">Sign up</h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            {/* Name Field */}
            <div className="mb-8 flex">
              <label htmlFor="name" className="flex items-center">
                <i className="fa-solid fa-user" />
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Your Name"
                className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-96"
              />
            </div>

            {/* Email Field */}
            <div className="mb-8 flex">
              <label htmlFor="email" className="flex items-center">
                <i className="fa-regular fa-envelope"></i>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Your Email"
                className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-96"
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500 text-sm">{formik.errors.email}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-8 flex">
              <label htmlFor="pass" className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                <i className="fa-solid fa-lock"></i>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="pass"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-96"
              />
              <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={togglePasswordVisibility}></i>
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-500 text-sm">{formik.errors.password}</span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-8 flex">
              <label htmlFor="re_pass" className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                <i className="fa-solid fa-lock"></i>
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password"
                id="re_pass"
                placeholder="Confirm password"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-96"
              />
              <i className={showConfirmPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={toggleConfirmPasswordVisibility}></i>

            </div>
            {formik.touched.confirm_password && formik.errors.confirm_password && (
              <span className="text-red-500 text-sm mb-5">{formik.errors.confirm_password}</span>
            )}

            <div className="mb-8">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="agree-term"
                  id="agree-term"
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2">
                  I agree all statements in
                  <a href="#" className="text-indigo-600 hover:text-indigo-800"> Terms of service</a>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-center mb-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-32"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="hidden md:flex ml-20 mr-15 flex-col items-center justify-center ">
          <figure><img src={image} alt="sign up" /></figure>
          <Link to="/login" className=" text-lg text-blue-400 p-2 mt-1  rounded-md hover:text-blue-800">
            I am already a member
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
