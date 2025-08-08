let mongoose=require("mongoose")


let Files= new mongoose.Schema({
    files:{
        type:Array,
        unique: true
    }
})

let files=mongoose.model("files",Files)

module.exports=files