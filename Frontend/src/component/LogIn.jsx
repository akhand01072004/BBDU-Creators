import { Link } from 'react-router-dom'
import './Design.css'
import image from '../assets/signin-image.jpg'
import { useFormik } from 'formik'
import * as yup from 'yup'

// Step5 : Validation Schema
const LoginSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Required'),
    password: yup.string().required('required').min(8)

})

const LogIn = () => {
    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        // Step4 : what happens when form is submitted
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            resetForm()
        },
        // Step6 : Validation Schema
        validationSchema: LoginSchema
    })
    return (
        <>

            <div className="min-h-screen flex items-center justify-center  back">
                {/* Sign up form */}

                <div className="bg-white shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-3xl px-8  mb-4 flex flex-col md:flex-row   pad">

                    <div className="w-full mb-4 md:mb-0 md:w-auto flex flex-col justify-center items-center ml-10 mr-10">
                        <h2 className="text-3xl mr-6 md:text-5xl font-bold mb-12 text-center md:text-left work">Sign In</h2>

                        <form method="POST" className="mt-8">

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
                                    className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-full"
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
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={loginForm.handleChange}
                                    value={loginForm.values.password}
                                    className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-full"
                                />
                                <span style={{color:'red', fontsize: '10'}}>{loginForm.touched.password && loginForm.errors.password}</span>
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
                                        Remember me{" "}

                                    </span>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <input
                                    type="submit"
                                    name="signup"
                                    id="signup"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    defaultValue="Register"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="hidden md:flex ml-20 mr-15 flex-col items-center justify-center">

                        <figure>
                            <img className="" src={image} alt="sing up image" />
                        </figure>
                        <Link to="/sign" className="text-white p-2  my-1 rounded-md bg-blue-400 hover:bg-blue-500">
                            New! Create your Account
                        </Link>
                    </div>


                </div>

            </div>

        </>
    )
}

export default LogIn