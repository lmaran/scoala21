import { createAbsences, deleteGradebookItem, excuseAbsence, createGradebookItem } from "./gradebook.service.js";
export const eventHandlers = {
    getEventHandlers: store => ({
        //
        //  ************ Absence ***********************************************************************
        //
        expandAddAbsence: event => {
            const subjectContainer = event.target.closest(".subject-container");
            const subjectId = subjectContainer.id;
            store.dispatch({ type: "EXPAND_ADD_ABSENCE", subjectId });

            // set the current month as default (already selected);
            // TODO: set through Redux (unidirectional flow)
            const absencesContainer = subjectContainer.querySelector(".absences-container");
            [...absencesContainer.querySelectorAll(".month-container label")]
                .find(a => a.innerText === getCurrentRomanicMonth())
                .classList.add("active");
        },

        collapseAddAbsence: event => {
            const subjectId = event.target.closest(".subject-container").id;
            store.dispatch({ type: "COLLAPSE_ADD_ABSENCE", subjectId });
        },

        saveAbsences: async event => {
            // 1. get form elements:
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors
            const absencesContainer = subjectContainer.querySelector(".absences-container");
            const monthLabel = absencesContainer.querySelector(".month-container label.active");
            const dayLabels = absencesContainer.querySelectorAll(".day-container label.active");
            const isExcusedInput = absencesContainer.querySelector(".is-excused-input");

            // 2. validate form
            // TODO: set through Redux (unidirectional flow)
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
            const dayLabelsArr = Array.from(dayLabels); // convert NodeList into Array (or [...dayLabels])

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
            // TODO: set through Redux (unidirectional flow)
            // monthLabel.classList.remove("active"); // keep the user selected month as active
            dayLabelsArr.forEach(x => {
                x.classList.remove("active");
            });
            isExcusedInput.checked = false;
        },

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
        },

        //
        //  ************ Mark ***********************************************************************
        //
        expandAddMark: event => {
            const subjectContainer = event.target.closest(".subject-container");
            const subjectId = subjectContainer.id;
            store.dispatch({ type: "EXPAND_ADD_MARK", subjectId });

            // // set the current month as default (already selected);
            // // TODO: set through Redux (unidirectional flow)
            const marksContainer = subjectContainer.querySelector(".marks-container");
            [...marksContainer.querySelectorAll(".month-container label")]
                .find(a => a.innerText === getCurrentRomanicMonth())
                .classList.add("active");
        },

        collapseAddMark: event => {
            const subjectId = event.target.closest(".subject-container").id;
            store.dispatch({ type: "COLLAPSE_ADD_MARK", subjectId });
        },

        saveMark: async event => {
            // 1. get form elements:
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors
            const marksContainer = subjectContainer.querySelector(".marks-container");
            const monthLabel = marksContainer.querySelector(".month-container label.active");
            const dayLabel = marksContainer.querySelector(".day-container label.active");
            const markValueLabel = marksContainer.querySelector(".mark-value-container label.active");

            // 2. validate form
            // TODO: set through Redux (unidirectional flow)
            if (!markValueLabel) {
                alert("Selecteaza nota!");
                return false;
            }
            if (!dayLabel) {
                alert("Selecteaza ziua!");
                return false;
            }
            if (!monthLabel) {
                alert("Selecteaza luna!");
                return false;
            }

            // 3. prepare data
            const state = store.getState();
            const subjectId = subjectContainer.id;
            const selectedSubjectObj = state.subjectsObj[subjectId];

            const gradebookItem = {
                academicYear: state.academicYear,
                semester: state.semester,
                class: state.class,
                student: state.student,
                subject: {
                    id: selectedSubjectObj.id,
                    name: selectedSubjectObj.name
                },
                type: "mark",
                date: getYMD(state.academicYear, monthLabel.innerText, dayLabel.innerText), // f(201819, IX, 4) = 2018-09-04
                value: markValueLabel.innerText
            };

            // 4. save data
            store.dispatch({ type: "SAVE_MARK_REQUEST", subjectId });
            try {
                const createdMark = await createGradebookItem(gradebookItem);
                store.dispatch({ type: "SAVE_MARK_SUCCESS", subjectId, createdMark });
            } catch (error) {
                alert("Eroare la salvarea notei!");
                store.dispatch({ type: "SAVE_MARK_FAILURE", subjectId });
            }

            // 5. clean up the form
            // TODO: set through Redux (unidirectional flow)
            // monthLabel.classList.remove("active"); // keep the user selected month as active

            dayLabel.classList.remove("active");
            markValueLabel.classList.remove("active");
        },

        deleteMark: async event => {
            const subjectId = event.target.closest(".subject-container").id;
            const markId = event.target.closest("li").id;

            // save data
            store.dispatch({ type: "DELETE_MARK_REQUEST", subjectId, markId });
            try {
                await deleteGradebookItem(markId);
                store.dispatch({ type: "DELETE_MARK_SUCCESS", subjectId, markId });
            } catch (error) {
                alert("Eroare la stergerea notei!");
                store.dispatch({ type: "DELETE_MARK_FAILURE", subjectId, markId });
            }
        },

        //
        //  ************ Semestrial Test Paper ***********************************************************
        //
        expandAddSemestrialTestPaper: event => {
            const subjectContainer = event.target.closest(".subject-container");
            const subjectId = subjectContainer.id;
            store.dispatch({ type: "EXPAND_ADD_SEMESTRIAL_TEST_PAPER", subjectId });
        },

        collapseAddSemestrialTestPaper: event => {
            const subjectId = event.target.closest(".subject-container").id;
            store.dispatch({ type: "COLLAPSE_ADD_SEMESTRIAL_TEST_PAPER", subjectId });
        },

        saveSemestrialTestPaper: async event => {
            // 1. get form elements:
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors
            const semestrialTestPaperContainer = subjectContainer.querySelector(".semestrial-test-paper-container");
            const semestrialTestPaperValueLabel = semestrialTestPaperContainer.querySelector(
                ".semestrial-test-paper-value-container label.active"
            );

            // 2. validate form
            // TODO: set through Redux (unidirectional flow)
            if (!semestrialTestPaperValueLabel) {
                alert("Selecteaza nota!");
                return false;
            }

            // 3. prepare data
            const state = store.getState();
            const subjectId = subjectContainer.id;
            const selectedSubjectObj = state.subjectsObj[subjectId];

            const gradebookItem = {
                academicYear: state.academicYear,
                semester: state.semester,
                class: state.class,
                student: state.student,
                subject: {
                    id: selectedSubjectObj.id,
                    name: selectedSubjectObj.name
                },
                type: "semestrialTestPaper",
                value: semestrialTestPaperValueLabel.innerText
            };

            // 4. save data
            store.dispatch({ type: "SAVE_SEMESTRIAL_TEST_PAPER_REQUEST", subjectId });
            try {
                const createdSemestrialTestPaper = await createGradebookItem(gradebookItem);
                store.dispatch({ type: "SAVE_SEMESTRIAL_TEST_PAPER_SUCCESS", subjectId, createdSemestrialTestPaper });
            } catch (error) {
                alert("Eroare la salvarea notei!");
                store.dispatch({ type: "SAVE_SEMESTRIAL_TEST_PAPER_FAILURE", subjectId });
            }

            // 5. clean up the form
            // TODO: set through Redux (unidirectional flow)
            semestrialTestPaperValueLabel.classList.remove("active");
        },

        deleteSemestrialTestPaper: async event => {
            const subjectContainer = event.target.closest(".subject-container");
            const subjectId = subjectContainer.id;
            const semestrialTestPaperId = subjectContainer.querySelector(".semestrial-test-paper-value-span").id;

            // save data
            store.dispatch({ type: "DELETE_SEMESTRIAL_TEST_PAPER_REQUEST", subjectId, semestrialTestPaperId });
            try {
                await deleteGradebookItem(semestrialTestPaperId);
                store.dispatch({ type: "DELETE_SEMESTRIAL_TEST_PAPER_SUCCESS", subjectId, semestrialTestPaperId });
            } catch (error) {
                alert("Eroare la stergerea mediei!");
                store.dispatch({ type: "DELETE_SEMESTRIAL_TEST_PAPER_FAILURE", subjectId, semestrialTestPaperId });
            }
        },

        //
        //  ************ Semestrial Average ***********************************************************
        //
        expandAddSemestrialAverage: event => {
            const subjectContainer = event.target.closest(".subject-container");
            const subjectId = subjectContainer.id;
            store.dispatch({ type: "EXPAND_ADD_SEMESTRIAL_AVERAGE", subjectId });
        },

        collapseAddSemestrialAverage: event => {
            const subjectId = event.target.closest(".subject-container").id;
            store.dispatch({ type: "COLLAPSE_ADD_SEMESTRIAL_AVERAGE", subjectId });
        },

        saveSemestrialAverage: async event => {
            // 1. get form elements:
            const subjectContainer = event.target.closest(".subject-container"); // find the closest ancestor which matches the selectors
            const semestrialAverageContainer = subjectContainer.querySelector(".semestrial-average-container");
            const semestrialAverageValueLabel = semestrialAverageContainer.querySelector(
                ".semestrial-average-value-container label.active"
            );

            // 2. validate form
            // TODO: set through Redux (unidirectional flow)
            if (!semestrialAverageValueLabel) {
                alert("Selecteaza media!");
                return false;
            }

            // 3. prepare data
            const state = store.getState();
            const subjectId = subjectContainer.id;
            const selectedSubjectObj = state.subjectsObj[subjectId];

            const gradebookItem = {
                academicYear: state.academicYear,
                semester: state.semester,
                class: state.class,
                student: state.student,
                subject: {
                    id: selectedSubjectObj.id,
                    name: selectedSubjectObj.name
                },
                type: "semestrialAverage",
                value: semestrialAverageValueLabel.innerText
            };

            // 4. save data
            store.dispatch({ type: "SAVE_SEMESTRIAL_AVERAGE_REQUEST", subjectId });
            try {
                const createdSemestrialAverage = await createGradebookItem(gradebookItem);
                store.dispatch({ type: "SAVE_SEMESTRIAL_AVERAGE_SUCCESS", subjectId, createdSemestrialAverage });
            } catch (error) {
                alert("Eroare la salvarea mediei!");
                store.dispatch({ type: "SAVE_SEMESTRIAL_AVERAGE_FAILURE", subjectId });
            }

            // 5. clean up the form
            // TODO: set through Redux (unidirectional flow)
            semestrialAverageValueLabel.classList.remove("active");
        },

        deleteSemestrialAverage: async event => {
            const subjectContainer = event.target.closest(".subject-container");
            const subjectId = subjectContainer.id;
            const semestrialAverageId = subjectContainer.querySelector(".semestrial-average-value-span").id;

            // save data
            store.dispatch({ type: "DELETE_SEMESTRIAL_AVERAGE_REQUEST", subjectId, semestrialAverageId });
            try {
                await deleteGradebookItem(semestrialAverageId);
                store.dispatch({ type: "DELETE_SEMESTRIAL_AVERAGE_SUCCESS", subjectId, semestrialAverageId });
            } catch (error) {
                alert("Eroare la stergerea mediei!");
                store.dispatch({ type: "DELETE_SEMESTRIAL_AVERAGE_FAILURE", subjectId, semestrialAverageId });
            }
        }
    })
};

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

// (201819, IX, 4) -> 2018-09-04
// (201819, III, 7) -> 2019-03-07
const getYMD = (academicYearStr, monthRoman, dayArabic) => {
    const academicYearInt = parseInt(academicYearStr); // 201819
    const firstYearInt = Math.floor(academicYearInt / 100); // 2018
    const monthArabic = mapRomanToArabic[monthRoman]; // 9
    const yearInt = monthArabic >= 9 && monthArabic <= 12 ? firstYearInt : firstYearInt + 1; // 2018
    return `${yearInt.toString()}-${monthArabic.toString().padStart(2, 0)}-${dayArabic.toString().padStart(2, 0)}`; // "2018-09-04"
};

// (9) -> "IX"
const getRomanFromArabicMonth = monthArabic => {
    return Object.keys(mapRomanToArabic).find(key => mapRomanToArabic[key] === monthArabic); // IX
};

// Returns "IX" if the current month is Sep.
const getCurrentRomanicMonth = () => {
    const d = new Date();
    const monthArabic = d.getMonth() + 1; // 1=January, 2=February etc.
    return getRomanFromArabicMonth(monthArabic);
};
