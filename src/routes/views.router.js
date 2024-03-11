import { Router } from 'express';
const router = Router();

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
});

router.get('/message', (req, res)=>{
    res.render("messages");
})


export default router;