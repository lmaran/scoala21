import store from "/views/catalog/store/store.js";

export const expandAddAbsenceClickHandler = event => {
    const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors

    store.dispatch({ type: "EXPAND_ADD_ABSENCE", subjectId: subjectContainer.id });
};

export const test = event => {
    // const state = store.getState();
    // console.log(state);

    const subjectContainer = event.target.closest(".subject-container");
    alert("aaa " + subjectContainer.id);
};
