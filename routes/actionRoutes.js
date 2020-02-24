const express = require("express");
const router = express.Router();
const actiondb = require("../data/helpers/actionModel");
// const authenticateAction = require('../middleware/actionMiddleware');

// Our Action Get Route

router.get("/", (req, res) => {
  console.log('action route was hit');
  actiondb.get()
    .then(actions => {
      res.status(200).json(actions); // JSONFY our actions
    })
    .catch(err => {
        console.log(err);
      res.status(500).json({ message: "Error: Could not retrieve actions from the database" });
    });
});
// Get route w/ ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  actiondb.get(id)
    .then(action => {
      res.json(action);
    })
    .catch((err) => {
        console.log(err)
      res.status(500).json({ message: "Error: Issue with retrieving action from the database." });
    });
});

// POST Route

router.post("/", (req, res) => {
console.log(req.body);
  if (req.body.project_id && req.body.description && req.body.notes) {
    actiondb
      .insert(req.body)
      .then(() => {
        res.status(200).json({ message: "Add new action to database." });
      })
      .catch((err) => {
          console.log(err)
        res.status(400).json({message: "Error occurred when adding new action to database"});
      });
  } else {
      console.log('Error with action post method');
      res.status(500).json({ message: "Unable to add new action to database." });
  }
});
  // PUT Route

//   router.put("/:id", authenticateAction, (req, res) => {
//       console.log('action put hit');
//     const { id } = req.params;
//     console.log(req.body);
//     console.log(id);
//     if ((req.body.description, req.body.notes, req.body.project_id)) {
//         actiondb.update(id, req.body).then(() => {
//         res.status(200).json({ message: "Action successfully updated" });
//       });
//     } else {
//       res.catch(() => {
//         res.status(400)({ message: "Error with request." });
//       });
//       res.catch(() => {
//         res.status(500).json({ message: "Error updating action" });
//       });
//     }
//   });

  // DELETE =======>

//   router.delete("/:id", (req, res) => {
//     const { id } = req.params;
//     actiondb.remove(id);
//     then(actions => {
//       res.json(actions);
//     }).catch(() => {
//       res
//         .status(500)
//         .json({ message: "Error removing actions from database." });
//     });
//   });
// });

module.exports = router;