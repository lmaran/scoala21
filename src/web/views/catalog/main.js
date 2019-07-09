import { createStore } from "/lib/redux/store.js";
import { reducer } from "/views/catalog/catalog.reducer.js";

// get containers
import { absenceAddContainer } from "/views/catalog/absence-add/absence-add.smart-container.js";
import { absenceListContainer } from "/views/catalog/absence-list/absence-list.smart-container.js";

// keep ui-specific state in a dedicated section
const initialState = {
    ui: {},
    counter: 0
};

const store = createStore(reducer, initialState);

// init containers
absenceAddContainer.init(store);
absenceListContainer.init(store);
