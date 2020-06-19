const Workout = require("../models/Workout");
const mongojs = require("mongojs");

module.exports = function(app) {

    app.get("/api/workouts", function(req, res) {
        Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.get("/api/workouts/range", function(req, res) {
      Workout.find({}).limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.post("/api/workouts", (req, res) => {
        console.log(req.body);
        Workout.create(req.body, (error, data) => {
          if (error) {
            res.send(error);
          } else {
            res.send(data);
          }
        });
    });

    app.put("/api/workouts/:id", function(req, res) {
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
};