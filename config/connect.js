let mongoose=require("mongoose")
let dotenv=require("dotenv")


dotenv.config()

 function connect (){

    try{

        mongoose.connect(process.env.MongoDB_Url).then(()=>{
            console.log("MongoDB connected")

        }).catch((err)=>{
            console.log(err.message)

        })

    
    }catch(err){
        console.log(err)
    }

}

module.exports= connect