const express = require("express");
const router = express.Router();

const homeController = require("./controllers/home.controller");
const meController = require("./controllers/me.controller");
const teacherController = require("./controllers/teacher.controller");
const studentController = require("./controllers/student.controller");
const catalogController = require("./controllers/catalog.controller");
const parentController = require("./controllers/parent.controller");
const classController = require("./controllers/class.controller");
const staffController = require("./controllers/staff.controller");
const contactController = require("./controllers/contact.controller");
const matemaratonController = require("./controllers/matemaraton.controller");
const pageController = require("./controllers/page.controller");
const pdfController = require("./controllers/pdf.controller");
const auth = require("./user/login/loginService");
const gradebookController = require("./controllers/gradebook.controller");

// home
router.get("/", homeController.getHomePage);

router.post("/login/", require("./user/login/local/loginLocalController").authenticate);
router.get("/logout", auth.isAuthenticated(), require("./user/logout/logoutController").logout);
// app.get('/me', auth.isAuthenticated(), require('./user/userController').me);
router.post("/me/changepassword", auth.isAuthenticated(), require("./user/userController").changePassword);
router.get("/login", function(req, res) {
    res.render("user/login");
});
router.get("/register", function(req, res) {
    res.render("user/register", { email: req.query.email });
});
router.get("/changePassword", auth.isAuthenticated(), function(req, res) {
    res.render("user/changePassword", { user: req.user });
});

// pdf
router.get("/pdf/:pdfId", pdfController.getTextFromPdf);

// my page
router.get("/pagina-mea", meController.getMyPage);

// student
// uncomment this route in order to import students
// router.get("/elevi/import", studentController.import);
router.get("/elevi/:studentId", studentController.getStudent);
router.get("/elevi/:studentId/catalog", catalogController.getStudentCatalog);

router.get("/parinti", parentController.getAll);
router.get("/parinti/:parentId", parentController.getParent);

// teacher
router.get("/profesori", teacherController.getAll);
router.get("/profesori/:teacherId", teacherController.getTeacher);
router.get("/profesori/:teacherId/orar", teacherController.getTimetable);

// gradebook
router.post("/catalog", gradebookController.createGradebookItem);
router.delete("/catalog/:id", gradebookController.deleteGradebookItem);

// class
router.get("/clase", classController.getAll);
router.get("/clase/:classId", classController.getClass);
router.get("/clase/:classId/elevi", classController.getStudents);
router.get("/clase/:classId/parinti", classController.getParents);
router.get("/clase/:classId/profesori", classController.getTeachers);
router.get("/clase/:classId/orar", classController.getTimetable);

// staff
router.get("/conducere", staffController.getAll);

// contact
router.get("/contact", contactController.getContact);

// matemaraton

// router.get("/matemaraton/:edition", matemaratonController.getEditionHomepage);
router.get("/matemaraton/:edition?/prezenta/grupe/:groupId", matemaratonController.getPresencePerGroup);
router.get("/matemaraton/:edition?/prezenta/elevi/:studentId", matemaratonController.getPresencePerStudent);
router.get("/matemaraton/:edition?/pregatire-simulare-en", matemaratonController.getTrainingProgramForENSimulation);

router.get("/matemaraton/:edition?/cursuri/grupe/:groupId", matemaratonController.getCoursesPerGroup);
router.get("/matemaraton/:edition?/cursuri/:courseId", matemaratonController.getCourse);

router.get("/matemaraton/:edition?", matemaratonController.getMatemaraton);

// // angular routes: not found in static files, so default to index.html
// router.get("/admin/*", (req, res) => {
//     const file = path.join(__dirname, "../../client/dist/index.html");
//     res.sendFile(file);
// });

// pages
router.get("/:pageId", pageController.getPage);

router.get("/:pageId/asdfgh", pageController.getPage2);

module.exports = router;
