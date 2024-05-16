import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import image from '../../assets/admin-signup-logo.jpg';
import * as Yup from 'yup';
import "../Design.css";

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
    code: Yup.string().required('Code is required'),
    department: Yup.string().required('Department selection is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      email: '',
      password: '',
      department: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const formdata = {
        name : values?.name,
        email : values?.email,
        password : values?.password,
        code : values?.code,
        department : values?.department
      }
      console.log(formdata);
      try {
        const res = await fetch('https://bbdu-backend-2.onrender.com/admin/signup', {
          method: 'POST',
          body: JSON.stringify(formdata),
          headers: { 
            "Content-Type": "application/json" 
          },
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
    <div className="min-h-screen flex items-center justify-center admin-bg">
      <div className="bg-white md:max-w-5xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-3xl px-12 py-8 mb-20 mt-20 flex flex-col md:flex-row ">
        <div className="w-full mb-4 md:mb-0 md:w-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center md:text-left">Sign up</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4  items-center">
              <label htmlFor="" className='block text-lg font-medium text-black-700'>Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="XYZ"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 "
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs italic">{formik.errors.name}</p>
            )}

            <div className="mb-4 ">
              <label htmlFor="" className='block text-lg font-medium text-black-700'>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Your Email"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500  "
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
            )}

            <div className="mb-4 ">
              <label htmlFor="" className='block text-lg font-medium text-black-700'>Password</label>
              <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Password"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500  "
              />
              <span onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs italic">{formik.errors.password}</p>
            )}

            <div className="mb-4">
              <label htmlFor="" className='block text-lg font-medium text-black-700'>Special Code</label>
              <input
                type="text"
                name="code"
                id="code"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.code}
                placeholder="Enter the Code"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 "
              />
            </div>
            {formik.touched.code && formik.errors.code && (
              <p className="text-red-500 text-xs italic">{formik.errors.code}</p>
            )}

           
            {/* New department dropdown */}
            <div className="mb-6">
              <label htmlFor="department" className="block text-black-700 text-lg  mb-2">Department</label>
              <select
                name="department"
                id="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-300 rounded-md w-full py-2 px-3 shadow-sm focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Department</option>
                <option value="SCHOOL OF ENGINEERING">SCHOOL OF ENGINEERING</option>
                <option value="SCHOOL OF MANAGEMENT">SCHOOL OF MANAGEMENT</option>
                <option value="BABU BANARASI DAS COLLEGE OF DENTAL SCIENCES">BABU BANARASI DAS COLLEGE OF DENTAL SCIENCES</option>
                <option value="SCHOOL OF PHARMACY">SCHOOL OF PHARMACY</option>
                <option value="SCHOOL OF ARCHITECTURE AND PLANNING">SCHOOL OF ARCHITECTURE AND PLANNING</option>
                <option value="SCHOOL OF COMPUTER APPLICATIONS">SCHOOL OF COMPUTER APPLICATIONS</option>
                <option value="SCHOOL OF LEGAL STUDIES">SCHOOL OF LEGAL STUDIES</option>
                <option value="SCHOOL OF HOTEL MANAGEMENT">SCHOOL OF HOTEL MANAGEMENT</option>
                <option value="SCHOOL OF BASIC SCIENCES">SCHOOL OF BASIC SCIENCES</option>
                <option value="SCHOOL OF HUMANITIES & SOCIAL SCIENCES">SCHOOL OF HUMANITIES & SOCIAL SCIENCES</option>
                <option value="SCHOOL OF EDUCATION">SCHOOL OF EDUCATION</option>
              </select>
            </div>
            
            {/* Continue existing fields */}
            <div className="flex items-center justify-center ">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md">
                Register
              </button>
            </div>
          </form>
          <div className='lg:hidden flex justify-center mt-4'>
          <Link to="/AdminLogin" className="text-blue-500 font-bold mt-3 hover:text-red-900">I am already a member</Link>

          </div>
        </div>
        <div className="hidden md:flex w-3/5  flex-col items-center justify-center">
          <img src={image} alt="Sign up" />
          <div className='flex justify-center'>
          <Link to="/AdminLogin" className="text-blue-500 font-bold mt-3 hover:text-red-900">I am already a member</Link>

          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminSignup;
