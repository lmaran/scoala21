import {
    deleteAbsenceClickHandler,
    excuseAbsenceClickHandler,
    addMarkClickHandler,
    showAbsenceClickHandler,
    hideAbsenceClickHandler,
    saveAbsenceClickHandler
} from "/views/student/catalog.ui-event-handlers.js";

// ui event binders (attach events to DOM elements)
export const initHbsEventBinders = () => {
    const addMarkBtns = document.getElementsByClassName("add-mark-btn");
    for (const addMarkBtn of addMarkBtns) {
        addMarkBtn.addEventListener("click", addMarkClickHandler);
    }

    const showAbsenceBtns = document.getElementsByClassName("show-absence-btn");
    for (const showAbsenceBtn of showAbsenceBtns) {
        showAbsenceBtn.addEventListener("click", showAbsenceClickHandler);
    }

    const hideAbsenceBtns = document.getElementsByClassName("hide-absence-btn");
    for (const hideAbsenceBtn of hideAbsenceBtns) {
        hideAbsenceBtn.addEventListener("click", hideAbsenceClickHandler);
    }

    const saveAbsencesBtns = document.getElementsByClassName("save-absences-btn");
    for (const saveAbsencesBtn of saveAbsencesBtns) {
        saveAbsencesBtn.addEventListener("click", saveAbsenceClickHandler);
    }

    const deleteButtons = document.getElementsByClassName("delete-btn");
    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", deleteAbsenceClickHandler);
    }

    const excuseButtons = document.getElementsByClassName("excuse-btn");
    for (const excuseButton of excuseButtons) {
        excuseButton.addEventListener("click", excuseAbsenceClickHandler);
    }
};
