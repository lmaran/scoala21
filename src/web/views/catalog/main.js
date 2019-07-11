import { createStore } from "/lib/redux/store.js";
import { reducer } from "/views/catalog/catalog.reducer.js";

import { getEventHandlers } from "/views/catalog/catalog.event-handlers.js";
import { eventBinders } from "/views/catalog/catalog.event-binders.js";
import { components } from "/views/catalog/catalog.components.js";
import { renderController } from "/views/catalog/catalog.render-controller.js";

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
components.init(eventHandlers);

// init the OUTPUT part of the container
renderController.init(store);
