import express from 'express'
import {
    braintreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getAllProductController,
    getFeaturedProductController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFilterController,
    productListController,
    productPhotoController,
    productWishlistController,
    relatedProductController,
    // searchProductController,
    updateProductController
} from '../controllers/productController.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js'
import formidable from 'express-formidable'

const router = express.Router()

//Routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//Update Routes
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//get products
router.get("/get-product", getProductController);

//get products
router.get("/get-product-all", getAllProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//Filter router
router.post("/product-filter", productFilterController);

//Product Count
router.get("/product-count", productCountController);

//Product Count
router.get("/product-featured", getFeaturedProductController);

// Product per page-- pagination
router.get("/product-list", productListController);

//search product
// router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController)

//category product
router.get("/product-category/:slug", productCategoryController);

//Product WishList
router.post("/product-wishlist", requireSignIn, productWishlistController);
// Payments
router.get("/braintree/token", braintreeTokenController)

//Payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController)

export default router