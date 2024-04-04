import {  FaLinkedin} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Contact() {
  const social = [
    {
        id : 1,
        link : "https://www.linkedin.com/in/abhay-tiwari-b42579202/",
        icon : <FaLinkedin />
    }
  ]
  return (
    <section className='flex flex-col justify-start items-center mt-10'>
        <h1 className='text-4xl'>Contact Us ☎️</h1>
        <h3 className='text-gray-400 mt-4'>These are the ways you can get in touch with us.</h3>
        <div className='flex flex-col items-center justify-center gap-8 text-center'>
            <div>
                <p className='max-w-xs md:max-w-lg font-extralight'>
                feel free to contact us if you are facing any problem.
                </p></div>
            <div className='flex w-full items-center justify-evenly text-3xl'>
                {social.map(({id,link,icon}) => (
                    // eslint-disable-next-line react/jsx-key
                    <Link to={link}
                    target='_blank'
                    rel='noopener noreferrer'
                    key={id}
                    className='duration-200 ease-in-out hover:text-red-600'>{icon}</Link>
                ))}
            </div>

            {/* bottom form */}
            <div className='p-8 text-left w-full flex items-center justify-center'>
                <form action='https://getform.io/f/2e9d5179-2ebc-4f0d-a292-a6a73347ba78' method='POST'>
                    <div className='gap-4 w-full'>
                        <div className='flex flex-col'>
                            <label className='capitalize text-sm py-2 font-extralight'>name</label>
                            <input
                            type='text'
                            name='name'
                            className='border-2 rounded-lg p-3 flex focus:outline-none border-gray-400  text-black'
                            ></input>
                        </div>
                        <div className='flex flex-col'>
                            <label className='capitalize text-sm py-2 font-extralight'>Phone</label>
                            <input
                            type='text'
                            name='name'
                            className='border-2 rounded-lg p-3 flex focus:outline-none border-gray-400  text-black'
                            ></input>
                        </div>
                        <div className='flex flex-col'>
                            <label className='capitalize text-sm py-2 font-extralight'>Email</label>
                            <input
                            type='email'
                            name='name'
                            className='border-2 rounded-lg p-3 flex focus:outline-none border-gray-400  text-black'
                            ></input>
                        </div>
                        <div className='flex flex-col'>
                            <label className='capitalize text-sm py-2 font-extralight'>Message</label>
                            <textarea name='message' className='border-2 rounded-lg p-3 flex focus:outline-none border-gray-400  dark:text-black resize-none overflow-y-scroll no-scrollbar'></textarea>
                        </div>
                    </div>

                    <div>
                        <button className='my-8 bg-gradient-to-r from-rose-600 to-teal-500 text-white px-10 py-3  uppercase rounded-md tracking-wider cursor-pointer'>send message</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}
