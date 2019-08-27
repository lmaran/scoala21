const express = require("express");
const router = express.Router();

const homeController = require("./controllers/home.controller");
const meController = require("./controllers/me.controller");
const teacherController = require("./controllers/teacher.controller");
const studentController = require("./controllers/student.controller");
const parentController = require("./controllers/parent.controller");
const classController = require("./controllers/class.controller");
const staffController = require("./controllers/staff.controller");
const contactController = require("./controllers/contact.controller");
const pageController = require("./controllers/page.controller");
const upgradeOperationController = require("./controllers/upgrade-operation.controller");
const auth = require("../shared/user/login/loginService");

// home
router.get("/", homeController.getHomePage);

router.post("/login/", require("../shared/user/login/local/loginLocalController").authenticate);
router.get("/logout", auth.isAuthenticated(), require("../shared/user/logout/logoutController").logout);
// app.get('/me', auth.isAuthenticated(), require('./user/userController').me);
router.post("/me/changepassword", auth.isAuthenticated(), require("../shared/user/userController").changePassword);
router.get("/login", function(req, res) {
    res.render("user/login");
});
router.get("/register", function(req, res) {
    res.render("user/register", { email: req.query.email });
});
router.get("/changePassword", auth.isAuthenticated(), function(req, res) {
    res.render("user/changePassword", { user: req.user });
});

// my page
router.get("/pagina-mea", meController.getMyPage);

// student
// uncomment this route in order to make upgrade operations
// router.get("/upgrade-operation", upgradeOperationController.importStudentsFromSiiir);
// router.get("/upgrade-operation", upgradeOperationController.moveParentsToPersons);

router.get("/elevi/:studentId", studentController.getStudent);

router.get("/parinti", parentController.getAll);
router.get("/parinti/:parentId", parentController.getParent);

// teacher
router.get("/profesori", teacherController.getAll);
router.get("/profesori/:teacherId", teacherController.getTeacher);

// class
router.get("/clase", classController.getAll);
router.get("/clase/:classId", classController.getClass);
router.get("/clase/:classId/elevi", classController.getStudents);
router.get("/clase/:classId/parinti", classController.getParents);
router.get("/clase/:classId/profesori", classController.getTeachers);

// staff
router.get("/conducere", staffController.getAll);

// contact
router.get("/contact", contactController.getContact);

// pages
router.get("/:pageId", pageController.getPage);

router.get("/:pageId/asdfgh", pageController.getPage2);

module.exports = router;
