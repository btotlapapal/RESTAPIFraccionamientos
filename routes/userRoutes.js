const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const {default:mongoose} = require('mongoose');


const createUser = async(req,res)=>{
    let cuerpoRequest = req.body;
      const _user = await User.exists({username:cuerpoRequest.username});
     if(_user){
         return res.status(400).json({
             ok:false,
             message:'El usuario ya existe'
         });
     }else{
        bcrypt.hash(cuerpoRequest.password,10, async(err,hash)=>{
            const user = new User({
                username:cuerpoRequest.username,
                password:hash,
                role:cuerpoRequest.role
            });
            user.save().then(createdUser=>{
                console.log(createdUser._id);
                if(createdUser){
                    res.status(201).json({
                        msg:"Usuario creado",
                        userID:createdUser._id
                    });
                }else{
                    res.status(500).json({
                        msg:"Error al crear usuario"
                    });
                }
            })
        })
    }
};

const router = express.Router();

router.route('/')
      .post(createUser);



module.exports = router;

