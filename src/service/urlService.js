const urlRepo=require('../repos/urlRepo');
const shortId=require('shortid');
const urlService={};

urlService.saveUrl=async (originalUrl,hostWithPort)=> {
    const shortedUrl=shortId();
    const obj={
        originalUrl : originalUrl,
        shortedUrl : shortedUrl
    };
    const result = await urlRepo.saveUrl(obj);
    if(!result)
        return false;
    return 'http://' +  hostWithPort + "/" + shortedUrl;

}

urlService.redirectToOriginal=async (shortedUrl)=> {
    
    const originalUrl=await urlRepo.findOriginalUrl(shortedUrl);
    return originalUrl;
    
}

urlService.getAllUrls= async (hostWithPort)=>{
        const allUrls=await urlRepo.findAllUrls();
        if(allUrls.length==0)
        {
            const error=new Error("no URL exist in Database");
            error.status=404;
            error.type="custom";
            throw error;
        }
        allUrls.forEach(obj=>{
            obj.shortedUrl= 'http://' + hostWithPort +"/" + obj.shortedUrl;
        })
        return allUrls;
    

}

module.exports=urlService;