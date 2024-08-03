import { Outlet, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "./authApiSlice";
import { selectCurrentToken } from "./authSlice";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

const PersistLogin = () => {
    const effectRan = useRef(false)

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        if(effectRan.current === true || process.env.NODE_ENV !== 'development'){
            const verifyRefreshToken = async () => {
                try{
                    await refresh()
                    setTrueSuccess(true)
                }
                catch(err){
                    console.log(err);
                }
            }

            if(!token && persist)
                verifyRefreshToken()
        }

        return () => effectRan.current = true

        //eslint-disable-next-line
    }, [])

    let content
    if(!persist){ //persist: no
        console.log("No persist");
        content = <Outlet />
    }
    else if(isLoading){ //persist: yes   token: no
        console.log("Loading");
        content = <PulseLoader color={"#FFF"} />
    }
    else if(isError){ //persist: yes    token: no
        console.log("Error");
        content = <p className="errMsg">{error?.data?.message} - {<Link to="/login">Please login again</Link>}</p>
    }
    else if(isSuccess && trueSuccess){ //persist: yes   token: yes
        console.log("Success");
        content = <Outlet />
    }
    else if(token && isUninitialized){ //persist: yes   token: yes
        console.log("Uninitialized");
        console.log(isUninitialized);
        content = <Outlet />
    }

    return content
}

export default PersistLogin