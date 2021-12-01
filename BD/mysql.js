var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345678',
  database : 'company'
});
 
connection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB is connected')
    }
});

module.exports=connection;