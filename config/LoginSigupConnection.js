let express=require("express")

let dotenv=require("dotenv")
let mongoose=require("mongoose")
 dotenv.config()

    let LoginDBconnection=async ()=>{
    try{

     return  mongoose.createConnection(process.env.MongoDB_Login)
        //  .then(()=>{
        //     console.log("MongoDB LoginSignup server connected ")
        // }).catch((err)=>{
        //     console.log(err.message)
        // })
    }catch(err){
        console.log(err)
    }




}

module.exports=LoginDBconnection
