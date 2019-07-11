import { createStore } from "/lib/redux/store.js";
import { reducer } from "/views/catalog/catalog.reducer.js";

import { getEventHandlers } from "/views/catalog/catalog.event-handlers.js";
import { eventBinders } from "/views/catalog/catalog.event-binders.js";
import { renderController } from "/views/catalog/catalog.render-controller.js";

// components
import { absenceAddComponent } from "/views/catalog/components/absence-add.component.js";
import { absenceListComponent } from "/views/catalog/components/absence-list.component.js";


// keep ui-specific state in a dedicated section
const initialState = {
    ui: {},
    counter: 0
};

const store = createStore(reducer, initialState);

const eventHandlers = getEventHandlers(store);

// init the INPUT  part of the container (initial all events come handlebar DOM elements)
eventBinders.init(eventHandlers);

// init components
absenceAddComponent.init(eventHandlers);
absenceListComponent.init(eventHandlers);

// init the OUTPUT part of the container
renderController.init(store);
