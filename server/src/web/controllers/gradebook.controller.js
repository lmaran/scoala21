const gradebookService = require("../services/gradebook.service");

exports.createGradebookItem = async (req, res) => {
    const gradebookItem = req.body;

    // console.log(gradebookItem);

    gradebookItem.createdOn = new Date();

    const response = await gradebookService.insertOne(gradebookItem);
    const createdItem = response.ops[0];
    res.status(201).json(createdItem);
};
