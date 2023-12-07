import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react" ;

export let AuthContext = createContext(null)

export default function AuthContextProvider(props){

    let requstHeaders = { 
        Authorization : `Bearer ${localStorage.getItem("adminToken")}`,
    }

    let requstHeadersImg = { 
        Authorization : `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-Type": "multipart/form-data"
    }

    let baseUrl = `https://upskilling-egypt.com:443/api/v1`;


    const [adminData , setAdminData] = useState(()=> localStorage.getItem("adminToken"));

    let saveAdminData = ()=> {
        let encodedToken = localStorage.getItem("adminToken");
        try{
            let decodedToken = jwtDecode(encodedToken);
            setAdminData(decodedToken)
        }catch (error){
            setAdminData(null)
        }
    }
    
    useEffect( ()=> {
        if (localStorage.getItem("adminToken")) {
            saveAdminData()
        }
    } , [])

    return ( <AuthContext.Provider value= {{adminData , saveAdminData , requstHeaders , baseUrl , requstHeadersImg }} >

        {props.children}

    </AuthContext.Provider>)

}