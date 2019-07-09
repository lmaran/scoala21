import { getEventHandlers } from "/views/catalog/absence-list/absence-list.smart-event-handlers.js";
import { eventBinders } from "/views/catalog/absence-list/absence-list.dumb-event-binders.js";
import { component } from "/views/catalog/absence-list/absence-list.dumb-component.js";
import { renderController } from "/views/catalog/absence-list/absence-list.smart-render-controller.js";

export const absenceListContainer = {
    init: store => {
        const eventHandlers = getEventHandlers(store);

        // init event binders - initial all events come handlebar DOM elements
        eventBinders.init(eventHandlers);

        // init component
        component.init(eventHandlers);

        // init the OUTPUT part of the container
        renderController.init(store);
    }
};
