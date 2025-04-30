// const shortid = require('shortid');
const {str10_36} = require('hyperdyperid/lib/str10_36');
const URL =require('../models/url')
async function handelGenerateNewShortURl(req,res){
    const shortID=str10_36();;
    const body=req.body;
    
    
    if(!body.url) return res.status(400).json({error:"url is required"});
  
    try {
        // Create the URL document
        const url = new URL({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy:req.user._id,   //ek middleware banaya the jo user ko req.body me save kara raha tha
        });

        // Save to the database
        await url.save();

        // Render the "home.ejs" view with the generated short ID
        return res.render("home", { id: shortID });
    } catch (error) {
        console.error("Error saving URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function handleGetAnalysis(req,res){
   const shortId = req.params.shortId;
   const result = await URL.findOne({shortId});
   return res.json({
    totalClicks:result.visitHistory.length,
    analytics:result.visitHistory,
   });
}


module.exports={
    handelGenerateNewShortURl,handleGetAnalysis,
}