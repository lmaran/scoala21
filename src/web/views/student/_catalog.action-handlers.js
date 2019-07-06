import { renderAbsenceList } from "/views/student/absence-list.template.js";
import eventEmitter from "/views/student/event-emitter.js";

const uiDataTemplate = document.getElementById("ui-data");
const uiData = JSON.parse(uiDataTemplate.innerHTML);

// absence-list actions:
eventEmitter.addEventListener("DELETE_ABSENCE", event => {
    const absenceId = event.detail;
    const subjectId = getSubjectIdByAbsenceId(absenceId);

    let absences = getAbsencesBySubjectId(subjectId)
        .filter(x => x.itemId !== absenceId)
        .map(x => x); // immutable

    // update main data
    uiData.allSubjects.find(x => x.subject.id === subjectId).absences = absences;

    var data = { absences };

    renderAbsenceList(data, subjectId);
});

eventEmitter.addEventListener("EXCUSE_ABSENCE", event => {
    const absenceId = event.detail;
    const subjectId = getSubjectIdByAbsenceId(absenceId);

    let absences = getAbsencesBySubjectId(subjectId)
        // .filter(x => x.itemId !== absenceId)
        .map(x => {
            if (x.itemId === absenceId) {
                x.itemIsExcused = true;
            }
            return x;
        }); // immutable

    // update main data
    uiData.allSubjects.find(x => x.subject.id === subjectId).absences = absences;

    var data = { absences };

    renderAbsenceList(data, subjectId);
});

function getSubjectIdByAbsenceId(absenceId) {
    let subjectId = null;
    uiData.allSubjects.some(subject => {
        const found = subject.absences && subject.absences.find(x => x.itemId === absenceId);
        if (found) {
            subjectId = subject.subject.id;
            return true;
            // return subject.subject.id;
        }
    });
    return subjectId;
}

function getAbsencesBySubjectId(subjectId) {
    // console.log(uiData.allSubjects);
    const subject = uiData.allSubjects.find(x => x.subject.id === subjectId);
    return subject.absences;
}
