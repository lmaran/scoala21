export const reducer = (state, action) => {
    // console.log("action:");
    // console.log(action);
    switch (action.type) {
        case "EXPAND_ADD_ABSENCE": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: { ...selectedSubject, isAddAbsenceExpanded: true }
                },
                selectedSubjectId
            };
        }
        case "COLLAPSE_ADD_ABSENCE": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            const nextState = {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: { ...selectedSubject, isAddAbsenceExpanded: false }
                },
                selectedSubjectId
            };
            // console.log("nextState:");
            // console.log(nextState.subjectsObj);
            return nextState;
        }
        case "DELETE_ABSENCE": {
            // const subjectId = getSubjectIdByAbsenceId(action.absenceId);

            // const absences = getAbsencesBySubjectId(subjectId)
            //     .filter(x => x.itemId !== action.absenceId)
            //     .map(x => x); // immutable

            // // update main data
            // state.subjectsObj.find(x => x.subject.id === subjectId).absences = absences;

            // const nextState = {
            //     ...state,
            //     ui: { ...state.ui, isAddAbsenceExpanded: false, selectedSubjectId: subjectId },
            //     absences,
            //     counter: ++state.counter
            // };
            // return nextState;
            return state;
        }
        case "EXCUSE_ABSENCE": {
            // const subjectId = getSubjectIdByAbsenceId(action.absenceId);

            // const absences = getAbsencesBySubjectId(subjectId)
            //     // .filter(x => x.itemId !== action.absenceId)
            //     .map(x => x); // immutable

            // // update main data
            // state.subjectsObj.find(x => x.subject.id === subjectId).absences = absences;

            // const nextState = {
            //     ...state,
            //     ui: { ...state.ui, isAddAbsenceExpanded: false, selectedSubjectId: subjectId },
            //     absences,
            //     counter: ++state.counter
            // };
            // return nextState;
            return state;
        }
        case "SAVE_ABSENCES": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];
            const newAbsences = action.absences;

            const nextState = {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: {
                        ...selectedSubject,
                        absences: [...(selectedSubject.absences || []), ...newAbsences]
                    }
                },
                selectedSubjectId
            };
            // console.log("nextState:");
            // console.log(nextState.subjectsObj);
            return nextState;
        }
        default:
            return state;
    }
};

// function getSubjectIdByAbsenceId(absenceId) {
//     let subjectId = null;
//     uiData.allSubjects.some(subject => {
//         const found = subject.absences && subject.absences.find(x => x.itemId === absenceId);
//         if (found) {
//             subjectId = subject.subject.id;
//             return true;
//             // return subject.subject.id;
//         }
//     });
//     return subjectId;
// }

// function getAbsencesBySubjectId(subjectId) {
//     // console.log("subjectId: " + subjectId);
//     const subject = uiData.allSubjects.find(x => x.subject.id === subjectId);
//     return subject.absences;
// }
