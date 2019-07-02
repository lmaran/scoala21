import { html, render } from "/scripts/lit-html/lit-html.js";
import { deleteAbsenceClickHandler, excuseAbsenceClickHandler } from "/views/student/catalog.ui-event-handlers.js";

const absenceListTemplate = data =>
    html`
        ${data.absences.map(
            absence =>
                html`
                    <li id=${absence.itemId}>
                        <span class=${absence.itemIsExcused ? "text-success" : ""}>${absence.itemDate}</span>
                        ${!absence.itemIsExcused
                            ? html`
                                  <button class="btn btn-link" @click=${excuseAbsenceClickHandler}>Motiveza</button> |
                              `
                            : html``}
                        <button class="btn btn-link" @click=${deleteAbsenceClickHandler}>Sterge</button>
                    </li>
                `
        )}
    `;

export function renderAbsenceList(data, subjectId) {
    // cannot combine these 2 selectors inside "querySelector" as long as "id" starts with a number !!!
    const absenceListContainer = document.getElementById(`${subjectId}`).querySelector(".absence-list-container");
    render(absenceListTemplate(data), absenceListContainer);
}
