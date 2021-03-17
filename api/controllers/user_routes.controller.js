const bcrypt = require('bcrypt');
const User = require('../models/user.model'); // getting the user model
const jwt = require('jsonwebtoken');

// setting up user registeration route handler

exports.register = async (req, res, next) => {
    try {
        //(a password and email validation can be added here as well)
        const name = `${req.body.firstName} ${req.body.lastName}`
        const email = req.body.email;
        const password = await bcrypt.hash(req.body.password, 10);

        // unique email
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                message: "user already exists"
            })
        }
        const user = new User({
            name,
            email,
            password
        })
        const savedUser = await user.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}

exports.login = async (req, res, next) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        // unique email
        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            //res.status(201).json(existingUser);
            bcrypt.compare(password, existingUser.password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: "auth failed"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: existingUser.email,
                        userId: existingUser._id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    })
                    res.status(201).json({
                        message: "auth successful",
                        token: token
                    });
                    
                }
            }) 
        } else {
            res.status(401).json({
                message: "auth failed"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}
