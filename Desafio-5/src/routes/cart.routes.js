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

    const carrito = await result.find(c => c.id == parseInt(cid))
    if (carrito) {
        res.json(carrito)
    }else{
        res.send({ msg: "Carrito no encontrado" })
    }

    
})

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



export default router;