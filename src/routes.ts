import { Router } from "express";
import {
    checkController,
    homeController,
    teacherController,
    staffController,
    contactController,
    matemaratonController,
    pageController,
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

// pages
router.get("/:pageId", pageController.getPage);

router.get("/:pageId/asdfgh", pageController.getPage2);

export default router;
