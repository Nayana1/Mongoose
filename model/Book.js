var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var BookSchema =new Schema({
    bookid:{type:String},
    bname:{type:String},
    author:{type:String}
}

)
module.exports=mongoose.model("Booktab",BookSchema);