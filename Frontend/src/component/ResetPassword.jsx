import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";

function ResetPassword() {

    // const [email, setEmail] = useState('');
    const [newpswd, setPswd] = useState('');
    const [cnfrmpswd, setCnfrmPswd] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {email,token} = useParams();
    console.log(email,token);
    // const {token} = useParams();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
   
    const resetpswd = async() => {
      const data = {
        password : newpswd
      }
      console.log(data);
      try {
        const res = await fetch(`http://localhost:3000/users/reset-password/${email}/${token}`,{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json"
            }
        });
        if (res.status === 201) {
            enqueueSnackbar('Password Updated', { variant: 'success' });
          } else {
            enqueueSnackbar('Failed to update password', { variant: 'error' });
          }
    } catch (error) {
        console.log(error);
    }
    }

  
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
        <h1 className="text-xl font-semibold text-center">Verify Your Email</h1>
        <div className="flex flex-col gap-2">

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={(e) => (setPswd(e.target.value))}
                    placeholder="Enter your new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                />
                <span onClick={(e) => {
                  e.stopPropagation();
                  togglePasswordVisibility();
                }} className={`absolute inset-y-0 right-3 flex items-center cursor-pointer`}>
                    <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                </span>
            </div>

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="cnfrmpswd"
                    id="cnfrmpswd"
                    onChange={(e) => (setCnfrmPswd(e.target.value))}
                    placeholder="Confirm password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                />
                <span onClick={(e) => {
                  togglePasswordVisibility()
                }} className={`absolute inset-y-0 right-3 flex items-center cursor-pointer`}>
                    <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                </span>
            </div>
          
        </div>
        <div>
         <button className="w-full py-2 text-white bg-blue-500 rounded-md" onClick={resetpswd}>Reset password</button>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default ResetPassword