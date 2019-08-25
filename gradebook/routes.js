const express = require("express");
const router = express.Router();

const gradebookController = require("../gradebook/controllers/gradebook.controller");

router.get("/admin/elevi/:studentId", gradebookController.editStudentCatalog);
router.get("/elevi/:studentId/catalog-recent", gradebookController.viewRecentStudentCatalog);
router.get("/elevi/:studentId", gradebookController.viewStudentCatalog);

router.post("/", gradebookController.createGradebookItem);
router.post("/absences", gradebookController.createAbsences);
router.put("/excuse-absence/:id", gradebookController.excuseAbsence);
router.delete("/:id", gradebookController.deleteGradebookItem);

module.exports = router;
