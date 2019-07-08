// ui event binders (attach events to DOM elements)
export const absenceListHbsEventBinders = {
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
}
