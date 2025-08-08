import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// API for add product --------------------------------

const addProduct = async (req, res) => {
    try {
        const { productName, description } = req.body;

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
            date: Date.now()
        }
        // console.log(productData);
        const product = new productModel(productData)
        await product.save()
        res.json({ success: true, message: "Product Added" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API fro list product-----------------------------

const listProduct = async (req, res) => {
    try {
        const product = await productModel.find({}).sort({ date: -1 }).exec();
        if (product.length === 0) {
            return res.json({ success: false, message: "No products found" });
        }
        res.json({ success: true, product });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}



//API fro remove product--------------------------
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Removed" })

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API fro update product--------------------------
const updateProduct = async (req, res) => {
    try {

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API fro single product info--------------------------
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