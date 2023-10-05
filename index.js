const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"Products.json"));
})

app.get("/category/:category", (req, res) => {
     fs.readFile("Products.json", "utf-8", (err, data) => {
       const products = JSON.parse(data);
       const newdata=req.params.category;
       console.log(newdata)
       let result=products.filter((item)=>{
        if(item.Category==newdata){
            return true;
        }
       })
       res.send(result);
    })
})

app.get("/filterproducts/:category/:price", (req, res) => {
    fs.readFile("Products.json", "utf-8", (err, data) => {
      const products = JSON.parse(data);
      const categoryData=req.params.category;
      const priceData=req.params.price;
      console.log(categoryData)
      let result=products.filter((item)=>{
       if(item.Category==categoryData || item.price>=priceData){
           return true;
       }
      })
      res.send(result);
   })
})

app.listen(3001, (err) => {
    if (err) {
        console.log("unable to start!!");
    }
    else {
        console.log("server started..");
    }
})