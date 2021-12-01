const express = require('express')
var cors=require('cors')
const app = express()
var port = process.env.PORT || 1341;
var router=require('./routes');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use('/api',router)
app.listen(port)

  