import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { enqueueSnackbar } from 'notistack';
import image from '../../assets/signup-image.jpg'

const AdminSignup = () => {



  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginForm = useFormik({
    initialValues: {
      name: '',
      code: '',
      email: '',
      password: ''
    },
    // Step4 : what happens when form is submitted
    onSubmit: async (values) => {
      console.log(values);
      const res = await fetch('http://localhost:3000/admin/signup', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        },
      })

      if (res.status === 200) {
        enqueueSnackbar('Admin Added Successfully', { variant: 'success' });
        navigate('/AdminLogin');
      } else if (res.status === 400) {
        enqueueSnackbar('Admin already exist', { variant: 'error' })
      } else {
        enqueueSnackbar('Admin not added', { variant: 'error' })
      }
    }
  })
  return (
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

export default AdminSignup;
