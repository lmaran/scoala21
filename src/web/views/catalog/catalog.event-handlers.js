import { createAbsences } from "/views/catalog/catalog.service.js";
export const eventHandlers = {
    getEventHandlers: store => ({
        //
        //  ************ Absence-add ************
        //
        expandAddAbsence: event => {
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors
            store.dispatch({ type: "EXPAND_ADD_ABSENCE", subjectId: subjectContainer.id });
        },
        collapseAddAbsence: event => {
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors
            store.dispatch({ type: "COLLAPSE_ADD_ABSENCE", subjectId: subjectContainer.id });
        },
        saveAbsences: async event => {
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

            const isExcusedInput = subjectContainer.querySelector(".is-excused-input");
            const isExcused = isExcusedInput.checked;

            // convert NodeList into Array
            const dayLabelsArr = Array.from(dayLabels);

            const absences = dayLabelsArr.map(dayLabel => {
                const rez = {
                    date: `${dayLabel.innerText}.${monthLabel.innerText}`, // ["7.IV", "23.IV"]
                    id: `${randomInt(100, 999).toString()}` // some temporary IDs (between 100 and 999)
                };
                if (isExcused) {
                    rez.isExcused = true;
                }
                return rez;
            });

            const state = store.getState();

            const selectedSubjectObj = state.subjectsObj[subjectContainer.id];

            const selectedSubject = {
                id: selectedSubjectObj.id,
                name: selectedSubjectObj.name
            };

            // const data = {
            //     academicYear: state.academicYear,
            //     semester: state.semester,
            //     class: state.class,
            //     student: state.student,
            //     subject: selectedSubject,
            //     type: "absence",
            //     date: "markDate"
            // };

            store.dispatch({ type: "SAVE_ABSENCES_REQUEST", subjectId: subjectContainer.id, absences });
            try {
                const absencesObj = {
                    academicYear: state.academicYear,
                    semester: state.semester,
                    class: state.class,
                    student: state.student,
                    subject: selectedSubject,
                    absences: []
                };

                absences.forEach(async a => {
                    absencesObj.absences.push({
                        type: "absence",
                        date: a.date,
                        isExcused
                    });
                });
                // console.log(absencesObj);

                const createdAbsences = await createAbsences(absencesObj);
                store.dispatch({ type: "SAVE_ABSENCES_SUCCESS", subjectId: subjectContainer.id, createdAbsences });
            } catch (error) {
                // console.log(error);
                // store.dispatch({ type: "SAVE_ABSENCES_FAILURE", subjectId: subjectContainer.id, absences });
            }

            // reset form
            monthLabel.classList.remove("active");
            dayLabelsArr.forEach(x => {
                x.classList.remove("active");
            });
            isExcusedInput.checked = false;
        },

        //
        // ************ Absence-list ************
        //
        deleteAbsence: event => {
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors

            const absenceId = event.target.closest("li").id;
            store.dispatch({ type: "DELETE_ABSENCE", subjectId: subjectContainer.id, absenceId: absenceId });
        },

        excuseAbsence: event => {
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors

            const absenceId = event.target.closest("li").id;
            store.dispatch({ type: "EXCUSE_ABSENCE", subjectId: subjectContainer.id, absenceId: absenceId });
        }
    })
};

// https://blog.abelotech.com/posts/generate-random-values-nodejs-javascript/
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
