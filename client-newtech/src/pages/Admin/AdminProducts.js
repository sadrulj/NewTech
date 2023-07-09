import React, { useState, useEffect } from "react";
import AdminMenu from "../../component/Layout/AdminMenu";
import Layout from "./../../component/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Pagination } from 'antd'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);

    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product`);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    //load more
    const loadMore = async (req, res) => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-list?page=${page}&limit=${totalCount}`);
            setLoading(false)
            setProducts(data?.products)
            setTotalCount(data?.totalCount)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    useEffect(() => {
        loadMore()
    }, [page])

    const handlePage = (page) => {
        console.log(page);
        setPage(page)
    };
    return (
        <Layout>
            <div className="row">
                <div className="col-md-3 mt-5">
                    <AdminMenu />
                </div>
                <div className="col-md-9 mb-5">
                    <h1 className="text-center">All Products List</h1>
                    <div className="row row-cols-1 row-cols-md-3 g-3">
                        {products?.map((p) => (
                            <Link
                                key={p._id}
                                to={`/dashboard/admin/products/${p.slug}`}
                                className="nav-link"
                            >
                                {!loading ? (<>
                                    <div className="col">
                                        <div className="card">
                                            <img
                                                src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                                                className="card-img-top mx-auto"
                                                style={{ width: "18rem", height: "18rem" }}
                                                alt={p.name}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title text-center" style={{ lineHeight: "1.5em", height: "3em", overflow: "hidden" }}>{p.name}</h5>
                                                <p className="card-text overflow-auto pt-2 text-center mx-auto" style={{ width: "16rem", height: "8rem" }}>{p.description}</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <span className="text-white shadow-sm rounded fw-bold bg-primary p-2">Price:$ {p.price}</span>
                                                <span className="text-white shadow-sm rounded fw-bold bg-primary p-2">Quantity: {p.quantity}</span>
                                            </div>

                                        </div>
                                    </div>
                                </>) : (<>
                                    <div className="col">
                                        <div className="card">
                                            <img
                                                src="..."
                                                className="card-img-top mx-auto placeholder"
                                                style={{ height: "18rem" }}
                                                alt="..."
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title placeholder-glow"><span className="placeholder col-8" /></h5>
                                                <h5 className="card-title placeholder-glow"><span className="placeholder col-5" /></h5>
                                                <p className="card-text overflow-auto placeholder-glow" ><span className="placeholder col-7"></span></p>
                                                <p className="card-text overflow-auto placeholder-glow" ><span className="placeholder col-5"></span></p>
                                                <p className="card-text overflow-auto placeholder-glow" ><span className="placeholder col-6"></span></p>
                                                <p className="card-text overflow-auto placeholder-glow" ><span className="placeholder col-4"></span></p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <span className="btn btn-primary disabled placeholder col-4" />
                                                <span className="btn btn-primary disabled placeholder col-4" />
                                            </div>

                                        </div>
                                    </div>
                                </>)}

                            </Link>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center m-2 p-3">
                        <Pagination defaultCurrent={1} loading={loading} page={page} onChange={handlePage} total={30} />
                        <p style={{ display: "contents" }}>Showing {page} to {totalCount} of {totalCount} Products</p>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default Products;