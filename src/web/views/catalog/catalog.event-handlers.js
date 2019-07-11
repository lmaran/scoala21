export const getEventHandlers = store => {
    //
    //  ************ Absence-add ************
    //
    const test = event => {
        const subjectContainer = event.target.closest(".subject-container");
        alert("bbb-111 " + subjectContainer.id);
    };

    const expandAddAbsenceClickHandler = event => {
        const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors
        store.dispatch({ type: "EXPAND_ADD_ABSENCE", subjectId: subjectContainer.id });
    };

    //
    // ************ Absence-list ************
    //
    const deleteAbsenceClickHandler = event => {
        const absenceId = event.target.closest("li").id;
        store.dispatch({ type: "DELETE_ABSENCE", absenceId: absenceId });
    };

    const excuseAbsenceClickHandler = event => {
        const absenceId = event.target.closest("li").id;
        store.dispatch({ type: "EXCUSE_ABSENCE", absenceId: absenceId });
    };

    return {
        test,
        expandAddAbsenceClickHandler,

        deleteAbsenceClickHandler,
        excuseAbsenceClickHandler
    };
};
