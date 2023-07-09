import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout.js';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt, FaAddressBook } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { BsFillPhoneVibrateFill } from 'react-icons/bs'
import toast from 'react-hot-toast';
import axios from 'axios'
import '../Auth/Register.css'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const navigate = useNavigate()

    //Form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong!!")
        }
    }
    return (
        <Layout title='Register - Ecommerce App'>
            <section className="signup">
                <div className="signup-container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name"><i className="zmdi zmdi-label zmdi-account material-icons-name" /><FaUserAlt /></label>
                                    <input type="text" name="name" className="zmdi-input" value={name} onChange={(e) => setName(e.target.value)} id="name" placeholder="Your Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-label zmdi-email" /><MdEmail /></label>
                                    <input type="email" name="email" className="zmdi-input" value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Your Email" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-label zmdi-lock" /><RiLockPasswordFill /></label>
                                    <input type="password" name="pass" className="zmdi-input" value={password} onChange={(e) => setPassword(e.target.value)} id="pass" placeholder="Password" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone"><i className="zmdi zmdi-label zmdi-account material-icons-name" /><BsFillPhoneVibrateFill /></label>
                                    <input type="text" name="phone" className="zmdi-input" value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" placeholder="Your Phone Number" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address"><i className="zmdi zmdi-label zmdi-account material-icons-name" /><FaAddressBook /></label>
                                    <input type="text" name="address" className="zmdi-input" value={address} onChange={(e) => setAddress(e.target.value)} id="address" placeholder="Your Address" required />
                                </div>
                                <div className="input-group mb-3 check-box ms-0">
                                    <div className="input-group-text p-0 mt-0 me-1" style={{ border: "none" }}>
                                        <input className="form-check-input" type="checkbox" defaultValue aria-label="Checkbox for following text input" />
                                        <label htmlFor="agree-term" className="label-agree-term ms-2"> <span className="agree"> I agree all statements in</span> <Link to='/policy' className="term-service">Terms of service</Link></label>
                                    </div>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" defaultValue="Register" />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img className="signup-image-img" src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg" alt="register" /></figure>
                            <Link to='/login' className="signup-image-link mt-4">I am already member</Link>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default Register
