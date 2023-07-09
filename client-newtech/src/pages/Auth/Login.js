import React, { useState } from 'react'
import Layout from '../../component/Layout/Layout.js';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../component/Context/auth.js';
import { FaFacebookSquare, FaTwitterSquare, FaGooglePlusSquare } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import '../Auth/Login.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()
    const location = useLocation();

    //Form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password })
            if (res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || '/')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong!!")
        }
    }
    return (
        <Layout title='Login Page'>
            <section className="sign-in">
                <div className="signin-container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img className="signin-image-img" src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg" alt="login" /></figure>
                            <Link to='/register' className="signup-image-link">Create an account</Link>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Sign In</h2>
                            <form method="POST" className="register-form" id="login-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="your_email"><i className="react-icons" /><MdEmail /></label>
                                    <input type="text" name="your_email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} id="your_email" placeholder="Your Email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass"><i className="react-icons" /><RiLockPasswordFill /></label>
                                    <input type="password" name="your_pass" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} id="your_pass" placeholder="Password" />
                                </div>
                                <div className="input-group mb-3 check-box ms-0">
                                    <div className="input-group-text p-0 mt-0 me-1" style={{ border: "none" }}>
                                    </div>
                                    <div>
                                        <Link to="/forgot-password" className="label-agree-term">Forgot Password?</Link>
                                    </div>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" defaultValue="Log in" />
                                </div>
                            </form>
                            <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    <li><Link href="#" className='link'><i className="display-flex-center" /><FaFacebookSquare /></Link></li>
                                    <li><Link href="#" className='link'><i className="display-flex-center" /><FaTwitterSquare /></Link></li>
                                    <li><Link href="#" className='link'><i className="display-flex-center" /><FaGooglePlusSquare /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default Login
