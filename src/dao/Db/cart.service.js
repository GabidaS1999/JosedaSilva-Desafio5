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
            // Buscar el carrito por su ID
            let cart = await cartsModel.findById(cartId);
    
            // Verificar si el carrito existe
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
    
            // Verificar si el producto ya está en el carrito
            const existingProduct = cart.products.find(product => product._id.toString() === productId.toString());
    
            if (existingProduct) {
                // Si el producto ya existe, incrementar la cantidad
                existingProduct.quantity += 1;
            } else {
                cart.products.push({
                    _id: productId,
                    quantity: 1,
                });
            }
    
            // Guardar el carrito actualizado en la base de datos
            await cart.save();
    
            return { success: true, cart };
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            return { success: false, error: error.message };
        }
    }
    
    
    

}