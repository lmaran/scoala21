// This will be fed into the reducer when the app loads to initialize the state
const getInitialState = () => ({
    // counter: 0
});

export const reducer = (state = getInitialState(), action) => {
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
    }
};
