import { eventBinders } from "/views/catalog/absence-list/absence-list.hbs-event-binders.js";
import { getAbsenceListEventHandlers } from "/views/catalog/absence-list/absence-list.event-handlers.js";
import { component } from "/views/catalog/absence-list/absence-list.template.js";

export const absenceListContainer = {
    init: store => {
        const eventHandlers = getAbsenceListEventHandlers(store);

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
    return subjectContainer.querySelector(".absence-list-container");
};

// set INPUT data for the component (from state)
const mapStateToProps = state => ({
    subjectId: state.ui.selectedSubjectId,
    absences: state.absences
});

// set OUTPUT data for the component (event handlers)
const mapDispatchToProps = eventHandlers => ({
    deleteAbsenceClickHandler: eventHandlers.deleteAbsenceClickHandler,
    excuseAbsenceClickHandler: eventHandlers.excuseAbsenceClickHandler
});
