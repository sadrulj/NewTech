import React, { useState, useEffect } from 'react'
import Layout from '../component/Layout/Layout.js'
import { useCart } from "../component/Context/cart.js";
import { useAuth } from "../component/Context/auth.js";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast'
import DropIn from "braintree-web-drop-in-react"

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };
    //delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };


    //get Payment gateway Token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/braintree/token`)
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (auth?.token) getToken()
    }, [auth?.token])

    //Handle Payment
    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/braintree/payment`, {
                nonce, cart
            })
            console.log(data);
            setLoading(false)
            localStorage.removeItem("cart")
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success('Payment Completed Successfully')
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    return (
        <Layout title={"Cart"}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length && auth?.token
                                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"
                                }`
                                : " Your Cart Is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-md-7 px-5">
                        {auth?.token && cart?.map((p, i) => (
                            <div className="row mb-2 p-3 card flex-row" key={i}>
                                <div className="col-md-4">
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                        style={{ width: "150px", height: "150px" }}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>Price : {p.price}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeCartItem(p._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-5 text-center px-5">
                        {auth?.token ?
                            (<>
                                <h2>Cart Summary</h2>
                                <p>Total | Checkout | Payment</p>
                                <hr />
                                <h4>Total : {totalPrice()} </h4>
                            </>) : (
                                <>

                                </>
                            )
                        }
                        {auth?.token && auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>

                                ) : (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Please Login to checkout
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="mt-2">
                            {!clientToken || !auth?.token || !cart?.length ? (
                                ""
                            ) : (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: "vault",
                                            },

                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />

                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address}
                                    >
                                        {loading ? "Processing ...." : "Make Payment"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
