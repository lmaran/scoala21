import { getEventHandlers } from "/views/catalog/absence-list/absence-list.event-handlers.js";

// ui event binders (attach events to DOM elements)
export const initAbsenceListHbsEventBinders = store => {
    const handlers = getEventHandlers(store);

    const deleteButtons = document.getElementsByClassName("delete-btn");
    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", handlers.deleteAbsenceClickHandler);
    }

    const excuseButtons = document.getElementsByClassName("excuse-btn");
    for (const excuseButton of excuseButtons) {
        excuseButton.addEventListener("click", handlers.excuseAbsenceClickHandler);
    }
};
