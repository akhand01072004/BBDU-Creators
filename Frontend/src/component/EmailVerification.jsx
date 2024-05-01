import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from 'notistack';


function EmailVerification() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const sendVerificationMail = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/SendEmail', {
        method: "POST",
        body: JSON.stringify({ emailto: email }),
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (response.status === 201) {
        enqueueSnackbar('OTP sent to your email', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to send OTP', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verify = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/validate-otp', {
        method: "POST",
        body: JSON.stringify({ otp }),
        headers: {
          'Content-Type': "application/json"
        }
      });
      if (response.status === 201) {
        enqueueSnackbar('Email verified successfully', { variant: 'success' });
        navigate('/');
      } else {
        enqueueSnackbar('Please enter the correct one-time password', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
        <h1 className="text-xl font-semibold text-center">Verify Your Email</h1>
        <div className="flex gap-2">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-grow p-2 border rounded-md"
          />
          <button
            onClick={sendVerificationMail}
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Send
          </button>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter the OTP"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          onClick={verify}
          className="w-full py-2 text-white bg-blue-500 rounded-md"
        >
          Verify
        </button>
      </div>
    </div>
    </>
  );
}

export default EmailVerification;
