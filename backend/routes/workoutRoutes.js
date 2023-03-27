const express = require('express')
const {createWorkout,getAllWorkouts,getWorkout,updateWorkout,deleteWorkout} = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// Middleware which executes before all the other functions to ensure that the user is authenticated. If a user is not authenticated then it returns error and does not go to the controller functions
router.use(requireAuth)

// GET all workouts
router.get('/',getAllWorkouts )

//GET a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports=router