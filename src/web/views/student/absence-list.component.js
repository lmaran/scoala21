import { html, render } from "/scripts/lit-html/lit-html.js";
import eventEmitter from "/views/student/event-emitter.js";

// view (as template)
const absenceListTemplate = data =>
    html`
        ${data.absences.map(
            absence =>
                html`
                    <li id=${absence.itemId}>
                        <span class=${absence.itemIsExcused ? "text-success" : ""}>${absence.itemDate}</span>
                        ${!absence.itemIsExcused
                            ? html`
                                  <button class="btn btn-link" @click=${excuseAbsence}>Motiveza</button> |
                              `
                            : html``}
                        <button class="btn btn-link" @click=${deleteAbsence}>Sterge</button>
                    </li>
                `
        )}
    `;

// input
export function renderAbsenceList(data, subjectId) {
    // cannot combine these 2 selectors inside "querySelector" as long as "id" starts with a number !!!
    const absenceListContainer = document.getElementById(`${subjectId}`).querySelector(".absence-list-container");
    render(absenceListTemplate(data), absenceListContainer);
}

// output
const deleteAbsence = event => {
    const absenceId = event.target.closest("li").id;
    eventEmitter.dispatchEvent(new CustomEvent("DELETE_ABSENCE", { detail: absenceId })); // "detail" is a reserved word
};

// output
const excuseAbsence = event => {
    const absenceId = event.target.closest("li").id;
    eventEmitter.dispatchEvent(new CustomEvent("EXCUSE_ABSENCE", { detail: absenceId })); // "detail" is a reserved word
};
