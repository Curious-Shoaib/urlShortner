
const {urlModel}=require('../models/urlModel');


const urlRepo={};
urlRepo.saveUrl= async (urlObj)=>{
    const result=await urlModel.create(urlObj);
    if(!result)
        {
        const error=new Error("url insertion failed");
        error.type="custom";
        throw error;
        }
    return true;
}

urlRepo.findOriginalUrl= async (shortedUrl)=>{
    const result=await urlModel.findOneAndUpdate({shortedUrl : shortedUrl }, 
                                                {$push : {requestHistory : {timeStamp : Date.now()}}}
                                            );
    if(!result)
    {
        const error=new Error("Url not found in Data-base");
        error.type="custom";
        throw error;
    }
    return result.originalUrl;
}

urlRepo.findAllUrls=async()=>{
    const allUrls=await urlModel.find();
    return allUrls;
}

module.exports=urlRepo;