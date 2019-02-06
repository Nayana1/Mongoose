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
    res.render("home")
})
app.get('/insert',function(req,res){
   var b1=new book();
   b1.bookid="Book1";
   b1.bname="shdjshds";
   b1.author="dsdsd";
   b1.save(function(err,result){
      if(err){res.send("err")}
          else { res.send("data inserted")}
   })

})
app.get('/insert1',function(req,res){
   res.render("add")
 })

app.post("/actionPage",function(req,res){
    var BookId = req.body.field1;
    var Bname = req.body.field2;
    var Bauthor = req.body.field3;
    var Bpublisher=req.body.field4;
    var insertData = {BookId:BookId,BookName:Bname,BookAuthor:Bauthor,BookPublisher:Bpublisher}
    mongoclient.connect(url,function(err,database){
        var dtb=database.db('example');
        var empcol=dtb.collection('Booktab');
        empcol.insert(insertData,function(err,successResult){
            if(err){
                res.send("Not insert")
            }
            else{
                res.send("Inserted")
            }
        })
    })

})
app.post("/insert",function(req,res){

    var b1=new book();
   b1.bookid=req.body.Bookid;
   b1.bname="shdjshds";
   b1.author="dsdsd";
   b1.save(function(err,result){
      if(err){res.send("err")}
          else { res.send("data inserted")}
   })

    var BookId = req.body.Bookid;
    var Bname = req.body.Bookname;
    var Bauthor = req.body.Bookauthor;
    var Bpublisher=req.body.Bookpublisher;
    
})

app.get("/delete",function(req,res){
    res.render("deletebook")
})
app.post("/delete",function(req,res){
   book.deleteOne({bookid:"sdsd"},function(err,result)
        { 
        if(err){res.send("err")}
        else { res.send("data deleted")}
    })// same book given in book of loc18
})


app.get("/view",function(req,res){    
    book.find({},function(err,result){
        if(err){res.send("err")}
        else   {
            res.render('viewbook',{data:result});
        }
    
      
})
})
app.post("/view",function(req,res){    
    book.find({bookid:req.body.bookid},function(err,result){
        if(err){res.send("err")}
        else   {
            res.render('viewbook',{data:result});
        }
    
      
})
})

app.get("/update",function(req,res){
    book.findOne({"bookid":"Book1"},function(err,bdata){ 
   
bdata.bname="wings of fire";
bdata.author="Apj";
bdata.save();
    })
})
app.post("/upload",function(req,res){
    let samfile=req.files.sampleFile;
    samfile.mv(__dirname +"/Images/f1.jpg");
})
app.get("/login",function(req,res){
    let name=res.render("login")
})
app.post("/login",function(req,res){
    let name=res.render("login")
})
app.listen(1234,function(req,res){
    console.log("server started listening")
})
