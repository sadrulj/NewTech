import { useState, useEffect } from "react";
import { useAuth } from "../component/Context/auth.js";
import { Outlet } from "react-router-dom";
import axios from 'axios'
import Spinner from "../component/Layout/Spinner";

export default function UserRoute() {
    const [ok, setOk] = useState(false)
    const [auth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        };
        if (auth?.token) authCheck()
        // console.log(auth?.token);
    }, [auth?.token])
    return ok ? <Outlet /> : <Spinner />
}