var router = require('express').Router();
let productocontroller=require('../controllers/productocontrollers')
router.get('/',function(req,res){
    productocontroller.listar(req,res);
});

router.get('/:id',function(req,res){
    productocontroller.buscarid(req,res);
});

router.post('/',function(req,res){
    productocontroller.agregar(req,res);
})
module.exports=router;