const express = require("express");
const router = express.Router();

const timetableController = require("../timetable/controllers/timetable.controller");

router.get("/profesori/:teacherId", timetableController.getTimetableForTeacher);
router.get("/clase/:classId", timetableController.getTimetableForClass);

module.exports = router;
