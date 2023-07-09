import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast"

export default function useProducts() {
    const [products, setProducts] = useState([]);

    //get all categories
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product`);
            setProducts(data.Products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };
    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);

    return products;
}