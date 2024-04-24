import "./Design.css";

export default function Contact() {
  return (
    <>
      <section className='flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-contact'>
        <div className="bg-white-200 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] rounded-lg p-8 max-w-4xl w-full m-4">
          <h1 className='text-4xl font-bold text-center text-blue-400'>Contact Us ☎️</h1>
          <h3 className='text-black mt-4 text-center'>These are the ways you can get in touch with us.</h3>
          <p className='text-center text-black mt-2 max-w-md mx-auto'>
            Feel free to contact us if you are facing any problem. We are here to help with any issues or concerns.
          </p>

          {/* Contact Form */}
          <form action='https://getform.io/f/2e9d5179-2ebc-4f0d-a292-a6a73347ba78' method='POST' className="mt-8">
            <div className='space-y-6'>
              <div className='flex flex-col'>
                <label className='capitalize text-lg font-semibold text-black-700 mb-2'>Name</label>
                <input
                  type='text'
                  name='name'
                  className=' border border-black-300  p-2 rounded-md shadow-sm'
                  placeholder='Your name'
                />
              </div>
              <div className='flex flex-col'>
                <label className='capitalize text-lg font-semibold text-black-700 mb-2'>Phone</label>
                <input
                  type='text'
                  name='phone'
                  className=' border border-black-800  rounded-md shadow-sm p-2'
                  placeholder='Your phone number'
                />
              </div>
              <div className='flex flex-col'>
                <label className='capitalize text-lg font-semibold text-black-700 mb-2'>Email</label>
                <input
                  type='email'
                  name='email'
                  className='border border-black-800  rounded-md shadow-sm p-2'
                  placeholder='Your email address'
                />
              </div>
              <div className='flex flex-col'>
                <label className='capitalize text-lg font-semibold text-black-700 mb-2'>Message</label>
                <textarea
                  name='message'
                  className='border border-black-800  rounded-md shadow-sm p-2'
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
      </section>
    </>
  )
}
