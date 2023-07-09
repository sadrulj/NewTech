import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import 'react-multi-carousel/lib/styles.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

const Categories = () => {
    const [category, setCategory] = useState([])

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

    return (
        <>
            <h2 className="pb-5 text-center">Shop by Categories</h2>
            <div className="container card shadow py-3 mb-5">
                <div className="d-flex justify-content-center overflow-x-auto" >
                    {/* <Carousel responsive={responsive}> */}
                    {category.map((c, i) => (
                        <Link key={i} className="nav-link" to={`/category/${c.slug}`}>
                            <div className="card d-flex justify-content-center g-4 p-3" style={{ width: "200px", height: "200px" }}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/category/category-photo/${c._id}`} className="card-img-top p-2 d-flex justify-content-center px-4 pt-5" alt={c.name} />
                                <h5 className="text-center pb-2">{c.name}</h5>
                            </div>
                        </Link>
                    ))}
                    {/* </Carousel> */}
                </div>
            </div>
        </>
    )
}

export default Categories


