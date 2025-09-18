<<<<<<< HEAD

import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// API for add product ----------------------------------------------------------

const addProduct = async (req, res) => {
    try {
        const { productName, description, category, website, features, isActive} = req.body;
=======
import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// API for add product --------------------------------

const addProduct = async (req, res) => {
    try {
        const { productName, description } = req.body;
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )
        const productData = {
            productName,
            description,
            images: imagesUrl,
<<<<<<< HEAD
            date: Date.now(),
            category,
            website,
            features,
            isActive
        }
=======
            date: Date.now()
        }
        // console.log(productData);
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
        const product = new productModel(productData)
        await product.save()
        res.json({ success: true, message: "Product Added" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

<<<<<<< HEAD
// API fro list product----------------------------------------------------------
=======
// API fro list product-----------------------------
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7

const listProduct = async (req, res) => {
    try {
        const product = await productModel.find({}).sort({ date: -1 }).exec();
        if (product.length === 0) {
            return res.json({ success: false, message: "No products found" });
        }
<<<<<<< HEAD
        const stats ={
            totalProduct : product.length
        }
        res.json({ success: true, product, stats });
=======
        res.json({ success: true, product });
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

<<<<<<< HEAD
//API fro delete product---------------------------------------------------------
=======


//API fro remove product--------------------------
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })
<<<<<<< HEAD
=======

>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

<<<<<<< HEAD
//API fro update product---------------------------------------------------------
=======
//API fro update product--------------------------
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
const updateProduct = async (req, res) => {
    try {

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

<<<<<<< HEAD
//API for single product info----------------------------------------------------
=======
//API fro single product info--------------------------
>>>>>>> 58c974431221237f4f3a368e3cbb39986aac85b7
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addProduct, listProduct, removeProduct, updateProduct, singleProduct };