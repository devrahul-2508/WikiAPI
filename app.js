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

app.route("/articles")
.get((req,res)=>{
        article.find(function(err,result){
         if(err){
             console.log(err);
         }
         else{
             res.send(result);
         }
        }) 
     }


).post((req,res)=>{
        console.log(req.body.title);
         console.log(req.body.content);
     
         const newArticle = new article({
             title: req.body.title,
             content: req.body.content
         }
            
         )
         newArticle.save(function(err){
             if(!err){
                 res.send("Succesfully added a new article");
             }
             else{
                 res.send(err);
             }
         });
     }
).delete(function(req,res){
        article.deleteMany(function(err){
            if(!err){
                res.send("Successfully deleted all articles");
            }
            else{
                res.send(err);
    
            }
        })
    }

);

app.route("/articles/:articleTitle")
.get((req,res)=>{
    article.findOne({title: req.params.articleTitle},function(err,results){
        if(err){
            res.send("No article found")
        }
        else{
            res.send(results);
        }
    });
})
.put((req,res)=>{
    article.findOneAndUpdate(
        {title: req.params.articleTitle},
        {title: req.body.title,content: req.body.content},
        {overwrite: true},
        function(err){
            if(!err){
                res.send("Succssfully updated article");
            }
            else{
                res.send(err);
            }
        }
        
        
        
        
        )
}).patch((req,res)=>{



    article.findOneAndUpdate(
        {title: req.params.articleTitle},
        {$set: req.body},
        function(err){
            if(!err){
                res.send("Successfully updated articles");
            }
            else{
                res.send(err);
            }
        }
    )
})
.delete((req,res)=>{
    article.findOneAndDelete(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Succesfully deleted")
            }
            else{
                res.send(err);
            }
        }
    )
});





app.listen(3000,()=> {
    console.log("Server started at port 3000");
})