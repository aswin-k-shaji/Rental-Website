import express from 'express';
import {
    listProduct,
    addProduct,
    removeProduct,
    singleProduct,
    updateProduct
} from '../controllers/productController.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();
productRouter.post(
    '/add',
    adminAuth,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
    ]),
    addProduct
);
productRouter.post('/remove', removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProduct);
productRouter.put(
    '/update',
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
    ]),
    updateProduct
);
export default productRouter;
