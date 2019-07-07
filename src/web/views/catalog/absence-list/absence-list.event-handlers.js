export const getEventHandlers = store => {
    const deleteAbsenceClickHandler = event => {
        const absenceId = event.target.closest("li").id;
        store.dispatch({ type: "DELETE_ABSENCE", absenceId: absenceId });
    };

    const excuseAbsenceClickHandler = event => {
        const absenceId = event.target.closest("li").id;
        store.dispatch({ type: "EXCUSE_ABSENCE", absenceId: absenceId });
    };

    return {
        deleteAbsenceClickHandler,
        excuseAbsenceClickHandler
    };
};
