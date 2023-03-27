const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// Login is necessary now and also the token needs to be sent with the request to access the workouts

// To protect the API routes
// Checks if the req came with the token and also whether teh token is valid
const requireAuth = async (req,res,next)=>{
    // verifying that the user is authenticated

    // extracts the authorization property from request header which contains bearer schemed token whwn used in JWT.
    const {authorization} = req.headers   
    // "Bearer" scheme indicates that the token being sent is a bearer token, which means that it grants the holder access to a protected resource. The <token> parameter contains the actual JWT token

    if(!authorization){
        return res.status(401).json({error:'Authorization token required'})
    }


    // extract the actual token from 'authorization' as we actually sent the token in request header
    // The value of authorization is a string and is in format 'bearer <token>' 
    // So we extract the token from the string

    const token = authorization.split(' ')[1]  // extract the 2nd item from the string which is the actual token
    
    try {

        // Verifies and returns the payload of the token if successfully verified else it throws an error. The payload is the part of the token that contains the information that was originally encoded into it, such as the user ID or any other relevant data. Here, we extract the ID of the user from the payload returned
        const {_id} = jwt.verify(token , process.env.SECRET) 

        // Attaching the result to the user property on the req for the next middleware.Subsequent middleware or route handlers can check if the user is authorized to access a resource or perform an action based on their user ID.

        // The value of req.user is being set to the result of the MongoDB query using Mongoose
        req.user = await User.findOne({_id}).select('_id')   // req.user can have any name (example req.abcd)

        next()

    } catch (error) {
        console.log(error);
        return res.status(401).json({error: 'Request is not authorized'}) 
    }

}

module.exports = requireAuth
