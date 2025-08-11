let mongoose=require("mongoose")

let userCredential=require("./index")


let Files= new mongoose.Schema({
    files:{
        type:Array
           
    },
    userId:{
        type:mongoose.Schema.Types.String,
        ref: 'userCredential'
          

    }
})

let files=mongoose.model("files",Files)

module.exports=files