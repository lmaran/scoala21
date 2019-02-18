const express = require("express");
const router = express.Router();

const homeController = require("./controllers/home.controller");
const teacherController = require("./controllers/teacher.controller");
const staffController = require("./controllers/staff.controller");
const contactController = require("./controllers/contact.controller");
const matemaratonController = require("./controllers/matemaraton.controller");
const pageController = require("./controllers/page.controller");

// home
router.get("/", homeController.getHomePage);

// teacher
router.get("/profesori", teacherController.getAll);

// staff
router.get("/conducere", staffController.getAll);

// contact
router.get("/contact", contactController.getContact);

// matemaraton
router.get("/matemaraton", matemaratonController.getMatemaraton);
router.get("/matemaraton/prezenta/:id", matemaratonController.getPresencePerGroup);
router.get("/matemaraton/prezenta/elevi/:id", matemaratonController.getPresencePerStudent);

// // angular routes: not found in static files, so default to index.html
// router.get("/admin/*", (req, res) => {
//     const file = path.join(__dirname, "../../client/dist/index.html");
//     res.sendFile(file);
// });

// pages
router.get("/:pageId", pageController.getPage);

router.get("/:pageId/asdfgh", pageController.getPage2);

module.exports = router;
