"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const groupBy = (items, key) => items.reduce((result, item) => (Object.assign({}, result, { [item[key]]: [...(result[item[key]] || []), item] })), {});
exports.teacherController = {
    getAll: (req, res) => __awaiter(this, void 0, void 0, function* () {
        const teachers = yield services_1.teacherService.getAll();
        const teachersByArea = groupBy(teachers, "area");
        var data = {
            teachersByArea: teachersByArea,
            ctx: req.ctx,
        };
        res.render("teacher/teachers", data);
    }),
};
