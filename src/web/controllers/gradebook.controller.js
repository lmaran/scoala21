const gradebookService = require("../services/gradebook.service");
const dateTimeHelper = require("../../shared/helpers/date-time.helper");
const numberHelper = require("../../shared/helpers/number.helper");

exports.createGradebookItem = async (req, res) => {
    const gradebookItem = req.body;

    // console.log(gradebookItem);
    gradebookItem.createdOn = new Date();

    const response = await gradebookService.insertOne(gradebookItem);
    const createdItem = response.ops[0];
    const createdItemWithRelevantFields = {
        id: createdItem._id,
        value: createdItem.value
    };

    if (createdItem.date) {
        createdItemWithRelevantFields.date = createdItem.date; // 2019-03-04
        createdItemWithRelevantFields.friendlyDate = dateTimeHelper.getMonthAndDayFomString(createdItem.date); // 04-Mar
    }

    if (createdItem.type === "semestrialAverage") {
        createdItemWithRelevantFields.valueAsText = numberHelper.getValueAsText(createdItem.value); // "zece"
    }

    res.status(201).json(createdItemWithRelevantFields);
};

exports.createAbsences = async (req, res) => {
    const absencesObj = req.body;
    const absences = absencesObj.absences.reduce((acc, crt) => {
        acc.push({
            academicYear: absencesObj.academicYear,
            semester: absencesObj.semester,
            class: absencesObj.class,
            student: absencesObj.student,
            subject: absencesObj.subject,
            type: crt.type,
            date: crt.date,
            createdOn: new Date(),
            ...(crt.isExcused && { isExcused: true }) // add isExcused property (with value = true) only if crt.isExcused = true -->  https://stackoverflow.com/a/40560953
        });
        return acc;
    }, []);

    const response = await gradebookService.insertMany(absences);
    const createdAbsences = response.ops;
    const createdAbsencesWithRelevantFields = createdAbsences.map(x => ({
        id: x._id,
        date: x.date, // 2019-03-04
        friendlyDate: dateTimeHelper.getMonthAndDayFomString(x.date), // 04-Mar
        isExcused: x.isExcused
    }));
    res.status(201).json(createdAbsencesWithRelevantFields);
};

exports.deleteGradebookItem = async (req, res) => {
    const gradebookItemId = req.params.id;
    await gradebookService.deleteOneById(gradebookItemId);
    // res.send("ok");
    res.status(204).send(); // or res.sendStatus(204)
};

exports.excuseAbsence = async (req, res) => {
    const absenceId = req.params.id;
    await gradebookService.updateOneSetFields(absenceId, { isExcused: true });
    // console.log("response:");
    // console.log(response);
    // "200 ok" for successful PUT. No response body needed
    res.status(200).send(); // or res.sendStatus(200)

    // TODO: treat also other response codes: https://stackoverflow.com/a/827045
    // "409 Conflict" for a PUT that is unsuccessful due to a 3rd-party modification, with a list of differences
    // between the attempted update and the current resource in the response body

    // "400 Bad Request" for an unsuccessful PUT, with text in the response body that explains why the PUT failed
};
