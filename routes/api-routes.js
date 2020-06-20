const Workout = require("../models/Workout");
var express = require("express");
var router = express.Router();

// Find all workouts in db
router.get("/workouts", function (req, res) {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// Find last 7 workouts
router.get("/workouts/range", function (req, res) {
    Workout.find({}).limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// Post workout to db
router.post("/workouts", (req, res) => {
    Workout.create(req.body, (error, data) => {
        if (error) {
            res.send(error);
        } else {
            res.send(data);
        }
    });
});

// Finds workout with corresponding id, pushes new exercise to exercise array
router.put("/workouts/:id", function (req, res) {
    Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { "exercises": req.body } },
        { new: true, runValidators: true })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
})

module.exports = router;