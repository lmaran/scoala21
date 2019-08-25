// ui event binders (attach events to those DOM elements that come from server, via handlebar)
export const eventBinders = {
    init: eventHandlers => {
        //
        //  ************ Absence ************************************************************************************
        //
        const expandAddAbsenceBtns = document.getElementsByClassName("expand-add-absence-btn");
        for (const expandAddAbsenceBtn of expandAddAbsenceBtns) {
            expandAddAbsenceBtn.addEventListener("click", eventHandlers.expandAddAbsence);
        }

        const deleteAbsenceBtns = document.getElementsByClassName("delete-absence-btn");
        for (const deleteAbsenceBtn of deleteAbsenceBtns) {
            deleteAbsenceBtn.addEventListener("click", eventHandlers.deleteAbsence);
        }

        const excuseAbsenceBtns = document.getElementsByClassName("excuse-absence-btn");
        for (const excuseAbsenceBtn of excuseAbsenceBtns) {
            excuseAbsenceBtn.addEventListener("click", eventHandlers.excuseAbsence);
        }

        //
        //  ************ Mark ************************************************************************************
        //
        const expandAddMarkBtns = document.getElementsByClassName("expand-add-mark-btn");
        for (const expandAddMarkBtn of expandAddMarkBtns) {
            expandAddMarkBtn.addEventListener("click", eventHandlers.expandAddMark);
        }

        const deleteMarkBtns = document.getElementsByClassName("delete-mark-btn");
        for (const deleteMarkBtn of deleteMarkBtns) {
            deleteMarkBtn.addEventListener("click", eventHandlers.deleteMark);
        }

        //
        //  ************ Semestrial Test Paper *******************************************************************
        //
        const expandSemestrialTestPaperBtns = document.getElementsByClassName("expand-add-semestrial-test-paper-btn");
        for (const expandSemestrialTestPaperBtn of expandSemestrialTestPaperBtns) {
            expandSemestrialTestPaperBtn.addEventListener("click", eventHandlers.expandAddSemestrialTestPaper);
        }

        const deleteSemestrialTestPaperBtns = document.getElementsByClassName("delete-semestrial-test-paper-btn");
        for (const deleteSemestrialTestPaperBtn of deleteSemestrialTestPaperBtns) {
            deleteSemestrialTestPaperBtn.addEventListener("click", eventHandlers.deleteSemestrialTestPaper);
        }

        //
        //  ************ Semestrial Average ***********************************************************************
        //
        const expandSemestrialAverageBtns = document.getElementsByClassName("expand-add-semestrial-average-btn");
        for (const expandSemestrialAverageBtn of expandSemestrialAverageBtns) {
            expandSemestrialAverageBtn.addEventListener("click", eventHandlers.expandAddSemestrialAverage);
        }

        const deleteSemestrialAverageBtns = document.getElementsByClassName("delete-semestrial-average-btn");
        for (const deleteSemestrialAverageBtn of deleteSemestrialAverageBtns) {
            deleteSemestrialAverageBtn.addEventListener("click", eventHandlers.deleteSemestrialAverage);
        }
    }
};
