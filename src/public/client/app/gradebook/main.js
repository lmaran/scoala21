import { createStore } from "/client/app/helpers/redux.store.js";
import { reducer } from "./gradebook.reducer.js"; // or use an absolute path: "/app/gradebook/gradebook.reducer.js"
import { eventHandlers } from "./gradebook.event-handlers.js";
import { eventBinders } from "./gradebook.event-binders.js";
import { components } from "./gradebook.components.js";
import { renderController } from "./gradebook.render-controller.js";

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
