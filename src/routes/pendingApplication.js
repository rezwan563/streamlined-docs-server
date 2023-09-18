const router = require("express").Router();
const PendingApplication = require("../models/pendingApplication");

// created new application edited info
router.post("/", async (req, res) => {
  const editedData = req.body;
  try {
    const editedProfileData = new PendingApplication(editedData);
    const savedEditedData = await editedProfileData.save();
    res.status(201).json(savedEditedData);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get edited profile info
router.get("/:email", async (req, res) => {
  try {
    const editedData = await PendingApplication.findOne({
      userEmail: req.params.email,
    });
    res.status(200).json(editedData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all pending application 
router.get("/is_approved", async (req, res) => {
  try {
    const pendingData = await PendingApplication.find({isApproved: true});
    res.status(200).json(pendingData);
  } catch (error) {
    res.status(500).json(error);
  }
});


// change isApproved to true when admin approves application
router.put("/approved/:email", async (req, res) => {
  try {
    const query = { userEmail: req.params.email };
    const update = { $set: { isApproved: true } };
    const updatedData = await PendingApplication.findOneAndUpdate(
      query,
      update,
      {
        new: true,
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});
// change isPending to false when admin approves application
// change isRejected to false when admin approves application
router.put("/rejected/:email", async (req, res) => {
    try {
      const query = { userEmail: req.params.email };
      const update = { $set: { isRejected: true } };
      const updatedData = await PendingApplication.findOneAndUpdate(
        query,
        update,
        {
          new: true,
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  });
module.exports = router;
