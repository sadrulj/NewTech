import productsModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js"
import orderModel from "../models/orderModel.js";

import fs from 'fs'
import slugify from 'slugify';
import userModel from "../models/userModel.js";
import braintree from 'braintree'
import dotenv from "dotenv";

// configure env
dotenv.config();

// //payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, discount, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" })
            case !description:
                return res.status(500).send({ error: "Description is Required" })
            case !price:
                return res.status(500).send({ error: "Price is Required" })
            case !discount:
                return res.status(500).send({ error: "Discount Price is Required" })
            case !category:
                return res.status(500).send({ error: "Category is Required" })
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is Required and Should be Less then 1mb" })
        }
        const products = new productsModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).send({
            success: true,
            message: "Product Created Successfully",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Creating Product",
            error,
        });
    }
}

// Get all Product 
export const getAllProductController = async (req, res) => {
    try {
        const products = await productsModel.find({}).populate("category").select('-photo').sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All Products",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error,
        });
    }
}

// Get Product limit 6
export const getProductController = async (req, res) => {
    try {
        const products = await productsModel.find({}).populate("category").select('-photo').limit(6).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All Products",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error,
        });
    }
}

//Get Single Product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productsModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
            error,
        });
    }
}

//Get Photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productsModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Contain-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
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

//Delete Products
export const deleteProductController = async (req, res) => {
    try {
        await productsModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Deleting Product",
            error,
        });
    }
}

//Update Products
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, discount, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" })
            case !description:
                return res.status(500).send({ error: "Description is Required" })
            case !price:
                return res.status(500).send({ error: "Price is Required" })
            case !discount:
                return res.status(500).send({ error: "Discount price is Required" })
            case !category:
                return res.status(500).send({ error: "Category is Required" })
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is Required and Should be Less then 1mb" })
        }
        const products = await productsModel.findByIdAndUpdate(req.params.pid,
            {
                ...req.fields, slug: slugify(name)
            }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(200).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Updating Product",
            error,
        });
    }
}

// Filter
export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productsModel.find(args)
        console.log(products);
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while filtering products",
            error,
        });
    }
}

//Product count
export const productCountController = async (req, res) => {
    try {
        const total = await productsModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in product count",
            error
        });
    }
}

// Get Featured Product 
export const getFeaturedProductController = async (req, res) => {
    try {
        const products = await productsModel.find({}).populate("category").select('-photo').limit(6).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All Products",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error,
        });
    }
}

//Product per Page -- Pagination
export const productListController = async (req, res) => {
    try {
        let queryResult = productsModel.find({})
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 6

        const skip = (page - 1) * limit

        queryResult = queryResult.skip(skip).limit(limit).sort({ createdAt: -1 })

        const totalCount = await productsModel.countDocuments(queryResult)
        const numOfPage = Math.ceil(totalCount / limit)
        const products = await queryResult;
        res.status(200).send({
            success: true,
            totalCount,
            numOfPage,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in per page control",
            error,
        });
    }
}

// search product
// export const searchProductController = async (req, res) => {
//     try {
//         const { keyword } = req.params;
//         const results = await productsModel.find({
//             $or: [
//                 { name: { $regex: keyword, $options: "i" } },
//                 { description: { $regex: keyword, $options: "i" } }
//             ]
//         }).select("-photo")
//         res.json(results)
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//             success: false,
//             message: "Error In Search Product API",
//             error,
//         });
//     }
// };

//similar product
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productsModel.find({
            category: cid,
            _id: { $ne: pid },
        }).select("-photo").limit(3).populate('category')
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while getting related product",
            error,
        });
    }
}

// get product by category
export const productCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryModel.findOne({ slug: slug });
        const products = await productsModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While Getting products category",
            error,
        });
    }
};

// Product Wishlist
export const productWishlistController = async (req, res) => {
    const { _id } = req.user;
    const { pid } = req.body;
    try {
        const user = await userModel.findById(_id);
        console.log(_id, pid);
        const alreadyAdded = user.wishlist.find((_id) => _id === pid);
        if (alreadyAdded) {
            let pid = await productsModel.findById(_id)
            let user = await userModel.findByIdAndUpdate(
                _id,
                {
                    $pull: { wishlist: pid },
                },
                {
                    new: true,
                }
            );
            res.json(user);
        } else {
            let pid = await productsModel.findById(_id)
            let user = await userModel.findByIdAndUpdate(
                _id,
                {
                    $push: { wishlist: pid },
                },
                {
                    new: true,
                }
            );
            res.json(user);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error,
        });
    }
}
//payment gateway api
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(response)
            }
        })
    } catch (error) {
        console.log(error);
    }
}

//Payment
export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0
        cart.map((i) => {
            total += i.price
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true,
            }
        },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,

                    }).save()
                    console.log(req.user._id);
                    res.json({ ok: true })
                } else {
                    res.status(500).send(error)
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}