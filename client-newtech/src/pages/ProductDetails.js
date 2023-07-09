import React, { useState, useEffect } from 'react'
import Layout from '../component/Layout/Layout.js'
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../component/Context/cart.js';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const params = useParams()
    const navigate = useNavigate();
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart([]);

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/products/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    //get Product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug]);
    return (
        <Layout >
            <div className="row p-5 mt-2">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img
                        src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{ width: "350px", height: "300px" }}
                    />
                </div>
                <div className="col-md-6 ">
                    <h1 className="text-Start text-secondary">Product Details</h1>
                    <h4 className="mt-4 fw-bold"> {product.name}</h4>
                    <div className="d-block justify-content-between align-items-center">
                        {product.discount ? (<>
                            <h5 className="mt-3 text-danger text-decoration-line-through text-secondary fw-bold">Price : ${product.price}</h5>
                            <h5 className="mt-1 fw-bold text-success">Discount: ${(product.price - product.price * product.discount).toFixed(2)}</h5>
                        </>) : (<>
                            <h5 className="mt-3">Price : ${product.price}</h5>
                        </>)}
                    </div>

                    <p className="mt-3 h-50 overflow-auto">Description : <br />{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="my-3 text-primary fw-bold">Category : {product?.category?.name}</h5>
                        <button className="btn btn-success my-3"
                            onClick={() => {
                                setCart([...cart, product]);
                                localStorage.setItem("cart", JSON.stringify([...cart, product]))
                                toast.success("Item Added to Cart");
                            }}
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row container">
                <h5 className="text-secondary ms-2">Similar Products</h5>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Products found</p>
                )}
                <div className="d-flex">
                    {relatedProducts?.map((p) => (
                        <div className="card m-2" key={p._id} style={{ width: "22rem" }}>
                            <img
                                src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                                className="card-img-top mx-auto pt-1"
                                style={{ width: "21rem", height: "18rem" }}
                                alt={p.name}
                            />

                            <div className="card-body">
                                <h5 className="card-title text-center" style={{ lineHeight: "1.5em", height: "3em", overflow: "hidden" }}>{p.name}</h5>

                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                <button className="btn btn-success ms-1"
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
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
