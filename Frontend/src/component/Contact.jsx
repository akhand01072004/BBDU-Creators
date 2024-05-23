
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import "./Design.css"
import { useFormik } from 'formik'
import { enqueueSnackbar } from 'notistack'

export default function Contact() {

    const contactForm = useFormik({
        initialValues:{
            name:'',
            email:"",
            number:"",
            message:""
        },

         onSubmit : async(values,  {resetForm}) => {
            console.log(values);
             resetForm();
            const res = await fetch("http://localhost:3000/contact/add",{
                method:"POST",
                body:JSON.stringify(values),
                headers:{
                    "Content-Type" :"applocation/json"
                }
            })
            console.log(res.status);
            if(res.status === 200){
                enqueueSnackbar("message send successfully",{variant:"success"})
            }else{
                enqueueSnackbar("message not send",{variant:"error"})
            }
         }

        
    })
  
  return (
    <>
    <NavBar></NavBar>
    <section className='flex flex-col justify-start items-center mt-10 contact'>
        <h1 className='text-4xl'>Contact Us ☎️</h1>
        <h3 className='text-gray-400 mt-4'>These are the ways you can get in touch with us.</h3>
        <div className='flex flex-col items-center justify-center gap-8 text-center'>
            <div>
                <p className='max-w-xs md:max-w-lg font-extralight'>
                feel free to contact us if you are facing any problem.
                </p></div>
            

            {/* bottom form */}
            <div className='p-8 text-left w-full flex items-center justify-center'>
                <form action='https://getform.io/f/2e9d5179-2ebc-4f0d-a292-a6a73347ba78' method='POST' onSubmit={contactForm.handleSubmit}>
                    <div className='gap-4 w-full'>
                        <div className='flex flex-col'>
                            <label className='capitalize text-sm py-2 font-extralight'>name</label>
                            <input
                            type='text'
                            name='name'
                            value={contactForm.values.name}
                            onChange={contactForm.handleChange}
                            className='border-2 rounded-lg p-3 flex focus:outline-none border-gray-400  text-black'
                            ></input>
                        </div>
                        <div className='flex flex-col'>
                            <label className='capitalize text-sm py-2 font-extralight'>Phone</label>
                            <input
                            type='text'
                            name='number'
                            value={contactForm.values.number}
                            onChange={contactForm.handleChange}
                            className='border-2 rounded-lg p-3 flex focus:outline-none border-gray-400  text-black'
                            ></input>
                        </div>
                        <div className='flex flex-col'>
                            <label className='capitalize text-sm py-2 font-extralight'>Email</label>
                            <input
                            type='email'
                            name='email'
                            value={contactForm.values.email}
                            onChange={contactForm.handleChange}
                            className='border-2 rounded-lg p-3 flex focus:outline-none border-gray-400  text-black'
                            ></input>
                        </div>
                        <div className='flex flex-col'>
                            <label className='capitalize text-sm py-2 font-extralight'>Message</label>
                            <textarea name='message' value={contactForm.values.message} onChange={contactForm.handleChange} className='border-2 rounded-lg p-3 flex focus:outline-none border-gray-400  dark:text-black resize-none overflow-y-scroll no-scrollbar'></textarea>
                        </div>
                    </div>

                    <div>
                        <button type='submit' className='my-8 bg-blue-800 text-white px-10 py-3  uppercase rounded-md tracking-wider cursor-pointer'>send message</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
    </>
  )
}
