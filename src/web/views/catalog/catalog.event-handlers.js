import { createAbsences, deleteGradebookItem, excuseAbsence } from "/views/catalog/catalog.service.js";
export const eventHandlers = {
    getEventHandlers: store => ({
        //
        //  ************ Absence-add ************
        //
        expandAddAbsence: event => {
            const subjectId = event.target.closest(".subject-container").id;
            store.dispatch({ type: "EXPAND_ADD_ABSENCE", subjectId });
        },

        collapseAddAbsence: event => {
            const subjectId = event.target.closest(".subject-container").id;
            store.dispatch({ type: "COLLAPSE_ADD_ABSENCE", subjectId });
        },

        saveAbsences: async event => {
            // 1. get form elements:
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors
            const monthLabel = subjectContainer.querySelector(".month-container label.active");
            const dayLabels = subjectContainer.querySelectorAll(".day-container label.active");
            const isExcusedInput = subjectContainer.querySelector(".is-excused-input");

            // 2. validate form
            if (!monthLabel) {
                alert("Selecteaza luna!");
                return false;
            }
            if (!dayLabels || dayLabels.length === 0) {
                alert("Selecteaza una sau mai multe zile!");
                return false;
            }

            // 3. prepare data
            const state = store.getState();
            const subjectId = subjectContainer.id;
            const selectedSubjectObj = state.subjectsObj[subjectId];
            const dayLabelsArr = Array.from(dayLabels); // convert NodeList into Array

            const absencesObj = {
                academicYear: state.academicYear,
                semester: state.semester,
                class: state.class,
                student: state.student,
                subject: {
                    id: selectedSubjectObj.id,
                    name: selectedSubjectObj.name
                },
                absences: dayLabelsArr.map(dayLabel => ({
                    type: "absence",
                    date: getYMD(state.academicYear, monthLabel.innerText, dayLabel.innerText), // f(201819, IX, 4) = 2018-09-04
                    isExcused: isExcusedInput.checked
                }))
            };

            // 4. save data
            store.dispatch({ type: "SAVE_ABSENCES_REQUEST", subjectId });
            try {
                const createdAbsences = await createAbsences(absencesObj);
                store.dispatch({ type: "SAVE_ABSENCES_SUCCESS", subjectId, createdAbsences });
            } catch (error) {
                alert("Eroare la salvarea absentelor!");
                store.dispatch({ type: "SAVE_ABSENCES_FAILURE", subjectId });
            }

            // 5. clean up the form
            monthLabel.classList.remove("active");
            dayLabelsArr.forEach(x => {
                x.classList.remove("active");
            });
            isExcusedInput.checked = false;
        },

        //
        // ************ Absence-list ************
        //
        deleteAbsence: async event => {
            const subjectId = event.target.closest(".subject-container").id;
            const absenceId = event.target.closest("li").id;

            // save data
            store.dispatch({ type: "DELETE_ABSENCE_REQUEST", subjectId, absenceId });
            try {
                await deleteGradebookItem(absenceId);
                store.dispatch({ type: "DELETE_ABSENCE_SUCCESS", subjectId, absenceId });
            } catch (error) {
                alert("Eroare la stergerea absentei!");
                store.dispatch({ type: "DELETE_ABSENCE_FAILURE", subjectId, absenceId });
            }
        },

        excuseAbsence: async event => {
            const subjectId = event.target.closest(".subject-container").id;
            const absenceId = event.target.closest("li").id;

            // save data
            store.dispatch({ type: "EXCUSE_ABSENCE_REQUEST", subjectId, absenceId });
            try {
                await excuseAbsence(absenceId);
                store.dispatch({ type: "EXCUSE_ABSENCE_SUCCESS", subjectId, absenceId });
            } catch (error) {
                alert("Eroare la motivarea absentei!");
                store.dispatch({ type: "EXCUSE_ABSENCE_FAILURE", subjectId, absenceId });
            }
        }
    })
};

// // https://blog.abelotech.com/posts/generate-random-values-nodejs-javascript/
// function randomInt(low, high) {
//     return Math.floor(Math.random() * (high - low) + low);
// }

// (201819, IX, 4) -> 2018-09-04
// (201819, III, 7) -> 2019-03-07
const getYMD = (academicYearStr, monthRoman, dayArabic) => {
    const mapRomanToArabic = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4,
        V: 5,
        VI: 6,
        VII: 7,
        VIII: 8,
        IX: 9,
        X: 10,
        XI: 11,
        XII: 12
    };
    const academicYearInt = parseInt(academicYearStr); // 201819
    const firstYearInt = Math.floor(academicYearInt / 100); // 2018
    const monthArabic = mapRomanToArabic[monthRoman]; // 9
    const yearInt = monthArabic >= 9 && monthArabic <= 12 ? firstYearInt : firstYearInt + 1; // 2018
    return `${yearInt.toString()}-${monthArabic.toString().padStart(2, 0)}-${dayArabic.toString().padStart(2, 0)}`; // "2018-09-04"
};
