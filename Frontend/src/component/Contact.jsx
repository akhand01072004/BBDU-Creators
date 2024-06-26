<<<<<<< HEAD

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
  
=======
import React from 'react';
import contactImage from '../assets/contact-image.jpg'; // Ensure the path is correct
import "./Design.css";

export default function Contact() {
>>>>>>> 1eb59ef5108eb05f8b7643cc1289eea4265dd058
  return (
    <>
     <section className='flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 bg-contact'>
        <div className="bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-lg p-8 max-w-5xl w-full m-4 flex gap-6 m-16 md:m-20 ">
          {/* Image div that disappears on small screens */}
          <div className="hidden md:block w-2/5">
            <img src={contactImage} alt="Contact Us" className=" object-cover h-full" />
          </div>
          <div className="flex-1">
            <h1 className='text-5xl font-bold text-center text-Black-800'>Contact Us ☎️</h1>
            <p className='text-center text-black mt-2 max-w-md mx-auto'>
              Feel free to contact us if you are facing any problem. We are here to help with any issues or concerns.
            </p>

<<<<<<< HEAD
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
=======
            {/* Contact Form */}
            <form action='https://getform.io/f/2e9d5179-2ebc-4f0d-a292-a6a73347ba78' method='POST' className="mt-8">
              <div className='space-y-6'>
                <div className='flex flex-col'>
                  <label htmlFor="name" className='capitalize text-lg font-semibold text-black-700 mb-2'>Name</label>
                  <input
                    type='text'
                    id="name"
                    name='name'
                    aria-label="Your Name"
                    className='border border-gray-300 p-2 rounded-md shadow-sm'
                    placeholder='Your name'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="phone" className='capitalize text-lg font-semibold text-black-700 mb-2'>Phone</label>
                  <input
                    type='text'
                    id="phone"
                    name='phone'
                    aria-label="Your Phone Number"
                    className='border border-gray-300 rounded-md shadow-sm p-2'
                    placeholder='Your phone number'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="email" className='capitalize text-lg font-semibold text-black-700 mb-2'>Email</label>
                  <input
                    type='email'
                    id="email"
                    name='email'
                    aria-label="Your Email Address"
                    className='border border-gray-300 rounded-md shadow-sm p-2'
                    placeholder='Your email address'
                  />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="message" className='capitalize text-lg font-semibold text-black-700 mb-2'>Message</label>
                  <textarea
                    id="message"
                    name='message'
                    aria-label="Your Message"
                    className='border border-gray-300 rounded-md shadow-sm p-2'
                    placeholder='Type your message here'
                    rows="4"
                  ></textarea>
                </div>
                <div className='flex justify-center'>
                  <button className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded shadow-lg hover:shadow-xl transition duration-150'>
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
>>>>>>> 1eb59ef5108eb05f8b7643cc1289eea4265dd058
        </div>
      </section>
    </>
  )
}
