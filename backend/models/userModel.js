const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    }
})

// static signup method
userSchema.statics.signup = async function(email,password){

    if(!email || !password)
        throw Error('All fields must be filled')

    if(!validator.isEmail(email))
        throw Error('Email is not valid')
    
    if(!validator.isStrongPassword(password))
        throw Error('Password is not strong enough')

    const emailExists = await this.findOne({email})   // can't use the model name as it is given later so 'this' is used

    if(emailExists){
        throw Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email:email,password:hash})


    return user
}


// static login method
userSchema.statics.login = async function (email,password) {

    if(!email || !password)
        throw Error('All fields must be filled')

    
    const user = await this.findOne({email})   // can't use the model name as it is given later so 'this' is used

    if(!user){
        throw Error('Incorect Email')
    }

    const compare = await bcrypt.compare(password, user.password)

    if(!compare)
        throw Error('Incorrect Password')
    
    return user
}



module.exports = mongoose.model('User' , userSchema)