export const eventHandlers = {
    getEventHandlers: store => ({
        //
        //  ************ Absence-add ************
        //
        test: event => {
            const subjectContainer = event.target.closest(".subject-container");
            alert("bbb-111 " + subjectContainer.id);
        },
        expandAddAbsenceClickHandler: event => {
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors
            store.dispatch({ type: "EXPAND_ADD_ABSENCE", subjectId: subjectContainer.id });
        },
        collapseAddAbsenceClickHandler: event => {
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors
            store.dispatch({ type: "COLLAPSE_ADD_ABSENCE", subjectId: subjectContainer.id });
        },
        saveAbsencesClickHandler: event => {
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors

            const monthLabel = subjectContainer.querySelector(".month-container label.active");
            if (!monthLabel) {
                alert("Selecteaza luna!");
                return false;
            }

            const dayLabels = subjectContainer.querySelectorAll(".day-container label.active");
            if (!dayLabels || dayLabels.length === 0) {
                alert("Selecteaza una sau mai multe zile!");
                return false;
            }

            // convert NodeList into Array
            const dayLabelsArr = Array.from(dayLabels);

            const absences = dayLabelsArr.map(dayLabel => ({
                date: `${dayLabel.innerText}.${monthLabel.innerText}` // ["7.IV", "23.IV"]
            }));

            store.dispatch({ type: "SAVE_ABSENCES", subjectId: subjectContainer.id, absences });
        },

        //
        // ************ Absence-list ************
        //
        deleteAbsenceClickHandler: event => {
            const absenceId = event.target.closest("li").id;
            store.dispatch({ type: "DELETE_ABSENCE", absenceId: absenceId });
        },

        excuseAbsenceClickHandler: event => {
            const absenceId = event.target.closest("li").id;
            store.dispatch({ type: "EXCUSE_ABSENCE", absenceId: absenceId });
        }
    })
};
