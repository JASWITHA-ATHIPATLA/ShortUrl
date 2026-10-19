const express=require("express");
const router=express.Router();
const {handleGenerateNewShortURL,handleGetOriginalURL,handleGetUrl,handleGetAnalytics}=require('../controllers/url.js');

router.post('/',handleGenerateNewShortURL);
router.get('/',handleGetUrl);
router.get('/:shortId',handleGetOriginalURL);
router.get('/analytics/:shortId',handleGetAnalytics);
module.exports =router;
    