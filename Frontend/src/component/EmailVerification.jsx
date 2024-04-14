import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from 'notistack';

function EmailVerification() {
  const [email, SetEmail] = useState('');
  const [otp, SetOtp] = useState('');
  const navigate = useNavigate();
  //console.log(data);
  const data = {
    emailto : email
  }
  async function sendVerificationMail(){
    try {
        const response = await fetch('http://localhost:3000/user/SendEmail', {
            method : "POST",
            body : JSON.stringify(data),
            headers: {
                "Content-Type":"application/json"
            },
        });
        if(response.status === 201){
            enqueueSnackbar('Otp sent on your email', {variant: 'success'})
        }else{
            enqueueSnackbar('failed to sent otp', {variant: 'error'})
        }
    } catch (error) {
        console.log(error);
    }
  }

  async function verify() {
    const otpdata = {
      otp : otp
    }
    console.log(otpdata);
    try {
      const response = await fetch('http://localhost:3000/user/validate-otp' , {
        method : "POST",
        body : JSON.stringify(otpdata),
        headers : {
          'Content-Type' : "application/json"
        }
      })
      if(response.status === 201){
        enqueueSnackbar('Email verified Successfully', {variant: 'success'});
        navigate('/');
    }else{
        enqueueSnackbar('Please Enter correct One time password', {variant: 'error'})
    }
    } catch (error) {
      console.log(error);
    }
  }

 
  return (
    <div className="flex flex-col justify-center gap-2 w-[20%] mt-16 mx-[40%]">
        <h1>Verify Your Email</h1>
        <div className="flex gap-2">
        <input type="email" onChange={(e) => SetEmail(e.target.value)} placeholder="Enter your email" className="border 2xp solid-black rounded-md p-2" />
        <button onClick={sendVerificationMail} className="bg-blue-500 w-[30%] text-white rounded-md py-2">Send</button>
        </div>
        <input type="text" onChange={(e) => {SetOtp(e.target.value)}} placeholder="Enter the otp" className="border 2xp solid-black rounded-md p-2"/>
        <button onClick={verify} className="bg-blue-500 text-white rounded-md py-2">Verify</button>
    </div>
  )
}

export default EmailVerification;
