import { components } from "/views/catalog/catalog.components.js";

export const renderController = {
    init: store => {
        const renderComponent = () => {
            const state = store.getState();

            // render absenceAdd
            const absenceAddData = { ...getAbsenceAddData(state) };
            const absenceAddDomContainer = getAbsenceAddDomContainer(state.ui.selectedSubjectId);
            components.renderAbsenceAdd(absenceAddData, absenceAddDomContainer);

            // render absenceList
            const absenceListData = { ...getAbsenceListData(state) };
            const absenceListDomContainer = getAbsenceListDomContainer(state.ui.selectedSubjectId);
            components.renderAbsenceList(absenceListData, absenceListDomContainer);
        };

        store.subscribe(renderComponent);
    }
};

//
//  ************ helpers (mapStateToProps, getDomContainers etc ) ************
//
//  ************ Absence-add ************
//

const getAbsenceAddDomContainer = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".absence-add-container");
};

const getAbsenceAddData = state => ({
    // mapStateToProps
    subjectId: state.ui.selectedSubjectId
});

//
//  ************ Absence-list ************
//

const getAbsenceListDomContainer = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".absence-list-container");
};

const getAbsenceListData = state => ({
    subjectId: state.ui.selectedSubjectId,
    absences: state.absences
});
