// ui event binders (attach events to DOM elements that come from server, via handlebar)
export const eventBinders = {
    init: eventHandlers => {
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
