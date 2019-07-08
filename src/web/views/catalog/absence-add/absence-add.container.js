import { eventBinders } from "/views/catalog/absence-add/absence-add.hbs-event-binders.js";
import { getAbsenceAddEventHandlers } from "/views/catalog/absence-add/absence-add.event-handlers.js";
import { component } from "/views/catalog/absence-add/absence-add.template.js";

export const absenceAddContainer = {
    init: store => {
        const eventHandlers = getAbsenceAddEventHandlers(store);

        // init event binders - initial all events come from server rendered html (.hbs file)
        eventBinders.init(eventHandlers);

        const renderComponent = () => {
            const state = store.getState();

            const props = { ...mapStateToProps(state), ...mapDispatchToProps(eventHandlers) };

            const domContainer = getDomContainer(props.subjectId);
            component.render(props, domContainer);
        };

        store.subscribe(renderComponent);
    }
};

//
//  ************ helpers ************
//
const getDomContainer = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".absence-create-container");
};

// set INPUT data for the component (from state)
const mapStateToProps = state => ({
    subjectId: state.ui.selectedSubjectId
});

// set OUTPUT data for the component (event handlers)
const mapDispatchToProps = eventHandlers => ({
    test: eventHandlers.test
});
