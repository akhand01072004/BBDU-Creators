import { createContext, useState } from "react";
import { enqueueSnackbar } from "notistack";
export const LoginContext = createContext(null);



export const LoginProvider = (props) => {
    const [login,SetLogin] = useState(false);
    const check = async() => {
        const resp = await fetch('http://localhost:3000/user/validatetoken',{
            credentials : "include",
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        console.log(resp)
        if(resp.status === 201){
            SetLogin(true);
        }
    }
    check();
    return(
        <LoginContext.Provider value={{login, SetLogin}}>
        {props.children}
        </LoginContext.Provider>
    )
}

