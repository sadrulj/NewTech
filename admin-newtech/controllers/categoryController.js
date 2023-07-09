import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"
import fs from "fs"

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is Required and Should be Less then 1mb" })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exist"
            })
        }
        const category = new categoryModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            category.photo.data = fs.readFileSync(photo.path)
            category.photo.contentType = photo.type
        }
        await category.save()
        console.log(category);
        res.status(201).send({
            success: true,
            message: "New Category Created",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Category",
        });
    }
}

//Get All Category
export const getCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While getting All Categories",
            error,
        });
    }
}

//Get Single Category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While getting single Category",
            error,
        });
    }
}

//Get Photo
export const categoryPhotoController = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.cid).select("photo")
        if (category.photo.data) {
            res.set('Contain-type', category.photo.contentType)
            return res.status(200).send(category.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While getting photo",
            error,
        });
    }
}

//Update Category 
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.fields;
        const { photo } = req.files;
        //validation
        switch (true) {
            case name:
                return res.status(500).send({ error: "Name is Required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is Required and Should be Less then 1mb" })
        }
        const category = await categoryModel.findByIdAndUpdate(req.params.cid, { name, ...req.fields, slug: slugify(name) }, { new: true });
        if (photo) {
            category.photo.data = fs.readFileSync(photo.path)
            category.photo.contentType = photo.type
        }
        await category.save()
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While Updating Category",
            error,
        });
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While Deleting Category",
            error
        });
    }
}