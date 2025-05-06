const express = require("express");
const app  = express();
const dotenv =  require('dotenv').config();
const port = dotenv.parsed.POR || 5000;

app.get('/',(req,res) =>{
    res.send("OK");
})
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})