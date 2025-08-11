
let mongoose=require("mongoose")




let LoginSingupSchema=new mongoose.Schema({
// 
    name: { type:String},
    email: { type: String, unique: true },
    password: {type: String},
    
  });


  let userCredential=mongoose.model("userCredential",LoginSingupSchema)


  module.exports=userCredential