
  const express=require('express');
  const router=express.Router();
  const validUrl=require('valid-url');
  const shortid=require('shortid');
  const Url=require('../model/Url.model');
  const baseUrl='http://localhost:5000';
  
  router.post('/sortner',async(req,res)=>{

    const {longUrl}=req.body;
   
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).send('base url invalid')
    }
   const urlCode=shortid.generate();
   if(validUrl.isUri(longUrl)){
    try {
        
        var url= await Url.findOne({
            longUrl
        });
        if(url){
            res.status(200).json(url)
        }
        else{
            const shortUrl = baseUrl + '/' + urlCode;

                
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        


    } catch (error) {
        console.log(error)
        res.status(500).json('Server Error')


    }
   }
   else{
    res.status(401).json('Invalid longUrl')
   }

  })
  router.get('/:code',async(req,res)=>{
  
    try {
        
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        if (url) {
            
            return res.redirect(url.longUrl)
        } else {
           
            return res.status(404).json('No URL Found')
        }

    }
   
    catch (err) {
        
        res.status(500).json('Server Error')
    }
   

  })

  module.exports=router;