import mongoose from "mongoose";

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnails: String,
    code: {
        type: String,
        unique: true
    },
    stock:Number
});

export const productModel = mongoose.model(productsCollection, productsSchema);