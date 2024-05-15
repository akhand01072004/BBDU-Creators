import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import * as yup from 'yup';
import image from '../../assets/admin-signin-logo.jpg';
import '../../component/Design.css';
import { AdminLoginContext } from '../admin/AdminContext/AdminLoginContext';

const LoginSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Required'),
    password: yup.string().required('Required').min(8)
});

const AdminLogin = () => {

    const LoginState = useContext(AdminLoginContext);

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const navigate = useNavigate();
    if(LoginState.Adminlogin == true){
        navigate('/Dashboard');
    }
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 contact">
            <div className="w-full max-w-4xl mx-auto bg-white shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-3xl px-8 py-8 flex flex-col md:flex-row justify-around items-center">
                <div className="flex flex-col w-full md:w-1/2 px-4 py-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center md:text-center">Sign In</h2>
                    <form onSubmit={loginForm.handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-semibold text-black-900">Your Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={loginForm.handleChange}
                                value={loginForm.values.email}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                                placeholder="Email"
                            />
                            {loginForm.errors.email && loginForm.touched.email && (
                                <span className="text-xs text-red-500">{loginForm.errors.email}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-semibold text-black-900">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={loginForm.handleChange}
                                    value={loginForm.values.password}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                                />
                                <span onClick={togglePasswordVisibility} className={`absolute inset-y-0 right-3 flex items-center cursor-pointer`}>
                                    <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                                </span>
                            </div>
                            {loginForm.errors.password && loginForm.touched.password && (
                                <span className="text-xs text-red-500">{loginForm.errors.password}</span>
                            )}
                        </div>
                        <div className="flex items-center justify-center">
                            
                            <button type="submit" className="px-6 py-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">Login</button>
                        </div>
                    </form>
                    <div className='mt-4 flex justify-center'>
                    <Link to="/AdminSignup" className="text-red-500 font-bold hover:text-red-500 mt-4">New? Create your Account</Link>

                    </div>
                </div>
                <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2">
                    <img src={image} alt="Sign in visual" className="rounded-lg"/>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
