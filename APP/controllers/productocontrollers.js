let mysql=require('../../BD/mysql');
module.exports={
    listar:(req,res)=>{
        mysql.query('select * from product',function(error,results,fields){
            if(error)
                res.json(error);
            else
                res.json(results);
        })
    },
    agregar:(req,res)=>{
        console.log(req.body);
        let nombre=req.body.nombre;
        let cantidad=req.body.cantidad;
        let costo=req.body.costo;
        mysql.query(`insert into product (name,quantity,cost) values('${nombre}',${cantidad},${costo})`,function(error,results,fields){
            if(error)
                res.json(error);
            else
                res.json(results);
        })
    },
    buscarid:(req,res)=>{
        let id=req.params.id;
        //console.log(`buscando id: ${id}`);
        mysql.query(`SELECT * FROM product where id=${id}`,function(error,results,fields){
            if(error)
                res.json(error);
            else
                res.json(results);
        })
    }
}