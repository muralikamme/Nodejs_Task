let Image=require("../Model/images")




// Upload Controller
const upload = async (req, res) => {
  try {
    // console.log(req.body,"lll")
    const files = req.files.map((file) => file.path);
    // console.log(files,"ooooo")  // multer sets file.path
    const img = new Image({ files });

    await img.save();

  req.flash("success_msg","File Uploaded  Successfully ")
    return res.redirect("/api/Renderimg");
  } catch (err) {
    req.flash("error_msg","Failed to FilesUploading")
    return res.status(500).json({ error: err.message });
  }
};


// Rendering Controller

const Renderimg=async (req,res)=>{

    try{
        let data=await Image.find()
        // console.log(data,"kkkk")
        req.flash("success_msg","Data Recieved from DB !")
        return await res.render("EditDelete",{data})



    }catch(err){
      req.flash("error_msg","Failed to Fetching Data")
        return res.status(500).json({error:err.message})

    }



}


// Delete API

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




// Edit API


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


module.exports = { upload ,Renderimg,Delete,DataDelete,Edit};

