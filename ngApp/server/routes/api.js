const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const bcrypt = require('bcryptjs');

router.get('/',(req,res,next) =>  {
    res.send('From API route');
});

const mongoose = require('mongoose');
const db = "mongodb://shahar:sha123@ds135653.mlab.com:35653/videoplayer";
mongoose.connect(db, { useNewUrlParser: true }, err => {
    if(err){
        console.log('Error! ' + err);
    }else{
        console.log('Connected to mongoDB');
    }
});

const User = require('../models/user');

router.post('/register',(req,res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error,registeredUser) => {
        if(error){
            console.log(error);
        }else{
           bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(req.body.password,salt,function(err,hash){
                let newUser = { email: req.body.email ,password: hash };
                res.status(200).json({newUser});
            });
           });
           /*
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
            */
        }
    });
});

router.post('/login',(req,res) => {
    let userData = req.body;
    User.findOne({email: userData.email},(error,user) => {
        if(error){
            console.log(error);
        }else{
            if(!user || user.email !== userData.email ){
                res.status(401).send('Invalid email or password');
            }else{
                if(bcrypt.compare( userData.password, user.password)){
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload,'secretKey');
                    res.status(200).send({token});
                }
                /*
                bcrypt.compare( userData.password, user.password ,function(err,user){
                    if(user){
                        let payload = { subject: user._id };
                        let token = jwt.encode(payload,'secretKey');
                        return res.status(200).send({token});
                    }
                });*/
                /*
                let payload = { subject: user._id }
                let token = jwt.sign( payload ,'secretKey' );
                res.status(200).send({token});
                */
            }
        }
    });
});
/*
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request');    
    }
    let payload = jwt.verify(token, 'secretKey');
    if(!payload) {
      return res.status(401).send('Unauthorized request');    
    }
    req.userId = payload.subject;
    next();
}
*/
router.get('/events',(req,res) => {
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(events);
});

router.get('/special',/*verifyToken,*/(req,res) => {
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(events);
});
module.exports = router;

