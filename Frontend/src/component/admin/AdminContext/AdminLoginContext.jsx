import { createContext, useState } from "react";
import { enqueueSnackbar } from "notistack";
export const AdminLoginContext = createContext(null);



export const AdminLoginProvider = (props) => {
    const [Adminlogin,SetAdminLogin] = useState(false);
    
    const check = async() => {
        const resp = await fetch('http://localhost:3000/admin/validatetoken',{
            credentials : "include",
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        console.log(resp.body)
        if(resp.status === 201){
            SetAdminLogin(true);
            enqueueSnackbar('Admin LoggedIn', {variant: 'success'})
        }else{
            enqueueSnackbar('Admin Not LoggedIn', {variant: 'error'})
        }
    }
    check();
    return(
        <AdminLoginContext.Provider value={{Adminlogin, SetAdminLogin}}>
        {props.children}
        </AdminLoginContext.Provider>
    )
}