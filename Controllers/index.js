let express=require("express")
let bcrypt=require("bcryptjs")
let jwt=require("jsonwebtoken")
let mongoose=require("mongoose")

let Image=require("../Model/images")
let userCredential =require("../Model/index")





// LOGIN API

const Logincredentials = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "ll");

    const user = await userCredential.findOne({ email });
    if (!user) {
      req.flash("error_msg", "User not found");
      return res.render("Login");  // redirect to login page to show flash
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.flash("error_msg", "Invalid Credentials");
      return res.render("Login");  // redirect to login page to show flash
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Store token in cookie/session if needed here
    // res.cookie("token", token, { httpOnly: true });  // optional
    req.session.userEmail=email
    console.log(req.session,"pppoopop");
     req.flash("success_msg","Login successful")
    return res.redirect("/api/fileupload" );  // successful login redirect
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// SIGNUP API
const signupCredentials = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    

    const existingUser = await userCredential.findOne({ email });
    if (existingUser) {
      req.flash("error_msg", "User already exists");
      return res.render("signup"); // redirect so flash shows on the next page load
    }

    const hashedPassword = await bcrypt.hash(password, 10);
console.log(req.body);
password=hashedPassword;
    const user =  userCredential.create({name, email, password });
    // await user.save();

    req.flash("success_msg", "Signup successful! Please log in.");
    return res.redirect("/api/Login"); // redirect after signup success
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};




// FILEUPLOAD API
const upload = async (req, res) => {
  try {
    // console.log(req.body,"lll")
    const files = req.files.map((file) => file.path);
    console.log(files,req.session,"charan123")  // multer sets file.path
    const img = Image.create({ files:files,userId:req.session.userEmail });

    // await img.save();
    console.log(req.session,"000000");  


  req.flash("success_msg","File Uploaded  Successfully ")
    return res.redirect("/api/Renderimg");
  } catch (err) {
    req.flash("error_msg","Failed to FilesUploading")
    return res.status(500).json({ error: err.message });
  }
};


// DATA FETCHING API FROM DB

const Renderimg=async (req,res)=>{


    try{
      console.log(req.session,"12345678765");

        let data=await Image.find({userId:req.session.userEmail})
        console.log(data,"dddddd")
        
        // console.log(data,"kkkk")
        req.flash("success_msg","Data Recieved from DB !")
        return await res.render("EditDelete",{data,email: req.session.userEmail})



    }catch(err){
      req.flash("error_msg","Failed to Fetching Data")
        return res.status(500).json({error:err.message})

    }



}


// IMAGE DELETEING API

// router.post("/delete/:id/:index"), 
let Delete=async (req, res) => {
  const { id, index } = req.params;
  console.log(id,index)

  try {
    const doc = await Image.findById(id);
    console.log(doc,"files132r456")
    
    if (!doc) return res.status(404).send("Document not found");

    doc.files.splice(index, 1); // delete image at index
    await doc.save();
    req.flash("success_msg","Image Deleted Successfully")
    res.redirect("/api/Renderimg");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Userdata delete api
let UserDataDelete=async (req,res)=>{
  try{
 await userCredential.deleteMany()
  //  ss.save()
  req.flash("success_msg","data deleted  successfully ")
   return res.status(200).json({mess:"data deleted  successfully "})

  }catch(err){
    return res.status(500).json({error:err.mesage})

  }
}

//Images DATA DELETEING API
let DataDelete=async (req,res)=>{
  try{
 await Image.deleteMany()
  //  ss.save()
  req.flash("success_msg","data deleted  successfully ")
   return res.status(200).json({mess:"data deleted  successfully "})

  }catch(err){
    return res.status(500).json({error:err.mesage})

  }
}




// IMAGE REPLACE API


// router.post("/edit/:id/:index", upload.single("newImage")), 
let Edit=async (req, res) => {
  const { id, index } = req.params;

  try {
    const doc = await Image.findById(id);
    if (!doc) return res.status(404).send("Document not found");

    const newFilePath = req.file.path; // multer stores file path

    

    doc.files[index] = newFilePath; // replace old image at index
    await doc.save();
  req.flash("success_msg","Images Replaced Successfully")
    res.redirect("/api/Renderimg");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {Logincredentials, signupCredentials,upload ,Renderimg,Delete,DataDelete,Edit,UserDataDelete};

