const asyncHandler = require('express-async-handler')
// import userModel
const User = require('../models/uesrModel');
const generateToken = require('../utils/generateTokens');

// regester User
const regesterUser = asyncHandler(async (req, res)=>{
    const {name, email, password, pic} = req.body;

    // check is the user is alrady exists
    const userExists = await User.findOne({email});
    
    if(userExists){
        res.status(404);
        throw new Error('User is Alrady Exists')
    }

    // Create New Users
    const newUser = await User.create({
        name,email,password,pic
    })
    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token:generateToken(newUser._id),
            pic: newUser.pic,
        })
    }else{
        res.status(400)
        throw new Error('Error Occured!')
    }

    // send data to the user
})

// loginUser

const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body

    // find the user in the db
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id),
            pic: user.pic,
        })
    }else{
        res.status(400);
        throw new Error('Invalid Email or Password!')
    }
})

module.exports = {regesterUser, loginUser}