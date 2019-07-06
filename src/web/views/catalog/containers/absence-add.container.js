import { renderAbsenceCreate } from "/views/catalog/components/absence-add.template.js";

import { expandAddAbsenceClickHandler, test } from "/views/catalog/catalog.hbs-event-handlers.js";

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
    // ---------

    // const expandAddAbsenceClickHandler = event => {
    //     const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors

    //     store.dispatch({ type: "EXPAND_ADD_ABSENCE", subjectId: subjectContainer.id });
    //     alert(123);
    // };

    // -------------

    const state = store.getState();
    // console.log(state);

    // const xxx = init(store);
    // console.log(xxx);
    // const yyy = xxx.init;
    // console.log(yyy);

    const props = {
        subjectId: state.ui.selectedSubjectId,
        test: test
    };

    if (state.ui.selectedSubjectId && state.ui.isAddAbsenceExpanded) {
        renderAddAbsenceContainer(props);
    }
    if (!state.ui.isAddAbsenceExpanded && state.ui.selectedSubjectId) {
        renderAddAbsenceContainer(state.ui.selectedSubjectId);
    }
};

// export const renderAddAbsenceContainer = subjectId => {
//     const subjectContainer = document.getElementById(subjectId);
//     const absenceCreateContainer = subjectContainer.querySelector(".absence-create-container");

//     // const absenceCreateContainer = document.querySelector(`#${subjectId} .absence-create-container`);

//     // event.target.classList.add("disabled");
//     // absenceCreateContainer.style.display = "block";
//     renderAbsenceCreate({}, absenceCreateContainer);
// };

export const renderAddAbsenceContainer = props => {
    const subjectContainer = document.getElementById(props.subjectId);
    const absenceCreateContainer = subjectContainer.querySelector(".absence-create-container");

    renderAbsenceCreate(props, absenceCreateContainer);
};
