import { renderComponent } from "/views/catalog/components/absence-add.template.js";

import { getEventHandlers } from "/views/catalog/catalog.hbs-event-handlers.js";

// 1. INPUT = Actions(events)
// import store from "/views/catalog/store/store.js";

// const test = event => {
//     // const state = store.getState();
//     // console.log(state);

//     const subjectContainer = event.target.closest(".subject-container");
//     alert("aaa " + subjectContainer.id);
// };

// export const expandAddAbsenceClickHandler = event => {
//     const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors

//     store.dispatch({ type: "EXPAND_ADD_ABSENCE", subjectId: subjectContainer.id });
// };

// // 2. OUTPUT = renders(state)
// export const init = store => {
//     const test = (event, store) => {
//         const state = store.getState();
//         console.log(state);

//         const subjectContainer = event.target.closest(".subject-container");
//         alert("aaa " + subjectContainer.id);
//     };

//     const expandAddAbsenceClickHandler = event => {
//         const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors

//         store.dispatch({ type: "EXPAND_ADD_ABSENCE", subjectId: subjectContainer.id });
//     };

//     const expandAddAbsenceBtns = document.getElementsByClassName("expand-add-absence-btn");
//     for (const expandAddAbsenceBtn of expandAddAbsenceBtns) {
//         expandAddAbsenceBtn.addEventListener("click", expandAddAbsenceClickHandler);
//     }

//     // return {
//     //     test
//     // };
// };

export const render = store => {
    const handlers = getEventHandlers(store);

    const state = store.getState();

    // console.log("state in absence-add-render:");
    // console.log(state);

    const props = {
        subjectId: state.ui.selectedSubjectId,
        test: handlers.test
    };

    if (state.ui.selectedSubjectId && state.ui.isAddAbsenceExpanded) {
        renderAbsenceAddContainer(props);
    }
    if (!state.ui.isAddAbsenceExpanded && state.ui.selectedSubjectId) {
        renderAbsenceAddContainer(props);
    }
};

export const renderAbsenceAddContainer = props => {
    // console.log("props in absence-add-component:");
    // console.log(props);
    const subjectContainer = document.getElementById(props.subjectId);
    const absenceCreateContainer = subjectContainer.querySelector(".absence-create-container");

    renderComponent(props, absenceCreateContainer);
};
