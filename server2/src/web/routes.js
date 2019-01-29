// import { Router } from "express";
const express = require("express");
const router = express.Router();

const checkController = require("./controllers/check.controller");
const homeController = require("./controllers/home.controller");
// const teacherController = require("./controllers/teacher.controller");
// const staffController = require("./controllers/staff.controller");
const contactController = require("./controllers/contact.controller");
const matemaratonController = require("./controllers/matemaraton.controller");
// onst pageController = require("./controllers/page.controller");
// const userAdminApiController = require("./controllers/user.admina-pi.controller");

// home
router.get("/", homeController.getHomePage);

// check
router.get("/check", checkController.getCheckPage);

// teacher
// router.get("/profesori", teacherController.getAll);

// staff
// router.get("/conducere", staffController.getAll);

// contact
router.get("/contact", contactController.getContact);

// matemaraton
router.get("/matemaraton", matemaratonController.getMatemaraton);

// // angular routes: not found in static files, so default to index.html
// router.get("/admin/*", (req, res) => {
//     const file = path.join(__dirname, "../../client/dist/index.html");
//     res.sendFile(file);
// });

// pages
// router.get("/:pageId", pageController.getPage);

// router.get("/:pageId/asdfgh", pageController.getPage2);

module.exports = router;
