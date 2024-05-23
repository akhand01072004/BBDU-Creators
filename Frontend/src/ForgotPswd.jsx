import { useState } from "react"
import { enqueueSnackbar } from 'notistack';

function ForgotPswd() {

  const [useremail , setEmail] = useState('');

  const sendemail = async() => {
    const data = {
        email : useremail
    }
    try {
        const res = await fetch('http://localhost:3000/users/forgot-password',{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json"
            }
        });
        if (res.status === 203) {
            enqueueSnackbar('Email sent successfully', { variant: 'success' });
          } else {
            enqueueSnackbar('Failed to sent email', { variant: 'error' });
          }
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <>
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
        <h1 className="text-xl font-semibold text-center">Password Reset</h1>
        <p className="text-center">we sent a password-reset link to your email.</p>
        <div className="flex gap-2">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow p-2 border rounded-md"
          />
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={sendemail}>
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default ForgotPswd