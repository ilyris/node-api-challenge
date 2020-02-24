// implement your API here
const express = require("express");
const actionsRoutes = require("./routes/actionRoutes");
const projectsRoutes = require("./routes/projectRoutes");

const actiondb = require("./data/helpers/actionModel");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
	res.status(200).json({ message: "hello, world" });
})

// Routing
server.use('/actions', actionsRoutes);
server.use('/projects', projectsRoutes);

// Moves the action / projects put / delete routes below. Having issues with the sub router for these routes currently.

server.put("/actions/:id", (req, res) => {
  console.log('action put hit');
  const id = req.params.id;

  if ((req.body.description, req.body.notes, req.body.project_id)) {
      actiondb.update(id, req.body).then(() => {
      res.status(200).json({ message: "Action successfully updated" });
    });
  } else {
      console.log(err);
      res.status(400)({ message: "Bombed request, check log.." });
  }
});

server.delete("/actions/:id", (req, res) => {
        actiondb.remove(req.params.id).
        then(action => {
            console.log('action has been deleted!');
          res.json(action);
        }).catch(() => {
          res.status(500).json({ message: "Couldn't delete actions" });
        });
});


server.put("/projects/:id", (req, res) => {
      if (req.body.name, req.body.description, req.body.completed && req.params.id) {
        projectsdb.update(req.params.id, req.body)
        .then(() => {
          res.status(200).json({ message:"Project successfully updated." })
        })
        .catch(err => {
            console.log(err);
        })
      } else {
        console.logf('failed update on proejct');
          res.status(500).json({ message: "Unable to update project." })
      }
    })
    
    // DELETE =======>
    
server.delete("/projects/:id", (req, res) => {
    projectsdb.remove(req.params.id).
    then(projects => {
        res.json(projects);
    })
    .catch(() => {
        res.status(500).json({ message: "Error removing project from database." });
    });
});
  module.exports = server;

server.listen(8080, () => {
	console.log(`server started at http://localhost:8080`)
})