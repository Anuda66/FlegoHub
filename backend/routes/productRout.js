import express from 'express';
import { addProduct, listProduct, removeProduct, updateProduct, singleProduct, getProductById } from '../controllers/productController.js';
import uploade from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';

const productRouter = express.Router();

productRouter.post('/add', authAdmin, uploade.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.get('/list', listProduct); // get all product
productRouter.post('/remove', authAdmin, removeProduct); // delete product
productRouter.post('/update/:productId', authAdmin, uploade.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]) ,updateProduct); // update product
productRouter.post('/single', singleProduct); // get single product details
productRouter.get('/sigleProduct/:id', getProductById); // get single product by id

export default productRouter;