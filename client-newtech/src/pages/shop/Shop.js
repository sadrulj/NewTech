import React, { useState, useEffect } from 'react'
import Layout from '../../component/Layout/Layout'
import Products from '../Products'
import { Prices } from '../../Routes/Price'
import { Radio } from "antd";
import axios from "axios"
import toast from "react-hot-toast"
import { Pagination } from 'antd'
import Sort from '../../component/Layout/Sort';
import { BiSortDown } from "react-icons/bi"
import { useCart } from '../../component/Context/cart.js'
import { useFavorite } from '../../component/Context/favorite';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [favorite, setFavorite] = useFavorite()
    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            setCategory(data.category);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllCategories();
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
        setPage(page)
    };

    //Filter by category
    const handleFilter = (value, id) => {
        let all = [...checked]
        if (value) {
            all.push(id)
        } else {
            all = all.filter(c => c !== id)
        }
        setChecked(all)
    }

    //get filters product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/product-filter`, { checked, radio })
            setProducts(data?.products)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio])
    return (
        <Layout>
            <div className="row">
                <div className="col-md-3 mt-5 pt-5">
                    <div className="flex-row mt-5">
                        <h4 className="text-center">Filter By Category</h4>
                    </div>
                    <div className="flex-column mx-auto" style={{ display: "table" }}>

                        {category?.map((c, i) => (
                            <div className="form-check d-flex align-items-center mt-3" key={i} >
                                <input value={c} type="checkbox" onChange={(e) => handleFilter(e.target.checked, c._id)} />
                                <span className="ms-2">{c.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* price filter */}
                    <h2 className="text-center mt-5" > Filter By Price</h2>
                    <div className="flex-column mx-auto mb-2">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)} style={{ display: "grid" }}>
                            {Prices?.map((p, i) => (
                                <div className="mt-3 mx-auto" key={i}>

                                    <Radio key={p._id} value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column ms-4 mt-5 pt-4">
                        <button className="btn btn-danger" onClick={() => window.location.reload()}>Reset Filter</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="container">
                        <h2 className="pb-5 mt-5 text-secondary container">Featured Products</h2>
                        <Products products={products} loading={loading} favorite={favorite} setFavorite={setFavorite} />
                    </div>
                    <div className="d-flex justify-content-between align-items-center m-2 p-3">
                        {checked.length || radio.length ? (<>
                            <Pagination defaultCurrent={1} loading={loading} page={page} onChange={handlePage} total={10} />
                            <p style={{ display: "contents" }}>Showing {products.length} Products</p>
                        </>) : (<>
                            <Pagination defaultCurrent={1} loading={loading} page={page} onChange={handlePage} total={100} />
                            <p style={{ display: "contents" }}>Showing {page} to {totalCount} of {totalCount} Products</p>
                        </>)}
                    </div>
                </div>

            </div>

        </Layout>
    )
}

export default Shop
