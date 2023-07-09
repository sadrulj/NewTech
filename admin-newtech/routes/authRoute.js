import express from "express";
import {
    registerController,
    loginController,
    // testController,
    // forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
    getFavoriteController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const router = express.Router()

//routing

//Register || METHOD POST
router.post('/register', registerController)

//Login || POST
router.post('/login', loginController);

// //Forgot Password || POST
// router.post('/forgot-password', forgotPasswordController)

// //Test routes
// router.get('/test', requireSignIn, isAdmin, testController);

//Protected User routes
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

//Protected Admin routes
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

//Protected Admin routes
router.get('/loading', (req, res) => {
    res.status(200).send({ ok: true });
})

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//favorite
router.get('/favorite', requireSignIn, getFavoriteController)

//Orders
router.get('/orders', requireSignIn, getOrdersController)

//All Orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

// order status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

export default router;