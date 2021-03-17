const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const app = express(); // instanciating express() in app variable
dotenv.config();       // to use .env variables

const PORT = process.env.PORT;      // retrieving port from .env variable PORT

app.use(morgan('combined'));                    // server requests logger logger
app.use(cors());                                // cors permissions
app.use(express.json());                        // json body parser from expesss
app.use(express.urlencoded({extended: true}));  // urlencoded parser for rich text

// setting the port up for listening
app.listen(PORT, (err, data)=>{
    if(err) return console.log(err);
    console.log(`Server up and running at Port : ${PORT}`);
})

// connecting to mongoDB atlas cluster to store and retrieve data
mongoose.connect(process.env.MDB_CONNECT_STRING,{ useNewUrlParser: true , useUnifiedTopology: true}, (err, data)=>{
    if(err) return console.log(err);
    console.log("-------------Connected to Atlas CLuster-------------")
});

// setting up routes for the server here //
// domain route
app.get('/', (req, res)=>{
    res.status(200).json({message: "Every thing is working FINE !"});
});

// user routes
app.use('/user', require('./api/routes/user.routes'));
app.use('/profile', require('./api/routes/profile.routes'));