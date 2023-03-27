const Workout = require('../models/workoutModel.js')
const mongoose = require('mongoose')

// get all workouts
const getAllWorkouts = async (req,res)=>{
    const user_id = req.user._id
    const allWorkouts = await Workout.find({user_id}).sort({createdAt: -1})  // sorts the workouts in descending(due to -1) order on the basis of date created
    res.status(200).json(allWorkouts)  // res.status(200).json({allWorkouts}) -> to understand the different outputs see the notepad note 
}

// get a single workout
const getWorkout = async (req,res)=>{
    const {id} = req.params;   // extracting the id by destructing
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"})
    }

    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error:'No such workout'}) 
    } 

    res.status(200).json(workout) 
    
}


// create a workout
const createWorkout = async (req,res)=>{

    // extract the title load and reps out from the req.body which stores the data at the time of sending and store it in the database
    const {title,load,reps} = req.body

    let emptyFields = [];

    if(!title){
        emptyFields.push('title')
    }

    if(!load){
        emptyFields.push('load')
    }

    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill all the fields', emptyFields})
    }

    try {
        const user_id = req.user._id;
        const workout = await Workout.create({title,load,reps,user_id})   // this is an asynchronous function so we add async & await to the entire function
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error:error.message})
    }

    // res.json({msg:"POST a new workout"})  -> not required
}


// delete a workout
const deleteWorkout = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"})
    }
    
    const workout = await Workout.findOneAndDelete({_id:id})

    if(!workout){
        return res.status(404).json({error:'No such workout'}) 
    } 
    
    res.status(200).json(workout); 
    
}

// update a workout
const updateWorkout = async (req,res)=>{
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id:id} , {...req.body})

    if(!workout){
        return res.status(404).json({error:'No such workout'}) 
    } 
    
    res.status(200).json(workout); 

}


module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
}