import React from 'react'
import cover from '../Images/bg-image-5.jpg'
const Newsletter = () => {
    return (
        <div className="container-fluid mb-5" style={{ backgroundImage: `url(${cover})`, backgroundPositionX: "right", backgroundRepeat: "no-repeat", backgroundColor: "#ccccdb" }}>
            <div className="container py-5">
                <h2>Get weekly update</h2>
                <span >Start Your Daily Shopping with us</span>
                <div className="container d-flex justify-content-start align-items-center py-5">
                    <input className="form-control w-50" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <input type="submit" value="Subscribe" className="btn btn-dark" />
                </div>
            </div>
        </div>
    )
}

export default Newsletter
