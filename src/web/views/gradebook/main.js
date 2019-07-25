import { createStore } from "/lib/redux/store.js";
import { reducer } from "/views/gradebook/gradebook.reducer.js";

import { eventHandlers } from "/views/gradebook/gradebook.event-handlers.js";
import { eventBinders } from "/views/gradebook/gradebook.event-binders.js";
import { components } from "/views/gradebook/gradebook.components.js";
import { renderController } from "/views/gradebook/gradebook.render-controller.js";

const uiStateTemplate = document.getElementById("ui-state");
const initialState = JSON.parse(uiStateTemplate.innerHTML);

// console.log("initialState:");
// console.log(initialState);

const store = createStore(reducer, initialState);
const evHandlers = eventHandlers.getEventHandlers(store);

// init the INPUT  part of the container (initial all events come handlebar DOM elements)
eventBinders.init(evHandlers);

// init components
components.init(evHandlers);

// init the OUTPUT part of the container
renderController.init(store);
