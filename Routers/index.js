let express=require("express")
let multer=require("multer")
const Home=require("../Controllers/Home")
let uploaded=require("../config/storage")



let router=express.Router()
let {upload,Renderimg,Delete,DataDelete,Edit}=require("../Controllers/index")

router.get("/fileupload",Home.fileupload)

// let user=propmt("Enter how many file you want")

router.post("/upload",uploaded.array("files",5),upload)
// for showing
router.get("/Renderimg",Renderimg)
// for posting
router.post("/Renderimg",Renderimg)

router.post("/edit/:id/:index", uploaded.single("newImage"),Edit)

router.post("/delete/:id/:index",Delete)


router.post("/DataDelete",DataDelete)




module.exports = router
















