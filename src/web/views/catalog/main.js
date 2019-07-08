import { createStore } from "/lib/redux/store.js";
import { reducer } from "/views/catalog/catalog.reducer.js";

// absenceAdd Component
import { absenceAddHbsEventBinders } from "/views/catalog/absence-add/absence-add.hbs-event-binders.js";
import { getAbsenceAddEventHandlers } from "/views/catalog/absence-add/absence-add.event-handlers.js";
import { absenceAddContainer } from "/views/catalog/absence-add/absence-add.container.js";

// absenceList Component
import { absenceListHbsEventBinders } from "/views/catalog/absence-list/absence-list.hbs-event-binders.js";
import { getAbsenceListEventHandlers } from "/views/catalog/absence-list/absence-list.event-handlers.js";
import { absenceListContainer } from "/views/catalog/absence-list/absence-list.container.js";


// keep ui-specific state in a dedicated section
const initialState = {
    ui: {},
    counter: 0
};

const store = createStore(reducer, initialState);

const absenceAddEventHandlers = getAbsenceAddEventHandlers(store);
const absenceListEventHandlers = getAbsenceListEventHandlers(store);

// init event binders - initial all events come from server rendered html (.hbs file)
absenceAddHbsEventBinders.init(absenceAddEventHandlers);
absenceListHbsEventBinders.init(absenceListEventHandlers);

// init containers
absenceAddContainer.init(store, absenceAddEventHandlers);
absenceListContainer.init(store, absenceListEventHandlers);

