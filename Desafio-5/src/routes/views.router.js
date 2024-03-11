import ProductManager from '../dao/ManagerFS/Product-Manager.js';
import { Router } from 'express';
import ProductsService from '../dao/Db/products.service.js';

const productsService = new ProductsService()
let productManager = new ProductManager();
const router = Router();

// router.get('/home', async (req, res) => {
//     try {
//         const products = await productsService.getAll();
//         res.render('home', {
//             products
//         });
//     } catch (error) {
//         console.error('Error al obtener productos:', error);
//         res.status(500).send('Error al obtener productos');
//     }
// });

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
});

router.get('/message', (req, res)=>{
    res.render("messages");
})


export default router;