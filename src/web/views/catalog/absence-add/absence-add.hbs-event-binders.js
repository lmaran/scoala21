import { getEventHandlers } from "/views/catalog/absence-add/absence-add.event-handlers.js";

// ui event binders (attach events to DOM elements)
export const initAbsenceAddHbsEventBinders = store => {
    const handlers = getEventHandlers(store);

    const expandAddAbsenceBtns = document.getElementsByClassName("expand-add-absence-btn");
    for (const expandAddAbsenceBtn of expandAddAbsenceBtns) {
        expandAddAbsenceBtn.addEventListener("click", handlers.expandAddAbsenceClickHandler);
    }
};
