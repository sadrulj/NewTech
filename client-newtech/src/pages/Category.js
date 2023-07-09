import React, { useState, useEffect } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
import Products from './Products'
import Layout from '../component/Layout/Layout';
import { useParams } from 'react-router-dom';

const Category = () => {
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([])
    const params = useParams();

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            setCategory(data.category);
            console.log(category);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //get all Product categories
    const getAllProductsCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-category/${params.id}`);
            setProducts(data.products, data.category);

        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllCategories();
        getAllProductsCategories();
    }, []);
    return (
        <Layout>
            <h2 className="pb-5 mt-5 text-secondary container">Featured Categories</h2>
            <Products products={products} />
        </Layout>
    )
}

export default Category
