import { components } from "/views/catalog/catalog.components.js";

export const renderController = {
    init: store => {
        const renderComponent = () => {
            const state = store.getState();

            const selectedSubjectId = state.selectedSubjectId;

            // render absence
            const absenceData = { ...getAbsenceData(state) };
            const absenceDomContainer = getAbsenceDomContainer(selectedSubjectId);
            components.renderAbsence(absenceData, absenceDomContainer);
        };

        store.subscribe(renderComponent);
    }
};

//
//  ************ Absence-helpers ************
//

const getAbsenceDomContainer = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".absences-container");
};

const getAbsenceData = state => ({
    absences: state.subjectsObj[state.selectedSubjectId].absences,
    isAddAbsenceExpanded: state.subjectsObj[state.selectedSubjectId].isAddAbsenceExpanded
});
