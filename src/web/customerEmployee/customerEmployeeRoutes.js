"use strict";

const express = require("express");
const controller = require("./customerEmployeeController");
const router = express.Router();

// ---------- OData ----------
router.get("/getAllWithBadgeInfo", controller.getAllWithBadgeInfo);
router.get("/", controller.getAll);
router.get("/\\$count", controller.getAll);

// ---------- REST ----------
router.post("/", controller.create);
router.get("/:id", controller.getById);
router.put("/", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
