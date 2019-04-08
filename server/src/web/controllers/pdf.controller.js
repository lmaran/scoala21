const pdfLib = require("pdfjs-dist");

exports.getTextFromPdf = async (req, res) => {
    // inspiration: https://github.com/mozilla/pdf.js/blob/master/examples/node/getinfo.js
    // const pdfId = req.params.pdfId;
    const pdfUrl = "https://scoala21.blob.core.windows.net/share/lista-copii-admisi-201920.pdf";
    const result = {};

    const pdfDocument = await pdfLib.getDocument(pdfUrl);
    result.numberOfPages = pdfDocument.numPages;

    // get info / metadata
    const pdfData = await pdfDocument.getMetadata();
    result.info = pdfData.info;
    if (pdfData.metadata) {
        result.metadata = pdfData.metadata.getAll();
    }

    // get text
    const pagesPromises = [];
    for (let i = 1; i <= pdfDocument.numPages; i++) {
        pagesPromises.push(getPageText(i, pdfDocument));
    }
    result.pages = await Promise.all(pagesPromises);

    res.send(result);
}

const getPageText = async (pageNumber, pdfDocument) => {
    const page = await pdfDocument.getPage(pageNumber);
    const content = await page.getTextContent();
    const strings = content.items.map(x => x.str);
    return { pageNumber, text: strings };
}