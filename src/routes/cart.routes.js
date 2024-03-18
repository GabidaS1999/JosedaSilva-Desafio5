import { Router } from "express";
import CartManager from "../dao/ManagerFS/Cart-Manager.js";
import ProductManager from "../dao/ManagerFS/Product-Manager.js";
import CartService from "../dao/Db/cart.service.js";
import ProductsService from "../dao/Db/products.service.js";

let cartService = new CartService();



let cartManager = new CartManager();
let productManager = new ProductManager();


const router = Router();

let carts = [];

router.get('/', async (req, res) => {
    let todosLosCarritos = await cartService.getAll()

    res.send(todosLosCarritos)
})



router.get('/:cid', async (req, res) => {
    const result = await cartService.getAll()
    let cid = req.params.cid;

    const carrito = result.find(c => c.id == cid)
    if (carrito) {
        res.json(carrito)
    }else{
        res.send({ msg: "Carrito no encontrado" })
    }

})

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const result = await cartService.getAll();
        
        const carrito = result.find(c => c.id == cartId); 

        if (carrito) {
            await cartService.deleteAllProductsFromCart(carrito.id);
            res.send("Carrito vaciado");
        } else {
            res.status(404).send({ msg: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al intentar vaciar el carrito:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});


router.post('/', async (req, res) => {
    let cart = await cartService.save()
    carts.push(cart)
    res.send({ status: "success", msg: "Carrito creado" })
})

router.post('/:cid/products/:pid', async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid
    const result = await cartService.addProductToCart(cid, pid);
    result.success ? res.status(200).json(result.cart) : res.status(400).json(result) 
})
router.delete('/:cid/products/:pid', async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid
    const result = await cartService.deleteProductFromCart(cid, pid);
    result.success ? res.status(200).json(result.cart) : res.status(400).json(result) 
})
router.put('/:cid/products/:pid', async (req, res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    let newQuantity = parseInt(req.body.quantity);
    const result = await cartService.updateProductQuantityInCart(cid, pid, newQuantity);
    result.success ? res.status(200).json(result.cart) : res.status(400).json(result) 
})


export default router;