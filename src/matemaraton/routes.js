const express = require("express");
const router = express.Router();

const matemaratonController = require("./controllers/matemaraton.controller");

// router.get("/matemaraton/:edition", matemaratonController.getEditionHomepage);
router.get("/:edition?/prezenta/grupe/:groupId", matemaratonController.getPresencePerGroup);
router.get("/:edition?/prezenta/elevi/:studentId", matemaratonController.getPresencePerStudent);
router.get("/:edition?/pregatire-simulare-en", matemaratonController.getTrainingProgramForENSimulation);
router.get("/:edition?/cursuri/grupe/:groupId", matemaratonController.getCoursesPerGroup);
router.get("/:edition?/cursuri/:courseId", matemaratonController.getCourse);
router.get("/:edition?", matemaratonController.getMatemaraton);

module.exports = router;
