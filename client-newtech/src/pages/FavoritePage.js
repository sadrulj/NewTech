import React, { useState, useEffect } from 'react'
import Layout from '../component/Layout/Layout.js'
import toast from 'react-hot-toast'
import { useAuth } from "../component/Context/auth.js";
import { useNavigate } from "react-router-dom";
import { useFavorite } from '../component/Context/favorite.js';
import { useCart } from '../component/Context/cart.js';

const FavoritePage = () => {
    const [auth, setAuth] = useAuth();
    const [favorite, setFavorite] = useFavorite();
    const [cart, setCart] = useCart();


    //delete item
    const removeCartItem = (pid) => {
        try {
            let myFavorite = [...favorite];
            let index = myFavorite.findIndex((item) => item._id === pid);
            myFavorite.splice(index, 1);
            setFavorite(myFavorite);
            localStorage.setItem("favorite", JSON.stringify(myFavorite));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout title={"Favorite"}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {favorite?.length && auth?.token
                                ? `You Have ${favorite.length} items in your favorite ${auth?.token ? "" : "please login to view"} page`
                                : " Your Favorite Page is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row ms-2">
                    <div className="col-md-7">
                        {auth?.user && favorite?.map((p, i) => (
                            <div className="row mb-2 p-3 card flex-row" key={i}>
                                <div className="col-md-4 d-flex justify-content-center align-items-center">
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                                        className="card-img-top"
                                        style={{ width: "150px", height: "150px" }}
                                        alt={p.name}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <p>Price : {p.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeCartItem(p._id)}
                                        >
                                            Remove
                                        </button>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem("cart", JSON.stringify([...cart, p]))
                                                toast.success("Item Added to Cart");
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FavoritePage
