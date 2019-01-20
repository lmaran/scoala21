import { Router } from "express";
import * as path from "path";
import {
    checkController,
    homeController,
    teacherController,
    staffController,
    contactController,
    matemaratonController,
    pageController,
    userAdminApiController,
} from "./controllers";

const router = Router();

// home
router.get("/", homeController.getHomePage);

// check
router.get("/check", checkController.getCheckPage);

// teacher
router.get("/profesori", teacherController.getAll);

// staff
router.get("/conducere", staffController.getAll);

// contact
router.get("/contact", contactController.getContact);

// matemaraton
router.get("/matemaraton", matemaratonController.getMatemaraton);

// user
router.get("/admin/api/users/", userAdminApiController.getAll);
// router.get("/admin/users/:id", userController.getOneById);
// router.post("/admin/users/", userController.insertOne);
// router.put("/admin/users/", userController.updateOne);
// router.delete("/admin/users/:id", userController.deleteOneById);

// angular routes: not found in static files, so default to index.html
router.get("/admin/*", (req, res) => {
    const file = path.join(__dirname, "../../client/dist/index.html");
    res.sendFile(file);
});

// pages
router.get("/:pageId", pageController.getPage);

router.get("/:pageId/asdfgh", pageController.getPage2);

export default router;
