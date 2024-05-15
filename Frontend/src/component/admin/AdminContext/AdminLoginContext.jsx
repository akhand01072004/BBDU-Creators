import { createContext, useState } from "react";
export const AdminLoginContext = createContext(null);



export const AdminLoginProvider = (props) => {

    const [Adminlogin,SetAdminLogin] = useState(false);

    const localhost_url =  "http://localhost:3000/admin/validatetoken";
    //const render_url = "https://bbdu-backend-2.onrender.com/admin/validatetoken";
    
    const check = async() => {
        const resp = await fetch(`${localhost_url}`,{
            credentials : "include",
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        console.log(resp.body)
        if(resp.status === 201){
            SetAdminLogin(true);
        }
    }

    check();
    
    return(
        <AdminLoginContext.Provider value={{Adminlogin, SetAdminLogin}}>
        {props.children}
        </AdminLoginContext.Provider>
    )
}