import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname,
        });
        return () => clearInterval(interval);
    }, [count, navigate, location, path])
    return (
        <>
            <div className="d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>
                <div className="" >
                    <button className="btn btn-primary" type="button" disabled>
                        <h3 className='text-center'>Redirecting to you in {count} second</h3>
                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
                        Loading...
                    </button>
                </div>
            </div>
        </>
    )
}

export default Spinner
