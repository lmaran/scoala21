const gradebookService = require("../services/gradebook.service");

exports.createGradebookItem = async (req, res) => {
    const gradebookItem = req.body;

    // console.log(gradebookItem);
    gradebookItem.createdOn = new Date();

    const response = await gradebookService.insertOne(gradebookItem);
    const createdItem = response.ops[0];
    res.status(201).json(createdItem);
};

exports.deleteGradebookItem = async (req, res) => {
    const gradebookItemId = req.params.id;
    await gradebookService.deleteOneById(gradebookItemId);
    // res.send("ok");
    res.status(204).send(); // or res.sendStatus(204)
};
