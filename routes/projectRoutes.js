const express = require("express");
const router = express.Router();
const projectsdb = require("../data/helpers/projectModel");

// GET Route

router.get("/", (req, res) => {
    projectsdb.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not retrieve data from database" });
    });
});

router.get("/:id", (req, res) => {
  projectsdb.get(req.params.id)
    .then(projects => {
      res.json(projects);
    })
    .catch((err) => {
        console.log(err);
      res.status(500).json({ message: "Error retrieving project from database." });
    });
});

//  POST  Route
router.post("/", (req, res) => {
  const { name, description, completed } = req.body;
  if ((name, description, completed)) {
    projectsdb
      .insert({ name, description, completed })
      .then(({ name, description, completed }) => {
        res.status(400).json({ name, description, completed });
      });
  } else {
    res.status(500).json({ error: "Error adding project to database." });
  }
});


module.exports = router;