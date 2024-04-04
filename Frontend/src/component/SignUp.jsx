import { Link } from 'react-router-dom'
import './Design.css'
import {useFormik} from 'formik'
// import { register } from '../apiClient'
import * as yup from 'yup'
import { enqueueSnackbar } from 'notistack';
import image from '../assets/signup-image.jpg'

const signSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Required'),
  password: yup.string().required('required').min(8)
})

const SignUp = () => {
  
  const loginForm = useFormik({
    initialValues: {
    name : '',
    email: '',
    password: ''
    },
    // Step4 : what happens when form is submitted
    onSubmit : async(values, action) => {
      console.log(values);
      // const {name,email,pass} = values;
      const data = {
        name : values.name,
        email : values.email,
        password : values.password
      }
      const res = await fetch('http://localhost:3000/api/user/register',{
        method:'POST',
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type":"application/json"
        },
      })
      console.log(data);
      if(res.status === 201){
        enqueueSnackbar('User Added Successfully', {variant: 'success'})
      }else{
        enqueueSnackbar('User not added', {variant: 'error'})
      }

  }})


  return (
    <>
    <div className="min-h-screen flex items-center justify-center  back">
  {/* Sign up form */}
  
    <div className="bg-white shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] rounded-3xl px-8  mb-4 flex flex-col md:flex-row   pad">
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
              className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-full"
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
              className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-full"
            />
            <span style={{color:'red', fontsize: '50px', marginLeft: '10px'}}>{loginForm.errors.email}</span>
              
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
              id="pass"
              placeholder="Password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
              className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-full"
            />
            <span style={{color:'red', fontsize: '10'}}>{loginForm.touched.password && loginForm.errors.password}</span>
          </div>
          <div className="mb-8 flex">
            <label
              htmlFor="re_pass"
              className="block text-gray-700 text-sm font-bold mb-2 flex items-center"
            >
              <i className="fa-solid fa-lock"></i>
            </label>
            <input
              type="password"
              name="re_pass"
              id="re_pass"
              placeholder="Confirm password"
              onChange={loginForm.handleChange}
              value={loginForm.values.re_pass}
              className="border-0 border-b-2 border-black focus:outline-none focus:border-blue-500 ml-2 w-full"
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
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  Terms of service
                </a>
              </span>
            </label>
          </div>
          <div className="flex items-center justify-between mb-2 cursor-pointer">
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
          <img className="" src={image} alt="sing up image" />
        </figure>
        <Link to="/login" className="text-white p-2 mt-1 bg-blue-500 rounded-md hover:bg-blue-600">
          I am already member
        </Link>
      </div>
    </div>
</div>

    </>
  )
}

export default SignUp