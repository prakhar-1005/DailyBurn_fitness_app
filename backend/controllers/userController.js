const User = require('../models/userModel')
var jwt = require('jsonwebtoken');


// Generating the tokens
const generateToken =(_id)=>{
    return jwt.sign({_id:_id}, process.env.SECRET, {expiresIn:'2d'})
}


//login the user
const loginUser = async (req,res)=>{

    const {email,password} = req.body

    try {
        const user = await User.login(email,password)

        // Creating a token
        const token = generateToken(user._id)

        res.status(200).json({email,token}) // works when no error is thrown

    } catch (error) {
        res.status(400).json({error:error.message})
    }

}


// signup the user
const signupUser = async (req,res)=>{

    const {email,password} = req.body

    try {
        const user =await User.signup(email,password);
        
        // Creating a token
        const token = generateToken(user._id)
        res.status(200).json({email,token}) // works when no error is thrown 

    } catch (error) {
        res.status(400).json({error:error.message})
    }

}

module.exports = {loginUser,signupUser}