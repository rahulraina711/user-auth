const express = require('express');
const router = express.Router();
const User = require('../models/user.model')

exports.profile = (req, res)=>{
    const id = req.params.id;
    try{
        User.findById(id).exec().then(data=>{
            res.status(201).json({message:`Hi ${data.name}, you are now logged in`})
        }).catch(err=>{
            res.status(401).json({message: err})
        })
    }catch(error){
        res.status(500).json({message:error})
    }

}