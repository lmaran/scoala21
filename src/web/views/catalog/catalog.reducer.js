export const reducer = (state, action) => {
    switch (action.type) {
        //
        //  ************ Absence ***********************************************************************
        //
        case "EXPAND_ADD_ABSENCE": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: { ...selectedSubject, addAbsenceIsExpanded: true }
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
                    [selectedSubjectId]: { ...selectedSubject, addAbsenceIsExpanded: false }
                },
                selectedSubjectId
            };
        }
        case "DELETE_ABSENCE_REQUEST": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            selectedSubject.absences.forEach(x => {
                if (x.id === action.absenceId) {
                    x.deleteAbsenceIsInProgress = true;
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
        case "DELETE_ABSENCE_SUCCESS": {
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
        case "EXCUSE_ABSENCE_REQUEST": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            selectedSubject.absences.forEach(x => {
                if (x.id === action.absenceId) {
                    x.excuseAbsenceIsInProgress = true;
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
        case "EXCUSE_ABSENCE_SUCCESS": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            selectedSubject.absences.forEach(x => {
                if (x.id === action.absenceId) {
                    x.isExcused = true;
                    x.excuseAbsenceIsInProgress = false;
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
        case "EXCUSE_ABSENCE_FAILURE": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            selectedSubject.absences.forEach(x => {
                if (x.id === action.absenceId) {
                    x.excuseAbsenceIsInProgress = false;
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

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: { ...selectedSubject, addAbsenceIsInProgress: true }
                },
                selectedSubjectId
            };
        }

        case "SAVE_ABSENCES_SUCCESS": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];
            const absences = [...(selectedSubject.absences || []), ...action.createdAbsences].sort(
                (a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0) // sort by date, asc
            );

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: {
                        ...selectedSubject,
                        addAbsenceIsInProgress: false,
                        absences
                    }
                },
                selectedSubjectId
            };
        }

        //
        //  ************ Mark ***********************************************************************
        //
        case "EXPAND_ADD_MARK": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: { ...selectedSubject, addMarkIsExpanded: true }
                },
                selectedSubjectId
            };
        }

        case "COLLAPSE_ADD_MARK": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: { ...selectedSubject, addMarkIsExpanded: false }
                },
                selectedSubjectId
            };
        }

        case "SAVE_MARK_REQUEST": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: { ...selectedSubject, addMarkIsInProgress: true }
                },
                selectedSubjectId
            };
        }

        case "SAVE_MARK_SUCCESS": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];
            const marks = [...(selectedSubject.marks || []), action.createdMark].sort(
                (a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0) // sort by date, asc
            );

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: {
                        ...selectedSubject,
                        addMarkIsInProgress: false,
                        marks
                    }
                },
                selectedSubjectId
            };
        }

        case "DELETE_MARK_REQUEST": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            selectedSubject.marks.forEach(x => {
                if (x.id === action.markId) {
                    x.deleteMarkIsInProgress = true;
                }
            });

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: {
                        ...selectedSubject,
                        marks: selectedSubject.marks
                    }
                },
                selectedSubjectId
            };
        }
        case "DELETE_MARK_SUCCESS": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];
            const selectedMarks = selectedSubject.marks;

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: {
                        ...selectedSubject,
                        marks: selectedMarks && selectedMarks.filter(x => x.id !== action.markId)
                    }
                },
                selectedSubjectId
            };
        }

        //
        //  ************ Semestrial Test Paper ************************************************************
        //
        case "EXPAND_ADD_SEMESTRIAL_TEST_PAPER": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: { ...selectedSubject, addSemestrialTestPaperIsExpanded: true }
                },
                selectedSubjectId
            };
        }

        case "COLLAPSE_ADD_SEMESTRIAL_TEST_PAPER": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: { ...selectedSubject, addSemestrialTestPaperIsExpanded: false }
                },
                selectedSubjectId
            };
        }
        case "SAVE_SEMESTRIAL_TEST_PAPER_REQUEST": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: { ...selectedSubject, addSemestrialTestPaperIsInProgress: true }
                },
                selectedSubjectId
            };
        }

        case "SAVE_SEMESTRIAL_TEST_PAPER_SUCCESS": {
            const selectedSubjectId = action.subjectId;
            const selectedSubject = state.subjectsObj[selectedSubjectId];
            const semestrialTestPaper = action.createdSemestrialTestPaper;

            return {
                ...state,
                subjectsObj: {
                    ...state.subjectsObj,
                    [selectedSubjectId]: {
                        ...selectedSubject,
                        addSemestrialTestPaperIsExpanded: false,
                        addSemestrialTestPaperIsInProgress: false,
                        semestrialTestPaper
                    }
                },
                selectedSubjectId
            };
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
