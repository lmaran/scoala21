"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path = require("path");
const controllers_1 = require("./controllers");
const router = express_1.Router();
router.get("/", controllers_1.homeController.getHomePage);
router.get("/check", controllers_1.checkController.getCheckPage);
router.get("/profesori", controllers_1.teacherController.getAll);
router.get("/conducere", controllers_1.staffController.getAll);
router.get("/contact", controllers_1.contactController.getContact);
router.get("/matemaraton", controllers_1.matemaratonController.getMatemaraton);
router.get("/admin/api/users/", controllers_1.userAdminApiController.getAll);
router.get("/admin/*", (req, res) => {
    const file = path.join(__dirname, "../../client/dist/index.html");
    res.sendFile(file);
});
router.get("/:pageId", controllers_1.pageController.getPage);
router.get("/:pageId/asdfgh", controllers_1.pageController.getPage2);
exports.default = router;
//# sourceMappingURL=routes.js.map