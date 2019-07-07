import { renderComponent } from "/views/catalog/absence-list/absence-list.template.js";
import { getEventHandlers } from "/views/catalog/absence-list/absence-list.event-handlers.js";

// 1. INPUT = Actions(events)

// 2. OUTPUT = renders(state)

export const render = store => {
    const handlers = getEventHandlers(store);

    const state = store.getState();

    // console.log("state in absence-list-render:");
    // console.log(state);

    const props = {
        subjectId: state.ui.selectedSubjectId,
        absences: state.absences,
        deleteAbsenceClickHandler: handlers.deleteAbsenceClickHandler,
        excuseAbsenceClickHandler: handlers.excuseAbsenceClickHandler
    };

    const container = getAbsenceListContainer(props.subjectId);
    renderComponent(props, container);
};

const getAbsenceListContainer = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".absence-list-container");
};
