import {
    // deleteAbsenceClickHandler,
    // excuseAbsenceClickHandler,
    // addMarkClickHandler,
    // expandAddAbsenceClickHandler,
    getEventHandlers
    // hideAbsenceClickHandler,
    // saveAbsenceClickHandler
    // } from "/views/catalog/containers/ui-event-handlers.container.js";
} from "/views/catalog/catalog.hbs-event-handlers.js";

// ui event binders (attach events to DOM elements)
export const initHbsEventBinders = store => {
    // const addMarkBtns = document.getElementsByClassName("add-mark-btn");
    // for (const addMarkBtn of addMarkBtns) {
    //     addMarkBtn.addEventListener("click", addMarkClickHandler);
    // }

    const handlers = getEventHandlers(store);

    const expandAddAbsenceBtns = document.getElementsByClassName("expand-add-absence-btn");
    for (const expandAddAbsenceBtn of expandAddAbsenceBtns) {
        expandAddAbsenceBtn.addEventListener("click", handlers.expandAddAbsenceClickHandler);
    }

    // const hideAbsenceBtns = document.getElementsByClassName("hide-absence-btn");
    // for (const hideAbsenceBtn of hideAbsenceBtns) {
    //     hideAbsenceBtn.addEventListener("click", hideAbsenceClickHandler);
    // }

    // const saveAbsencesBtns = document.getElementsByClassName("save-absences-btn");
    // for (const saveAbsencesBtn of saveAbsencesBtns) {
    //     saveAbsencesBtn.addEventListener("click", saveAbsenceClickHandler);
    // }

    // const deleteButtons = document.getElementsByClassName("delete-btn");
    // for (const deleteButton of deleteButtons) {
    //     deleteButton.addEventListener("click", deleteAbsenceClickHandler);
    // }

    // const excuseButtons = document.getElementsByClassName("excuse-btn");
    // for (const excuseButton of excuseButtons) {
    //     excuseButton.addEventListener("click", excuseAbsenceClickHandler);
    // }
};
