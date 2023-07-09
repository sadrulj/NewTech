import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaUserAlt, FaShoppingCart } from "react-icons/fa"
import logo from "../../Images/logo.png"
import headphone from "../../Images/elec-9.png"
import { useAuth } from "../Context/auth.js"
import toast from "react-hot-toast"
import { useFavorite } from '../Context/favorite'
import { Badge } from 'antd';
import { useCart } from '../Context/cart'
const Header = () => {
    const [auth, setAuth] = useAuth()
    const [favorite, setFavorite] = useFavorite()
    const [cart] = useCart()
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: '',
        })
        setFavorite([])
        localStorage.removeItem('auth')
        // localStorage.removeItem('favorite')
        toast.success('Log Out Successfully')
    }
    return (
        <>
            <div className="bg-body-tertiary p-2">
                <div className="container ">
                    <div className="row">
                        <div className="col d-flex justify-content-start align-self-center">
                            <h6 className="pt-2 fw-semibold">FREE SHIPPING OVER $100</h6>
                        </div>
                        <div className="col  d-flex justify-content-end align-self-center">

                            {!auth.user ? (<>
                                <li className="nav-link dropdown me-2">
                                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FaUserAlt />
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li><NavLink to="/register" className="dropdown-item" >Register</NavLink></li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="dropdown-item">Login</NavLink>
                                        </li>
                                    </ul>
                                </li>

                            </>) : (<>
                                <li className="nav-link dropdown me-2">
                                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth?.user?.name}
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" href="#">Dashboard</NavLink></li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="dropdown-item" onClick={handleLogout}>Logout</NavLink>
                                        </li>
                                    </ul>
                                </li>


                            </>)}
                            <div>
                                {auth?.token ? (<>
                                    <Badge size="small" count={cart?.length}>
                                        <NavLink to="/cart" className="nav-link"><FaShoppingCart /></NavLink>
                                    </Badge>
                                </>) : (<>
                                    <Badge size="small" >
                                        <NavLink to="/cart" className="nav-link"><FaShoppingCart /></NavLink>
                                    </Badge>
                                </>)

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">

                    <div className="col-md-12">
                        <nav className="navbar navbar-expand-lg">
                            <div className="container">
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div className="">
                                    <img src={logo} alt="" />
                                </div>
                                <div className="collapse navbar-collapse" id="navbarText">
                                    <div className="m-auto">
                                        <ul className="navbar-nav mx-auto my-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <Link className="nav-link active icon-link-hover" aria-current="true" to="/">Home</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/shop">Shop</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/contactus">Contact Us</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link position-relative" to="/myFavorite">My Favorite
                                                    {favorite?.length > 0 && auth?.token ? (<>
                                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{favorite?.length}
                                                            <span className="visually-hidden">unread messages</span></span>
                                                    </>) : (<></>)}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="d-flex justify-content-end align-items-center ms-auto">

                                        <div className="">
                                            <img src={headphone} alt="" style={{ width: "50px", height: "50px" }} />
                                        </div>
                                        <div className="ms-3">
                                            <span className="fw-bold">+00000000</span>
                                            <p className="fs-6 text-secondary">24/7 Support Center</p>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </nav>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Header
