import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import toast from 'react-hot-toast'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useCart } from '../component/Context/cart';
import { useAuth } from '../component/Context/auth';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const LatestProducts = () => {
    const [features, setFeatures] = useState([])
    const [cart, setCart] = useCart()
    const [auth] = useAuth()

    const addToCart = (f) => {
        if (!auth?.user === true) {
            toast.error("Please Login to add items to Cart");
        } else {
            setCart([...cart, f]);
            localStorage.setItem("cart", JSON.stringify([...cart, f]))
            toast.success("Item Added to Cart");
        }
    }

    //get all products
    const getFeaturedProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-featured`);
            setFeatures(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };
    //lifecycle method
    useEffect(() => {
        getFeaturedProducts();
    }, []);

    return (
        <>
            <div><h2 className="text-center">Hot Deals</h2></div>

            <div className="row">
                <Carousel responsive={responsive}>
                    {features?.map((f, i) => (
                        <div className="col d-flex rounded m-3" key={i}>
                            <div className="card h-100 border border-2 shadow-sm">
                                <Link to={`/product/${f.slug}`} className="nav-link">
                                    {
                                        f.discount ?
                                            (<div className="d-flex justify-content-end">
                                                <span className="badge text-bg-warning z-1 position-absolute p-1 rounded-0 p-2 text-white rounded-end">Sale!</span>
                                            </div>) : (
                                                <div className="d-flex justify-content-end">
                                                    <span className=""></span>
                                                </div>
                                            )
                                    }
                                    <img src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${f._id}`} className="card-img-top mx-auto" style={{ width: "18rem", height: "16rem" }} alt={f.name} />
                                </Link>
                                <div className="card-body">
                                    <h6 className="card-title text-center h-50 overflow-auto text-nowrap">{f.name}</h6>
                                    <div className="d-flex justify-content-between align-items-center py-3">
                                        <div className="d-flex align-items-end">
                                            {f.discount ? (<>
                                                <p className="
                                    card-text 
                                    text-danger 
                                    text-center 
                                    text-decoration-line-through
                                    "
                                                >$ {f.price}</p>
                                                <p className="card-text text-success text-center ms-2">$ {(f.price - f.price * f.discount).toFixed(2)}</p>
                                            </>) : (<>
                                                <p className="card-text text-success text-center ms-2">$ {f.price}</p>
                                            </>)}
                                        </div>
                                        <div>
                                            <button className="btn btn-success"
                                                onClick={() => {
                                                    addToCart(f)
                                                }}
                                            >Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>;
            </div>


        </>
    )
}

export default LatestProducts
