const mongoose = require('mongoose');

const userSChema = new mongoose.Schema({
    name:{type: String},
    email:{type: String , required: true},
    password:{type: String, required: true}
    
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", userSChema);