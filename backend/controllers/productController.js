
import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// API for add product ----------------------------------------------------------

const addProduct = async (req, res) => {
    try {
        const { productName, description, category, website, features, isActive } = req.body;

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
            date: Date.now(),
            category,
            website,
            features,
            isActive
        }
        const product = new productModel(productData)
        await product.save()
        res.json({ success: true, message: "Product Added" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API fro list product----------------------------------------------------------

const listProduct = async (req, res) => {
    try {
        const product = await productModel.find({}).sort({ date: -1 }).exec();
        if (product.length === 0) {
            return res.json({ success: false, message: "No products found" });
        }
        const stats = {
            totalProduct: product.length
        }
        res.json({ success: true, product, stats });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API fro delete product---------------------------------------------------------
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

//API fro update product---------------------------------------------------------
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { productName, description, category, website, features, isActive } = req.body;

        // Find existing product
        const existingProduct = await productModel.findById(productId);
        if (!existingProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        // Handle image uploads if provided
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = existingProduct.images; // Keep existing images by default

        if (images.length > 0) {
            // Upload new images to Cloudinary if any are provided
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        }

        // Prepare update data with only provided fields
        const updateData = {
            ...(productName && { productName }),
            ...(description && { description }),
            ...(images.length > 0 && { images: imagesUrl }),
            ...(category && { category }),
            ...(website && { website }),
            ...(features && { features }),
            ...(typeof isActive !== 'undefined' && { isActive }),
            date: Date.now()
        };

        // Update product
        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            { $set: updateData },
            { new: true }
        );

        res.json({ success: true, message: "Product Updated", data: updatedProduct });

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API fro gel single product details-------------------------------------------------
const getProductById = async (req, res) => {
    try{
        const product = await productModel.findById(req.params.id);
        if(!product){
            return res.json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, data: product });
    }
    catch(error){
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API for single product info----------------------------------------------------
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

export { addProduct, listProduct, removeProduct, updateProduct, singleProduct, getProductById };