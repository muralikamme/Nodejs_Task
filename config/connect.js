let mongoose=require("mongoose")
let dotenv=require("dotenv")


dotenv.config()

 function connect (){

    try{

       return  mongoose.connect(process.env.MongoDB_Url)
        .then(()=>{
            console.log("MongoDB  server connected ")

        }).catch((err)=>{
            console.log(err.message)

        })

    
    }catch(err){
        console.log(err)
    }

}

module.exports= connect