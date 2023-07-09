import express from 'express'
import {
    getCategoryController,
    categoryPhotoController,
    createCategoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController
} from '../controllers/categoryController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import formidable from "express-formidable"

const router = express.Router()

// Routes

//Create Category
router.post('/create-category', requireSignIn, isAdmin, formidable(), createCategoryController)

// Update Category
router.put('/update-category/:id', requireSignIn, isAdmin, formidable(), updateCategoryController)

//Get Category
router.get('/get-category', getCategoryController)

//get photo
router.get("/category-photo/:cid", categoryPhotoController);

//Get Single Category
router.get('/single-category/:slug', singleCategoryController)

//Delete Single Category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router