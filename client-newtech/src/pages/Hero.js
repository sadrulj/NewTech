import React from 'react'
import banner from '../Images/pexels-yan-krukau-5793953.jpg'
import { useNavigate } from 'react-router-dom';
const Hero = () => {
    const navigate = useNavigate();
    return (
        <div className="container-fluid mb-3" style={{ backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${banner})`, height: "70vh", width: "100vw", backgroundPosition: "center" }}>
            <div className="container py-5">
                <div className="pt-5">
                    <h2 className="pt-5">Immerse yourself <br />in a 5K dream</h2>
                </div>
                <button className="btn btn-success" onClick={() => navigate(`/shop`)}>Shop Now</button>
            </div>
        </div>
    )
}

export default Hero
