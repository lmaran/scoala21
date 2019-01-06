import { Request, Response, NextFunction } from "express";
import * as path from "path";
import { pageService } from "../services";
import { IPage } from "../interfaces";
import { PageNotFound } from "../errors";
const marked = require("marked");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

export const pageController = {
    getPage: async (req: Request, res: Response, next: NextFunction) => {
        const routeWhitelist = ["asd", "pag-test"];

        if (!routeWhitelist.includes(req.params.pageId)) {
            const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
            return next(err);
        }

        // const pageId = req.params.pageId;
        const pageId = "5c3258b8b3a6dc56c06a6e7d";

        // const filePath = path.join(__dirname, "../public/test.md");

        // const page1Md = await readFileAsync(filePath, "utf-8");

        // const page1: IPage = {
        //     markdownContent: page1Md,
        //     htmlContent: marked(page1Md),
        // };

        // await pageService.insertOne(page1);

        // daca vrei sa editezi extern string-ul de markdown din mongo:
        // 1. copiezi sirul intr-un fisier (cu extensia md) din VSCode
        // 2. rulezi "Find and Replace din VSCode: Mondul regex, find=\\n, replace = \n
        // 3. dupa ce ai terminat de editat, refaci string-ul tot cu Find and Replace: \n -> \\n

        const page = await pageService.getOneById(pageId);

        var data = {
            ctx: req.ctx,
            pageContent: page.htmlContent,
        };

        res.render("page", data);

        // fs.readFile(filePath, "utf-8", (err, pageContentMd) => {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }

        //     const page: IPage = {
        //         content: pageContentMd,
        //     };

        //     // await pageService.insertOne(page);

        //     const pageContentHtml = marked(pageContentMd);

        //     // console.log(pageContentHtml);

        //     var data = {
        //         ctx: req.ctx,
        //         pageContent: pageContentHtml,
        //     };

        //     res.render("page", data);
        // });
    },
};
