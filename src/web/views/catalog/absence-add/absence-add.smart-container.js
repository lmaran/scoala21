import { getEventHandlers } from "/views/catalog/absence-add/absence-add.smart-event-handlers.js";
import { eventBinders } from "/views/catalog/absence-add/absence-add.dumb-event-binders.js";
import { component } from "/views/catalog/absence-add/absence-add.dumb-component.js";
import { renderController } from "/views/catalog/absence-add/absence-add.smart-render-controller.js";

export const absenceAddContainer = {
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
