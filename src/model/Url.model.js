const { default: mongoose } = require("mongoose");


   const urlSchema=new mongoose.Schema({
    
    longUrl:{type:String,require:true},
    sortUrl:{type:String,require:true},
    urlCode:{type:String,require:true},
    date:{type:String, default:Date.now},




   });

   const Url=mongoose.model('urls',urlSchema);
   module.exports=Url;