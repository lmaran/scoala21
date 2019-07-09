import { component } from "/views/catalog/absence-list/absence-list.dumb-component.js";

export const renderController = {
    init: store => {
        const renderComponent = () => {
            const state = store.getState();

            // const props = { ...mapStateToProps(state), ...mapDispatchToProps(eventHandlers) };
            const data = { ...mapStateToProps(state) };

            const domElement = getDomElement(data.subjectId);
            component.render(data, domElement);
        };

        store.subscribe(renderComponent);
    }
};

//
//  ************ helpers ************
//
const getDomElement = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".absence-list-container");
};

// set INPUT data for the component (from state)
const mapStateToProps = state => ({
    subjectId: state.ui.selectedSubjectId,
    absences: state.absences
});

// set OUTPUT data for the component (event handlers)
// const mapDispatchToProps = eventHandlers => ({
//     deleteAbsenceClickHandler: eventHandlers.deleteAbsenceClickHandler,
//     excuseAbsenceClickHandler: eventHandlers.excuseAbsenceClickHandler
// });
