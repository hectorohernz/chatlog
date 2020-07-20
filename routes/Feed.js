const express = require("express");
const router = express.Router();
require("dotenv").config();
const Post = require('../models/Post');

router.get("/", async (req,res) => {
    try{
        const tweets = await Post.find();
        res.json(tweets);
    } catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
