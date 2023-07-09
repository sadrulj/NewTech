import React from 'react'
import logo from '../../Images/logo.png'
import qr from '../../Images/qr.jpg'

const Footer = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <img src={logo} alt="" />
                    <div className="container">
                        <h4>Support</h4>
                        <p>000, Market Street,<br />Las Vegas, LA 00000,<br />United State</p>
                    </div>
                </div>
                <div className="col">
                    <h4>Account</h4>
                    <ul className="navbar-nav mx-auto my-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">My Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    <h4>Quick Link</h4>
                    <ul className="navbar-nav mx-auto my-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">My Account</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    <h4>Download App</h4>
                    <small style={{ fontSize: "10px" }} className="text-secondary ms-2">Save $3 WIth App & New User only</small>
                    <img src={qr} alt="" />
                </div>
            </div>
            <hr />
            <div className="bg-body-tertiary p-2 text-center">
                <div className="container ">
                    <h6>&copy; All Copy rights reserve by Jamil Inc.</h6>
                </div>
            </div>
        </div>
    )
}

export default Footer
