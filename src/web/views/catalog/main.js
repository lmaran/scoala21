import { createStore } from "/lib/redux/store.js";
import { reducer } from "/views/catalog/catalog.reducer.js";

import { initAbsenceAddHbsEventBinders } from "/views/catalog/absence-add/absence-add.hbs-event-binders.js";
import { renderAbsenceAdd } from "/views/catalog/absence-add/absence-add.container.js";

import { initAbsenceListHbsEventBinders } from "/views/catalog/absence-list/absence-list.hbs-event-binders.js";
import { renderAbsenceList } from "/views/catalog/absence-list/absence-list.container.js";

const initialState = {
    ui: {}, // keep ui-specific state in a dedicated section
    counter: 0
};

const store = createStore(reducer, initialState);

initAbsenceAddHbsEventBinders(store);
initAbsenceListHbsEventBinders(store);

function renderContainers() {
    renderAbsenceAdd(store);
    renderAbsenceList(store);
}

store.subscribe(renderContainers);
