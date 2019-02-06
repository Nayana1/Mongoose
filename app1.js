var express=require('express');
var bodyparser=require('body-parser')
var mongoose=require('mongoose');// required mongo module
const app=express();
const fileupload=require('express-fileupload');

app.use(fileupload());

app.use(bodyparser.urlencoded({extended:true}))



var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;
var url="mongodb://127.0.0.1:27017";//should copy this url else error
app.set("view engine","ejs");
var db="mongodb://localhost/example";//specifying the db used in this project
mongoose.connect(db,function(err){
    if(err){console.log(err)}
}) //connect with our server mentioned in db
var book=require("./model/Book.js");//requiring mongodb
app.get('/',function(req,res){
    res.render("home2")
})
app.get("/details",function(req,res){
    let samfile=req.files.sampleFile;
    samfile.mv(__dirname +"/Images/f1.jpg");
})


app.listen(2345,function(req,res){
    console.log("server started listening")
})