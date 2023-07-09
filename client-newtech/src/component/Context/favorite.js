import { useState, useContext, createContext, useEffect } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
    const [favorite, setFavorite] = useState([])

    // //get all Product categories
    // const getAllProductsWishlist = async () => {
    //     try {
    //         const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/product-wishlist`);
    //         console.log(data);
    //         setFavorite(data.products);
    //         toast.success("Item Added to Favorite")
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Something Went Wrong");
    //     }
    // };
    // useEffect(() => {

    // }, [])
    useEffect(() => {
        // getAllProductsWishlist()
        let existingFavoriteItem = localStorage.getItem("favorite");
        if (existingFavoriteItem) setFavorite(JSON.parse(existingFavoriteItem))
    }, [])

    return (
        <FavoriteContext.Provider value={[favorite, setFavorite]}>
            {children}
        </FavoriteContext.Provider>
    )
}

// custom hooks
const useFavorite = () => useContext(FavoriteContext)

export { useFavorite, FavoriteProvider };