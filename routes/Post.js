const express = require('express');
const router = express.Router();
const { validationResult, check } = require("express-validator"); //  a set of express.js middlewares that wraps validator.js validator and sanitizer functions.
const Post = require('../models/Post');
const path = require("path");


router.post('/', async (req,res) => {
    try{
        const newPost = new Post({
            name: req.body.name,
            tweet: req.body.tweet
        });

        const post = await newPost.save();
        return res.json(post);
    } catch(err){
        console.log(err.message);
        return res.status(500).send("Server Error");
    }
});


module.exports = router;
