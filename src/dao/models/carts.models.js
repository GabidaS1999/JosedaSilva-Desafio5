import mongoose from "mongoose";

const cartsCollection = 'carts';

const productInCartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    title: String,
    description: String,
    price: Number,
    quantity: {
        type: Number,
        default: 0
    }
});

const cartsSchema = new mongoose.Schema({
    products: [productInCartSchema] // Utiliza el esquema definido para los productos en el carrito
});



export const cartsModel = mongoose.model(cartsCollection, cartsSchema);



