import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const Placeholder = ({ path = "shop" }) => {
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
            <div className="card" aria-hidden="true">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h6 className="card-title placeholder-glow">
                        <span className="placeholder col-6" />
                    </h6>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7" />
                        <span className="placeholder col-4" />
                        <span className="placeholder col-4" />
                    </p>
                    <a className="btn btn-primary disabled placeholder col-6" />
                </div>
            </div>

        </>
    )
}

export default Placeholder
