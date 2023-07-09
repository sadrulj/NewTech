import React, { useState, useEffect } from 'react'
import Products from './Products'
import axios from 'axios';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [success, setSuccess] = useState();
    const [loading, setLoading] = useState(success);
    //Get All Products
    const getAllProducts = async () => {
        try {
            setLoading(success)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product`)
            setLoading(success)
            setProducts(data.products)
            setSuccess(data.success)
        } catch (error) {
            console.log(error);
            setLoading(success)
        }
    }
    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div>
            <h2 className="pb-5 mt-5 text-center container">Featured Products</h2>
            <Products products={products} loading={loading} />
        </div>
    )
}

export default FeaturedProducts
