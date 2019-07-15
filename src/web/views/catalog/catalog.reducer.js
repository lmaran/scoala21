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

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: { ...selectedSubject, isAddAbsenceExpanded: false }
                },
                selectedSubjectId
            };
            // console.log("nextState:");
            // console.log(nextState.subjectsObj);
        }
        case "DELETE_ABSENCE": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];
            const selectedAbsences = selectedSubject.absences;

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: {
                        ...selectedSubject,
                        absences: selectedAbsences && selectedAbsences.filter(x => x.id !== action.absenceId)
                    }
                },
                selectedSubjectId
            };
        }
        case "EXCUSE_ABSENCE": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            selectedSubject.absences.forEach(x => {
                if (x.id === action.absenceId) {
                    x.isExcused = true;
                }
            });

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: {
                        ...selectedSubject,
                        absences: selectedSubject.absences
                    }
                },
                selectedSubjectId
            };
        }
        case "SAVE_ABSENCES_REQUEST": {
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
