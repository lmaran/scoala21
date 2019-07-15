const gradebookService = require("../services/gradebook.service");

exports.createGradebookItem = async (req, res) => {
    const gradebookItem = req.body;

    // console.log(gradebookItem);
    gradebookItem.createdOn = new Date();

    const response = await gradebookService.insertOne(gradebookItem);
    const createdItem = response.ops[0];
    res.status(201).json(createdItem);
};

exports.createAbsences = async (req, res) => {
    // absencesObj signature
    // {
    //     academicYear,
    //     semester,
    //     class,
    //     subject,
    //     type,
    //     isExcused,
    //     absences: [{date}]
    // }
    const absencesObj = req.body;
    const absences = absencesObj.absences.reduce((acc, crt) => {
        acc.push({
            academicYear: absencesObj.academicYear,
            semester: absencesObj.semester,
            class: absencesObj.class,
            student: absencesObj.student,
            subject: absencesObj.subject,
            type: crt.type,
            isExcused: crt.isExcused,
            date: crt.date,
            createdOn: new Date()
        });
        return acc;
    }, []);

    const response = await gradebookService.insertMany(absences);
    const createdItems = response.ops;
    res.status(201).json(createdItems);
};

exports.deleteGradebookItem = async (req, res) => {
    const gradebookItemId = req.params.id;
    await gradebookService.deleteOneById(gradebookItemId);
    // res.send("ok");
    res.status(204).send(); // or res.sendStatus(204)
};
