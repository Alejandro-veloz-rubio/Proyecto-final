var router= require('express').Router();
var productos=require('./productos');
var factura=require('./factura');
router.use('/productos',productos);
router.use('/factura',factura);
router.get('/',function(req,res){
    res.json({mensaje:'bienvenido a mi API'})
});

module.exports=router;