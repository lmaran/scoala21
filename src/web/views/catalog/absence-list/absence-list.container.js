import { component } from "/views/catalog/absence-list/absence-list.template.js";

export const absenceListContainer = {
    init: (store, eventHandlers) => {
        const renderComponent = () => {
            const state = store.getState();

            const props = { ...mapStateToProps(state), ...mapDispatchToProps(eventHandlers) };

            const container = getOutputContainer(props.subjectId);
            component.render(props, container);
        }

        store.subscribe(renderComponent);
    }
}


//
//  ************ helpers ************
//
const getOutputContainer = subjectId => {
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
