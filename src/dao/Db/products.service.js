
import { productModel } from "../models/products.models.js";

export default class ProductsService {
 
    getAll = async () => {
        try {
            console.log("Intentando obtener todos los productos...");
    
            let products = await productModel.find();
    
            console.log("Productos obtenidos con éxito:", products);
    
            return products;
        } catch (error) {
            console.error("Error al obtener productos:", error);
            throw error;
        }
    };
    
    save = async (product) => {
        let newProduct = await productModel.create(product);
        return newProduct
    }

    getPorductById = async (id) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('El ID del producto no es válido.');
            }
    
            let product = await productModel.findOne({ _id: id });
            return product ? product.toObject() : null;
        } catch (error) {
            console.error("Error al obtener producto por id:", error);
            throw error;
        }
    }
    tProductByCode = async ()=>{
        try {
            let product = await productModel.findOne({ code: code });
            return product ? product.toObject() : null;
        } catch (error) {
            console.error("Error al obtener producto por código:", error);
            throw error;
        }
    }
    updateProduct = async (id, update) => {
        try {
            // Buscar el producto por su identificador (_id)
            let productToUpdate = await productModel.findById(id);
    
            // Verificar si el producto existe
            if (!productToUpdate) {
                return { status: 'error', msg: 'Producto no encontrado' };
            }
    
            // Aplicar las actualizaciones al producto
            let updatedProduct = await productModel.updateOne({ _id: id }, update);
            return updatedProduct;
        } catch (error) {
            console.error(`Error al actualizar producto: ${error}`);
            throw error;
        }
    };
    deleteProduct = async (id) => {
        console.log("Eliminando producto con ID:", id);
        try {
            let productDelete = await productModel.deleteOne({ _id: id });
            return productDelete;
        } catch (error) {
            console.error(`Error al eliminar producto en la base de datos: ${error}`);
            throw error;
        }
    };
    
}