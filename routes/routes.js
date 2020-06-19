const Workout = require("../models/Workout");
const mongojs = require("mongojs");
var express = require("express");
var router = express.Router();

    router.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

    router.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
    });

    router.get("/workouts", function(req, res) {
        Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    router.get("/range", function(req, res) {
      Workout.find({}).limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    router.post("/workouts", (req, res) => {
        console.log(req.body);
        Workout.create(req.body, (error, data) => {
          if (error) {
            res.send(error);
          } else {
            res.send(data);
          }
        });
    });

    router.put("/workouts/:id", function(req, res) {
        Workout.updateOne(
            {_id: mongojs.ObjectId(req.params.id)},
            { $push: { "exercises": req.body }})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    })

    module.exports = router;