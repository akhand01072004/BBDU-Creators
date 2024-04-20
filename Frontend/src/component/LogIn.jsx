import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import * as yup from 'yup';
import './Design.css';
import image from '../assets/signin-image.jpg';

const LogIn = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const LoginSchema = yup.object().shape({
        email: yup.string().email('Invalid Email').required('Required'),
        password: yup.string().required('Required').min(8)
    });

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, actions) => {
            const response = await fetch('http://localhost:3000/user/login', {
                method: "POST",
                body: JSON.stringify(values),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                enqueueSnackbar('User Logged In Successfully', { variant: 'success' });
                navigate('/');
            } else if (response.status === 400) {
                enqueueSnackbar('Invalid Credentials', { variant: 'error' });
            } else {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            }
            actions.setSubmitting(false);
            actions.resetForm();
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center back-bg">
            <div className="bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-3xl px-8 py-8 flex flex-col justify-around md:flex-row ">
                <div className="w-full mb-4 md:mb-0 md:w-auto flex flex-col justify-center items-center ml-10 mr-10">
                    <h2 className="text-3xl mr-6 md:text-5xl font-bold mb-12 text-center md:text-left work">Sign In</h2>
                    <form onSubmit={loginForm.handleSubmit} className="mt-8">
                        <div className="mb-8 flex items-center">
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
                            {loginForm.errors.email && loginForm.touched.email && (
                                <span className="text-red-500">{loginForm.errors.email}</span>
                            )}
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
                            <i onClick={togglePasswordVisibility} className={`fa-solid ml-2 cursor-pointer ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            {loginForm.errors.password && loginForm.touched.password && (
                                <span className="text-red-500">{loginForm.errors.password}</span>
                            )}
                        </div>
                        <div className="mb-8">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="agree-term"
                                    id="agree-term"
                                    className="form-checkbox text-indigo-600"
                                />
                                <span className="ml-2">Remember me</span>
                            </label>
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                        </div>
                    </form>
                </div>
                <div className="hidden md:flex ml-20 mr-15 flex-col items-center justify-center">
                    <figure>
                        <img src={image} alt="sign in image" />
                    </figure>
                    <Link to="/sign" className="text-blue-800 hover:text-red-500">New! Create your Account</Link>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
