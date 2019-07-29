import { components } from "../gradebook/gradebook.components.js";

export const renderController = {
    init: store => {
        const renderComponent = () => {
            const state = store.getState();

            const selectedSubjectId = state.selectedSubjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            // render Absences
            if (!selectedSubject.isEducationalClass) {
                // ignore for "Dirigentie"
                const absenceData = { ...getAbsenceData(state) };
                const absenceDomContainer = getAbsenceDomContainer(selectedSubjectId);
                components.renderAbsence(absenceData, absenceDomContainer);
            }

            // render Marks
            if (!selectedSubject.isEducationalClass) {
                // ignore for "Dirigentie"
                const markData = { ...getMarkData(state) };
                const markDomContainer = getMarkDomContainer(selectedSubjectId);
                components.renderMark(markData, markDomContainer);
            }

            // render Semestrial Test Paper
            if (!selectedSubject.isEducationalClass && selectedSubject.hasSemestrialTestPaper) {
                // ignore for "Dirigentie" or for subjects without Semestrial Test Paper
                const semestrialTestPaperData = { ...getSemestrialTestPaperData(state) };
                const semestrialTestPaperDomContainer = getSemestrialTestPaperDomContainer(selectedSubjectId);
                components.renderSemestrialTestPaper(semestrialTestPaperData, semestrialTestPaperDomContainer);
            }

            // render Semestrial Average
            const semestrialAverageData = { ...getSemestrialAverageData(state) };
            const semestrialAverageDomContainer = getSemestrialAverageDomContainer(selectedSubjectId);
            components.renderSemestrialAverage(semestrialAverageData, semestrialAverageDomContainer);
        };

        store.subscribe(renderComponent);
    }
};

//
//  ************ Absence ***********************************************************************
//
const getAbsenceDomContainer = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".absences-container");
};

const getAbsenceData = state => ({
    absences: state.subjectsObj[state.selectedSubjectId].absences,
    addAbsenceIsExpanded: state.subjectsObj[state.selectedSubjectId].addAbsenceIsExpanded,
    addAbsenceIsInProgress: state.subjectsObj[state.selectedSubjectId].addAbsenceIsInProgress
});

//
//  ************ Mark ***********************************************************************
//
const getMarkDomContainer = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".marks-container");
};

const getMarkData = state => ({
    marks: state.subjectsObj[state.selectedSubjectId].marks,
    addMarkIsExpanded: state.subjectsObj[state.selectedSubjectId].addMarkIsExpanded,
    addMarkIsInProgress: state.subjectsObj[state.selectedSubjectId].addMarkIsInProgress
});

//
//  ************ Semestrial TestPaper *********************************************************
//
const getSemestrialTestPaperDomContainer = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".semestrial-test-paper-container");
};

const getSemestrialTestPaperData = state => ({
    semestrialTestPaper: state.subjectsObj[state.selectedSubjectId].semestrialTestPaper,
    addSemestrialTestPaperIsExpanded: state.subjectsObj[state.selectedSubjectId].addSemestrialTestPaperIsExpanded,
    addSemestrialTestPaperIsInProgress: state.subjectsObj[state.selectedSubjectId].addSemestrialTestPaperIsInProgress
});

//
//  ************ Semestrial Average *********************************************************
//
const getSemestrialAverageDomContainer = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".semestrial-average-container");
};

const getSemestrialAverageData = state => ({
    semestrialAverage: state.subjectsObj[state.selectedSubjectId].semestrialAverage,
    addSemestrialAverageIsExpanded: state.subjectsObj[state.selectedSubjectId].addSemestrialAverageIsExpanded,
    addSemestrialAverageIsInProgress: state.subjectsObj[state.selectedSubjectId].addSemestrialAverageIsInProgress
});
