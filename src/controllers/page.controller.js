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
const path = require("path");
const errors_1 = require("../errors");
const services_1 = require("../services");
const marked = require("marked");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);
exports.pageController = {
    getPage: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const routeWhitelist = [
            "repere-istorice",
            "elevi-de-prestigiu",
            "ziua-portilor-deschise",
            "planul-de-scolarizare",
            "circumscriptie",
            "criterii-specifice-de-departajare",
            "orarul-pentru-inscriere",
            "acte-necesare-pentru-inscriere",
            "procedura-de-repartizare-pe-clase",
            "scoala-dupa-scoala",
            "imagini-din-clase",
            "metodologie-evaluare-nationala",
            "calendar-evaluare-nationala",
            "rezultate-simulare-evaluare-nationala",
            "rezultate-evaluare-nationala",
            "personal-auxiliar",
            "comisii",
            "clase",
            "orar-elevi",
            "transfer-elevi",
            "rezultate-olimpiade",
            "burse-elevi",
            "revista-scolii",
            "eco-scoala",
            "biblioteca",
            "hotarari-ca",
            "achizitii-publice",
            "cheltuieli-asociatie-parinti",
            "rapoarte",
            "anunturi",
        ];
        const pageId = req.params.pageId;
        if (!routeWhitelist.includes(pageId)) {
            const err = new errors_1.PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
            return next(err);
        }
        const page = yield services_1.pageService.getOneBySlug(pageId);
        var data = {
            ctx: req.ctx,
            pageContent: (page && page.htmlContent) || "pagina negasita",
        };
        res.render("page", data);
    }),
    getPage2: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const routeWhitelist = [
            "repere-istorice",
            "elevi-de-prestigiu",
            "ziua-portilor-deschise",
            "planul-de-scolarizare",
            "circumscriptie",
            "criterii-specifice-de-departajare",
            "orarul-pentru-inscriere",
            "acte-necesare-pentru-inscriere",
            "procedura-de-repartizare-pe-clase",
            "scoala-dupa-scoala",
            "imagini-din-clase",
            "metodologie-evaluare-nationala",
            "calendar-evaluare-nationala",
            "rezultate-simulare-evaluare-nationala",
            "rezultate-evaluare-nationala",
            "personal-auxiliar",
            "comisii",
            "clase",
            "orar-elevi",
            "transfer-elevi",
            "rezultate-olimpiade",
            "burse-elevi",
            "revista-scolii",
            "eco-scoala",
            "biblioteca",
            "hotarari-ca",
            "achizitii-publice",
            "cheltuieli-asociatie-parinti",
            "rapoarte",
            "anunturi",
        ];
        const pageId = req.params.pageId;
        if (!routeWhitelist.includes(pageId)) {
            const err = new errors_1.PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
            return next(err);
        }
        const filePath = path.join(__dirname, `../public/pages/${pageId}.md`);
        const page1Md = yield readFileAsync(filePath, "utf-8");
        const page = yield services_1.pageService.getOneBySlug(pageId);
        page.markdownContent = page1Md;
        page.htmlContent = marked(page1Md);
        console.log(page);
        yield services_1.pageService.updateOne(page);
        var data = {
            ctx: req.ctx,
            pageContent: (page && page.htmlContent) || "pagina negasita",
        };
        res.render("page", data);
    }),
};
