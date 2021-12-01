var router = require('express').Router();
router.post('/',function(req,res){
    res.json('factura generada correctamente');
    console.log(req.body);
});
module.exports=router;
