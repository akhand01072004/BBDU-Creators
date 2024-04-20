import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import * as yup from 'yup';
import image from '../../assets/signin-image.jpg';
import '../../component/Design.css'

const LoginSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Required'),
    password: yup.string().required('Required').min(8)
});

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const navigate = useNavigate();
    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, action) => {
            const res = await fetch('http://localhost:3000/admin/login', {
                method: "POST",
                body: JSON.stringify(values),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            action.resetForm();
            if (res.status === 200) {
                enqueueSnackbar('Admin Logged In Successfully', { variant: 'success' });
                navigate('/Dashboard');
            } else if (res.status === 400) {
                enqueueSnackbar('Invalid Credentials', { variant: 'error' });
            } else {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            }
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center admin-bg">
            <div className="bg-white shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] rounded-3xl px-8 py-8 mb-4 flex flex-col md:flex-row ">
                <div className="flex flex-col justify-center items-center ml-10 mr-10">
                    <h2 className="text-4xl mr-6 font-bold mb-10 text-center md:text-left">Sign In</h2>
                    <form onSubmit={loginForm.handleSubmit}>
                        <div className="mb-8 flex items-center mt-10">
                            <i className="fa-regular fa-envelope"></i>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={loginForm.handleChange}
                                value={loginForm.values.email}
                                placeholder="Your Email"
                                className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-80"
                            />
                        </div>
                        <div className="mb-8 flex items-center">
                            <i className="fa-solid fa-lock"></i>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={loginForm.handleChange}
                                value={loginForm.values.password}
                                className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-80"
                            />
                            <i className={`ml-2 fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} cursor-pointer`} onClick={togglePasswordVisibility}></i>
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <div className="hidden md:flex ml-20 mr-15 flex-col items-center justify-center">
                    <figure><img src={image} alt="sign in" /></figure>
                    <Link to="/AdminSignup" className="text-blue-400 hover:text-blue-500 ">New! Create your Account</Link>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
