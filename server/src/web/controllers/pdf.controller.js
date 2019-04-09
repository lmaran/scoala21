const pdfLib = require("pdfjs-dist");

exports.getTextFromPdf = async (req, res) => {
    // inspiration: https://github.com/mozilla/pdf.js/blob/master/examples/node/getinfo.js
    const pdfId = req.params.pdfId;
    // const pdfUrl = "https://scoala21.blob.core.windows.net/share/lista-copii-admisi-201920.pdf";
    // /lista-copii-admisi-201920-2
    // /lista-cereri-nesolutionate-201920
    // /m
    // /n
    // /raport-dinamic-etapa-2
    // /raport-sali
    // /raport-cladiri
    const pdfUrl = `https://scoala21.blob.core.windows.net/share/${pdfId}.pdf`;
    const result = {};

    const pdfDocument = await pdfLib.getDocument(pdfUrl);

    result.numberOfPages = pdfDocument.numPages;

    // // get info / metadata
    // const pdfData = await pdfDocument.getMetadata();
    // result.info = pdfData.info;
    // if (pdfData.metadata) {
    //     result.metadata = pdfData.metadata.getAll();
    // }

    // get text withStyles
    const pagesPromises2 = [];
    for (let i = 1; i <= pdfDocument.numPages; i++) {
        pagesPromises2.push(getPageText2(i, pdfDocument));
    }
    result.pagesWithStyles = await Promise.all(pagesPromises2);

    // get text
    const pagesPromises = [];
    for (let i = 1; i <= pdfDocument.numPages; i++) {
        pagesPromises.push(getPageText(i, pdfDocument));
    }
    result.pages = await Promise.all(pagesPromises);

    // get text rows
    result.pagesWithRows = getPagesWithRows(result.pages);

    const model = getModel(pdfId);

    if (model) {
        result.allLineItems = getAllLineItems(result.pages, model);

        result.parsedLines = getParsedLines(result.allLineItems, model);

        // if additional info is present => filter, sort, rename columns
        if (model.columns) {
            result.formatterLines = getFormatedLines(result.parsedLines, model);
        }
    }

    res.send(result);
};

const getPagesWithRows = pages => {
    const pagesWithRows = [];
    pages.forEach(page => {
        const rows = [];

        page.text.forEach(textObj => {
            const foundRow = rows.find(x => x.y === textObj.y);
            if (foundRow) {
                foundRow.cols.push(textObj);
            } else {
                rows.push({
                    y: textObj.y,
                    cols: [textObj]
                });
            }
        });
        pagesWithRows.push({
            pageNumber: page.pageNumber,
            rows: rows.sort((a, b) => a.y - b.y)
        });
    });
    return pagesWithRows;
};

const getModel = pdfId => {
    const models = [
        {
            modelId: "lista-copii-admisi-201920",
            numberOfColumns: 4,
            // 'columns' property is optional
            columns: [
                {
                    inputOrder: 1,
                    name: "prenume",
                    outputOrder: 3
                },
                {
                    inputOrder: 2,
                    name: "nume",
                    outputOrder: 2
                },
                {
                    inputOrder: 3,
                    name: "nrcrt",
                    outputOrder: 1
                },
                {
                    inputOrder: 4,
                    ignoreAsOutput: true
                    // name: "etapa", // no matter
                    // outputOrder: 4 // no matter
                }
            ],
            ignoreFirstItemsOnFirstPage: 9,

            ignoreFirstItemsOnOtherPages: 7,
            ignoreLastItemsOnOtherPages: 2,

            ignoreLastItemsOnLastPage: 4
        },
        {
            modelId: "lista-cereri-nesolutionate-201920",
            numberOfColumns: 3,
            // 'columns' property is optional
            columns: [
                {
                    inputOrder: 1,
                    name: "prenume",
                    outputOrder: 3
                },
                {
                    inputOrder: 2,
                    name: "nume",
                    outputOrder: 2
                },
                {
                    inputOrder: 3,
                    name: "nrcrt",
                    outputOrder: 1
                }
            ],
            ignoreFirstItemsOnFirstPage: 8,

            ignoreFirstItemsOnOtherPages: 7,
            ignoreLastItemsOnOtherPages: 2,

            ignoreLastItemsOnLastPage: 4
        }
    ];
    return models.find(x => x.modelId === pdfId);
};

const getPageText = async (pageNumber, pdfDocument) => {
    const page = await pdfDocument.getPage(pageNumber);

    // const opList = await page.getOperatorList();
    const viewport = page.getViewport(1);
    // console.log(viewport);

    const content = await page.getTextContent();
    const strings = content.items.map(x => {
        x.objTransformed = pdfLib.Util.transform(viewport.transform, x.transform); // https://github.com/mozilla/pdf.js/issues/8599
        return { str: x.str, x: x.objTransformed[4], y: x.objTransformed[5], width: x.width, height: x.height };
    });
    return { pageNumber, text: strings, viewport };
};

const getPageText2 = async (pageNumber, pdfDocument) => {
    const page = await pdfDocument.getPage(pageNumber);
    const content = await page.getTextContent();
    const strings = content.items;

    const viewport = page.getViewport(1);
    const text2 = content.items.map(x => {
        x.objTransformed = pdfLib.Util.transform(viewport.transform, x.transform); // https://github.com/mozilla/pdf.js/issues/8599
        return x;
    });

    return { pageNumber, text: strings, viewport, text2 };
};

const getAllLineItems = (pages, model) => {
    const allLineItems = [];
    pages.forEach((page, pageIdx, thesePages) => {
        const isFirstPage = pageIdx === 0;
        const isLastPage = pageIdx + 1 === thesePages.length;

        let startIdx;
        let endIdx;
        if (isFirstPage && isLastPage) {
            // first and last page at the same time
            startIdx = model.ignoreFirstItemsOnFirstPage;
            endIdx = page.text.length - model.ignoreLastItemsOnLastPage - 1;
        } else if (isFirstPage) {
            // first but not last page
            startIdx = model.ignoreFirstItemsOnFirstPage;
            endIdx = page.text.length - model.ignoreLastItemsOnOtherPages - 1;
        } else if (isLastPage) {
            // last but not first page
            startIdx = model.ignoreFirstItemsOnOtherPages;
            endIdx = page.text.length - model.ignoreLastItemsOnLastPage - 1;
        } else {
            // neither first nor last page
            startIdx = model.ignoreFirstItemsOnOtherPages;
            endIdx = page.text.length - model.ignoreLastItemsOnOtherPages - 1;
        }

        for (let i = startIdx; i <= endIdx; i++) {
            allLineItems.push(page.text[i]);
        }
    });

    return allLineItems;
};

const getParsedLines = (allLineItems, model) => {
    const allRows = [];
    const itemsLength = allLineItems.length;
    for (let i = 0; i < itemsLength; ) {
        const row = {};
        for (let j = 1; j <= model.numberOfColumns; j++) {
            row[`col${j}`] = allLineItems[i];
            i++;
        }
        allRows.push(row);
    }

    return allRows;
};

const getFormatedLines = (parsedLines, model) => {
    const newColumns = model.columns
        .filter(x => !x.ignoreAsOutput)
        .sort((a, b) => (a.outputOrder < b.outputOrder ? -1 : 1));

    return parsedLines.map(row => {
        return newColumns.reduce((acc, crt) => {
            const newColName = crt.name ? crt.name : `col${crt.inputOrder}`; // keep old name if not specified
            acc[newColName] = row[`col${crt.inputOrder}`];
            return acc;
        }, {});
    });
};
