import { Router } from 'express';
import  {productModel}  from '../dao/models/products.models.js';
import { cartsModel } from '../dao/models/carts.models.js';
const router = Router();

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
});

router.get('/message', (req, res)=>{
    res.render("messages");
});

router.get('/products', async (req, res) => {
    let sortPrice = req.query.sortPrice || 'asc';
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let match = req.query.match

    if (sortPrice !== 'asc' && sortPrice !== 'desc') {
        return res.status(400).send('El parámetro "sortPrice" debe ser "asc" o "desc".');
    }

    let sortOptions = {};
    sortOptions['price'] = sortPrice === 'asc' ? 1 : -1;

    if(!page) page = 1;
    if(!limit) limit = 10;

    let query = {};
    if (match) {
        query = { $text: { $search: match } };
    }else{
        match = ''
    }

    let result = await productModel.paginate(query, {page, limit, sort: sortOptions, lean: true})
    result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}&limit=${result.limit}&match=${match}&sortPrice=${sortPrice}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}&limit=${result.limit}&match=${match}&sortPrice=${sortPrice}` : '';

    result.isValid = !(page < 1 || page > result.totalPages)
    console.log(result);
    res.render("products", result)
});
router.get('/carts/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const carrito = await cartsModel.findById(cid).populate('products.product').lean();
        
        if (carrito) {
            res.render("carts", { carrito });
        } else {
            res.send({ msg: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});




export default router;