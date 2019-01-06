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
const errors_1 = require("../errors");
const marked = require("marked");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
exports.pageController = {
    getPage: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const routeWhitelist = ["asd", "pag-test"];
        if (!routeWhitelist.includes(req.params.pageId)) {
            const err = new errors_1.PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
            return next(err);
        }
        const pageId = "5c3258b8b3a6dc56c06a6e7d";
        const page = yield services_1.pageService.getOneById(pageId);
        var data = {
            ctx: req.ctx,
            pageContent: page.htmlContent,
        };
        res.render("page", data);
    }),
};
