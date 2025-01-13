import { v2 as cloudinary } from 'cloudinary';
import itemModel from '../models/items.js';

// Add Product
const addProduct = async (req, res) => {



    try {
        const { title, description, category, owner, pricePerDay, contact, location } = req.body;
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            title,
            description,
            category,
            owner,
            pricePerDay:Number(pricePerDay),
            contact:Number(contact),
            location,
            image: imagesUrl,
            date: Date.now(),
        };

        const item = new itemModel(productData);
        await item.save();

        res.json({ success: true, message: 'Item added', item });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// List Products
const listProduct = async (req, res) => {
    try {
        const items = await itemModel.find({}).populate('owner', 'name email');
        res.json({ success: true, items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove Product
const removeProduct = async (req, res) => {
    try {
        await itemModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Single Product Info
const singleProduct = async (req, res) => {
    try {
        const { itemId } = req.body;
        const item = await itemModel.findById(itemId).populate('owner', 'name email');
        if (!item) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const { id, title, description, category, owner, pricePerDay, location, contact } = req.body;
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const existingItem = await itemModel.findById(id);
        if (!existingItem) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const updatedData = {
            title: title || existingItem.title,
            description: description || existingItem.description,
            category: category || existingItem.category,
            owner: owner || existingItem.owner,
            pricePerDay: pricePerDay ? Number(pricePerDay) : existingItem.pricePerDay,
            contact: contact ? Number(contact) : existingItem.contact,
            location: location || existingItem.location,
            image: imagesUrl.length > 0 ? imagesUrl : existingItem.image,
        };

        const updatedItem = await itemModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.json({ success: true, message: 'Product updated', updatedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { listProduct, addProduct, removeProduct, singleProduct, updateProduct };
