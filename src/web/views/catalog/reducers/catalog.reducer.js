// This will be fed into the reducer when the app loads to initialize the state
const getInitialState = () => ({
    // counter: 0
});

const uiDataTemplate = document.getElementById("ui-data");
const uiData = JSON.parse(uiDataTemplate.innerHTML);

export const reducer = (state = getInitialState(), action) => {
    // console.log("action:");
    // console.log(action);
    switch (action.type) {
        case "EXPAND_ADD_ABSENCE": {
            const nextState = {
                ...state,
                ui: { ...state.ui, isAddAbsenceExpanded: true, selectedSubjectId: action.subjectId }
            };
            return nextState;
        }
        case "COLLAPSE_ADD_ABSENCE": {
            const nextState = {
                ...state,
                ui: { ...state.ui, isAddAbsenceExpanded: false, selectedSubjectId: action.subjectId }
            };
            return nextState;
        }
        case "DELETE_ABSENCE": {
            const subjectId = getSubjectIdByAbsenceId(action.absenceId);

            const absences = getAbsencesBySubjectId(subjectId)
                .filter(x => x.itemId !== action.absenceId)
                .map(x => x); // immutable

            // update main data
            uiData.allSubjects.find(x => x.subject.id === subjectId).absences = absences;

            const nextState = {
                ...state,
                ui: { ...state.ui, isAddAbsenceExpanded: false, selectedSubjectId: subjectId },
                absences
            };
            return nextState;
        }
        default:
            return state;
    }
};

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
    // console.log("subjectId: " + subjectId);
    const subject = uiData.allSubjects.find(x => x.subject.id === subjectId);
    return subject.absences;
}
