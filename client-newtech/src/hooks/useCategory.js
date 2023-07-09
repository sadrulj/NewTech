import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast"

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    //get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };
    //lifecycle method
    useEffect(() => {
        getAllCategories();
    }, []);
    return categories;
}