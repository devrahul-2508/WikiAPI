const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articlesSchema = {
    title: String,
    content: String
};

const article = mongoose.model("articles",articlesSchema);

app.get("/",(req,res)=>{
   article.find(function(err,result){
    if(err){
        console.log(err);
    }
    else{
        console.log(result);
    }
   }) 
})

app.listen(3000,()=> {
    console.log("Server started at port 3000");
})