import { cartsModel } from "../models/carts.models.js";

export default class CartService {
    getAll = async () => {
        try {
            let cart = await cartsModel.find();
            return cart;
        } catch (error) {
            console.error("Error al obtener carrito:", error);
            throw error;
        }
    }
    save = async (cart) => {
        let newCart = await cartsModel.create(cart);
        return newCart
    }
    addProductToCart = async (cartId, productId) => {
        try {
           
            let cart = await cartsModel.findById(cartId);
    
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
    

            const existingProduct = cart.products.find(product => product._id.toString() === productId.toString());
    
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.products.push({
                    _id: productId,
                    quantity: 1,
                });
            }
            await cart.save();
    
            return { success: true, cart };
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            return { success: false, error: error.message };
        }
    }
    
    
    

}