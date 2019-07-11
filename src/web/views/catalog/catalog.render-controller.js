import { absenceAddComponent } from "/views/catalog/components/absence-add.component.js";
import { absenceListComponent } from "/views/catalog/components/absence-list.component.js";

export const renderController = {
    init: store => {
        const renderComponent = () => {
            const state = store.getState();

            // const props = { ...mapStateToProps(state), ...mapDispatchToProps(eventHandlers) };

            // render absenceAdd
            const data = { ...mapStateToProps(state) };
            const domElement = getDomElement(data.subjectId);
            absenceAddComponent.render(data, domElement);

            // render absenceList
            const data2 = { ...mapStateToProps2(state) };
            const domElement2 = getDomElement2(data.subjectId);
            absenceListComponent.render(data2, domElement2);
        };

        store.subscribe(renderComponent);
    }
};

//
//  ************ helpers ************
//
const getDomElement = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".absence-create-container");
};

// set INPUT data for the component (from state)
const mapStateToProps = state => ({
    subjectId: state.ui.selectedSubjectId
});


const getDomElement2 = subjectId => {
    const subjectContainer = document.getElementById(subjectId);
    return subjectContainer.querySelector(".absence-list-container");
};

// set INPUT data for the component (from state)
const mapStateToProps2 = state => ({
    subjectId: state.ui.selectedSubjectId,
    absences: state.absences
});