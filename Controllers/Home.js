const Loginpage=async (req,res)=>{
  try{

    return res.render("Login")

  }catch(err){
    return res.status(500).json({message:"Internal Server Error"})

  }

}


const SignupPage= async (req,res)=>{
  try{

    return res.render("signup")

  }catch(err){
    return res.status(500).json({message:"Internal server Error"})

  }
  

}







const fileupload = async (req, res) => {
    try {
      return res.render("Form");
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };


 const Renderimg=async (req,res)=>{

    try{
        return res.render("EditDelete");

    }catch(err){
        return res.status(500).json({message:"Internal Server error"})

    }

 }
  
  
  module.exports = { fileupload, Renderimg,Loginpage,SignupPage};