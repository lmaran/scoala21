// ui event binders (attach events to DOM elements that come from server, via handlebar)
export const eventBinders = {
    init: eventHandlers => {
        //
        //  ************ Absence-add ************
        //
        const expandAddAbsenceBtns = document.getElementsByClassName("expand-add-absence-btn");
        for (const expandAddAbsenceBtn of expandAddAbsenceBtns) {
            expandAddAbsenceBtn.addEventListener("click", eventHandlers.expandAddAbsenceClickHandler);
        }

        //
        // ************ Absence-list ************
        //
        const deleteButtons = document.getElementsByClassName("delete-btn");
        for (const deleteButton of deleteButtons) {
            deleteButton.addEventListener("click", eventHandlers.deleteAbsenceClickHandler);
        }

        const excuseButtons = document.getElementsByClassName("excuse-btn");
        for (const excuseButton of excuseButtons) {
            excuseButton.addEventListener("click", eventHandlers.excuseAbsenceClickHandler);
        }
    }
};
