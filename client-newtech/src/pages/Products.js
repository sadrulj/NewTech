import React, { useState, useEffect } from 'react'
import { BsFillHeartFill } from 'react-icons/bs';
import { IoMdGitCompare } from 'react-icons/io';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useFavorite } from '../component/Context/favorite';
import { useCart } from '../component/Context/cart';
import { useAuth } from '../component/Context/auth';
import axios from "axios"
const Products = ({ products, loading }) => {
    const [favorite, setFavorite] = useFavorite()
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()

    const addToCart = (p) => {
        if (!auth?.user === true) {
            toast.error("Please Login to add items to Cart");
        } else {
            setCart([...cart, p]);
            localStorage.setItem("cart", JSON.stringify([...cart, p]))
            toast.success("Item Added to Cart");
        }
    }
    const addToFavorite = (p) => {
        const alreadyFavoriteExist = favorite && favorite.find((i) => i._id === p._id)
        if (alreadyFavoriteExist) {
            toast.error("Item Already in Favorite")
        } else {
            setFavorite([...favorite, p]);
            localStorage.setItem("favorite", JSON.stringify([...favorite, p]))
            toast.success("Item Added to Favorite");
        }
    }
    return (
        // <Layout title={"Products"}>
        <div className="container pb-5 ">
            {/* <h2 className="pb-5 text-center">Featured Products</h2> */}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {products?.map((p, i) => (
                    <div className="col rounded" key={i}>
                        {!loading ? (
                            <>
                                <div className="">
                                    {
                                        p.discount ?
                                            (<div className="d-flex justify-content-end">
                                                <span className="badge text-bg-warning z-1 position-absolute p-1 rounded-0 p-2 text-white rounded-end">Sale!</span>
                                            </div>) : (
                                                <div className="d-flex justify-content-end">
                                                    <span className=""></span>
                                                </div>
                                            )
                                    }
                                </div>
                                <div className="card h-100 border border-2 shadow-sm">
                                    <div >
                                        <Link to={`/product/${p.slug}`} className="nav-link">
                                            <img src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`} className="card-img-top p-2 mx-auto" style={{ width: "16rem", height: "16rem" }} alt="..." />
                                        </Link>
                                        <div className="card-body">
                                            <h6 className="card-title text-center overflow-auto text-nowrap">{p.name}</h6>
                                            <div className="d-flex justify-content-start">
                                                {p.discount ? (<>
                                                    <p className="
                                                        card-text
                                                        text-danger
                                                        text-center
                                                        text-decoration-line-through"
                                                    >$ {p.price}</p>
                                                    <p className="card-text text-success text-center ms-2">$ {(p.price - p.price * p.discount).toFixed(2)}</p>
                                                </>) : (<>
                                                    <p className="card-text text-success text-center ms-2 pb-3">$ {(p.price).toFixed(2)}</p>
                                                </>)}

                                            </div>

                                            <div className="d-flex justify-content-between">
                                                <button className="btn btn-success"
                                                    onClick={() => {
                                                        addToCart(p)
                                                        // setCart([...cart, p]);
                                                        // localStorage.setItem("cart", JSON.stringify([...cart, p]))
                                                        // toast.success("Item Added to Cart");
                                                    }}

                                                >Add to cart</button>
                                                <div>
                                                    {auth?.user ? (<>
                                                        <button
                                                            // className="btn btn-primary ms-1"
                                                            onClick={() => {
                                                                addToFavorite(p)
                                                            }}
                                                            key={i}
                                                            className={favorite._id ? "btn btn-danger ms-1" : "btn btn-primary ms-1"}
                                                        ><BsFillHeartFill /></button>
                                                    </>) : (<>
                                                        <button
                                                            // className="btn btn-primary ms-1"
                                                            onClick={() => {
                                                                setFavorite([]);
                                                                localStorage.setItem("favorite", JSON.stringify([]))
                                                                toast.error("Please Login to Add Items in Favorite");
                                                            }}
                                                            key={i}
                                                            className={favorite.indexOf(i) > i ? "btn btn-danger ms-1" : "btn btn-primary ms-1"}
                                                        // color={favorite.indexOf(i) > 0 ? "red" : "blue"}
                                                        ><BsFillHeartFill /></button>
                                                    </>)}
                                                    <button className="btn btn-primary ms-1"><IoMdGitCompare /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>) : (<>
                                <div className="card h-100 border border-2 shadow-sm" aria-hidden="true">
                                    <img src="..." className="card-img-top mx-auto placeholder" style={{ height: "16rem" }} alt="..." />
                                    <div className="card-body">
                                        <h6 className="card-title overflow-auto text-nowrap placeholder-glow">
                                            <span className="placeholder col-6" />
                                        </h6>
                                        <p className="card-text text-success placeholder-glow">
                                            <span className="placeholder col-4"></span>
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <Link className="btn btn-success disabled placeholder col-4"></Link>
                                            <div className="d-flex justify-content-end">
                                                <Link className="btn btn-primary disabled placeholder col-md-8"></Link>
                                                <Link className="btn btn-primary ms-1 disabled placeholder col-md-8"></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>)}

                    </div>
                ))}
            </div>

        </div>
        // </Layout>
    )
}

export default Products
