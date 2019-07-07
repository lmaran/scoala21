import { initHbsEventBinders } from "/views/catalog/catalog.hbs-event-binders.js";
import { initAbsenceListHbsEventBinders } from "/views/catalog/absence-list/absence-list.hbs-event-binders.js";

import { render } from "/views/catalog/containers/absence-add.container.js";
import { render as renderAbsenceList } from "/views/catalog/absence-list/absence-list.container.js";
import store from "/views/catalog/store/store.js";
// import { configStore } from "/views/catalog/store/store.js";

// this initialization code is executed only once (by the first module which need it)
// const initialState = {
//     ui: {} // keep ui-specific state in a dedicated section
// };
// const store = configStore(initialState);

// const state = store.getState();
// console.log("initial state:");
// console.log(state);

initHbsEventBinders(store);
initAbsenceListHbsEventBinders(store);

// init(store);

function renderAll() {
    // const state = store.getState();
    // console.log("renderAll:");
    // console.log(store);
    render(store);
    renderAbsenceList(store);
}

// const renderAll = store => render(store);

store.subscribe(renderAll);
