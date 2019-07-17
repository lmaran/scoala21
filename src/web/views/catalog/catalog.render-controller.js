import { components } from "/views/catalog/catalog.components.js";

export const renderController = {
    init: store => {
        const renderComponent = () => {
            const state = store.getState();

            const selectedSubjectId = state.selectedSubjectId;

            // render Absences
            const absenceData = { ...getAbsenceData(state) };
            const absenceDomContainer = getAbsenceDomContainer(selectedSubjectId);
            components.renderAbsence(absenceData, absenceDomContainer);

            // render Marks
            const markData = { ...getMarkData(state) };
            const markDomContainer = getMarkDomContainer(selectedSubjectId);
            components.renderMark(markData, markDomContainer);

            // render Semestrial Test Paper
            const semestrialTestPaperData = { ...getSemestrialTestPaperData(state) };
            const semestrialTestPaperDomContainer = getSemestrialTestPaperDomContainer(selectedSubjectId);
            components.renderSemestrialTestPaper(semestrialTestPaperData, semestrialTestPaperDomContainer);
        };

        store.subscribe(renderComponent);
    }
};

//
//  ************ Absence-helpers ***********************************************************************
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
//  ************ Mark-helpers ***********************************************************************
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
//  ************ Semestrial TestPaper helpers *********************************************************
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
