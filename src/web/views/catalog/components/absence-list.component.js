import { html, render } from "/scripts/lit-html/lit-html.js";

const template = (data, methods) =>
    html`
        ${data.absences.map(
            absence =>
                html`
                    <li id=${absence.itemId} style="background-color:yellow">
                        <span class=${absence.itemIsExcused ? "text-success" : ""}>${absence.itemDate}</span>
                        ${!absence.itemIsExcused
                            ? html`
                                  <button class="btn btn-link" @click=${methods.excuseAbsenceClickHandler}>
                                      Motiveza
                                  </button>
                                  |
                              `
                            : html``}
                        <button class="btn btn-link" @click=${methods.deleteAbsenceClickHandler}>Sterge</button>
                    </li>
                `
        )}
    `;

let methods;

export const absenceListComponent = {
    init: eventHandlers => (methods = eventHandlers),
    render: (data, domElement) => render(template(data, methods), domElement)
};
