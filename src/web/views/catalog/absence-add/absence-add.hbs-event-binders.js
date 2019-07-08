// ui event binders (attach events to DOM elements)
export const eventBinders = {
    init: eventHandlers => {
        const expandAddAbsenceBtns = document.getElementsByClassName("expand-add-absence-btn");
        for (const expandAddAbsenceBtn of expandAddAbsenceBtns) {
            expandAddAbsenceBtn.addEventListener("click", eventHandlers.expandAddAbsenceClickHandler);
        }
    }
};
