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
            pricePerDay: Number(pricePerDay),
            contact: Number(contact),
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
        // Debug logging
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        const { id } = req.body;
        
        // Validate ID
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required',
                receivedData: req.body
            });
        }

        // Find existing item first
        const existingItem = await itemModel.findById(id);
        if (!existingItem) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
                providedId: id
            });
        }

        // Prepare update data with type conversion
        const updatedData = {
            title: req.body.title || existingItem.title,
            description: req.body.description || existingItem.description,
            category: req.body.category || existingItem.category,
            pricePerDay: req.body.pricePerDay ? Number(req.body.pricePerDay) : existingItem.pricePerDay,
            contact: req.body.contact ? Number(req.body.contact) : existingItem.contact,
            location: req.body.location || existingItem.location,
        };

        // Handle image uploads
        let imagesUrl = [];
        
        // Handle existing images
        const existingImages = [];
        for (let i = 1; i <= 4; i++) {
            const existingImage = req.body[`existingImage${i}`];
            if (existingImage) {
                existingImages.push(existingImage);
            }
        }

        // Handle new image uploads
        if (req.files) {
            const newImageUploads = await Promise.all(
                Object.keys(req.files).map(async (key) => {
                    const file = req.files[key][0];
                    if (file && file.path) {
                        try {
                            const result = await cloudinary.uploader.upload(file.path, {
                                resource_type: 'image'
                            });
                            return result.secure_url;
                        } catch (uploadError) {
                            console.error(`Error uploading ${key}:`, uploadError);
                            return null;
                        }
                    }
                    return null;
                })
            );

            // Combine existing and new images
            imagesUrl = [...existingImages, ...newImageUploads.filter(Boolean)];
        } else {
            imagesUrl = existingImages;
        }

        // Update images array if there are any images
        if (imagesUrl.length > 0) {
            updatedData.image = imagesUrl;
        }

        // Debug log
        console.log('Updating with data:', updatedData);

        // Update the document
        const updatedItem = await itemModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Product updated successfully',
            updatedItem
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};


export { listProduct, addProduct, removeProduct, singleProduct, updateProduct };
