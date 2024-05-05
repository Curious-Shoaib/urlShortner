
const express=require('express');
const router=express.Router();
const service=require('../service/urlService');

router.get('/' , async (req,res,next) => {
    try{
       res.status(200).render('urlPage');
    }
    catch(err)
    {
        res.status(500);
        next(err);
    }

});

router.post('/' , async (req,res,next) => {
    try{
        let result=await service.saveUrl(req.body.originalUrl,req.headers.host);
        res.status(201).render('urlPage',{result});  // curly braces is 'locals' object and result will be its field
    }
    catch(err)
    {
       if(err.type)
       res.status(201).render('urlPage',{err});
        res.status(501);
        next(err);
    }

});

router.get('/:shortedUrl' , async (req,res,next) => {
    try{
        if(req.params.shortedUrl!="all")
        {
            let result=await service.redirectToOriginal(req.params.shortedUrl);
            res.redirect(result);
        }
        else
        next();

    }
    catch(err)
    {
        if(!err.status)
        res.status(500);
        if(err.type)
        res.render('urlPage',{err});
        next(err);
    }

},
async (req,res,next) => {
    try{
        let allUrls=await service.getAllUrls(req.headers.host);
        res.render('urlPage',{allUrls});
    }
    catch(err)
    {
        if(err.type)
        {
            res.render('urlPage',{err});
        }
        res.status(500);
        next(err);
    }
});



module.exports=router;