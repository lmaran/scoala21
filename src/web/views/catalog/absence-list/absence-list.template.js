import { html, render } from "/scripts/lit-html/lit-html.js";

const template = props =>
    html`
        ${props.absences.map(
            absence =>
                html`
                    <li id=${absence.itemId} style="background-color:yellow">
                        <span class=${absence.itemIsExcused ? "text-success" : ""}>${absence.itemDate}</span>
                        ${!absence.itemIsExcused
                            ? html`
                                  <button class="btn btn-link" @click=${props.excuseAbsenceClickHandler}>
                                      Motiveza
                                  </button>
                                  |
                              `
                            : html``}
                        <button class="btn btn-link" @click=${props.deleteAbsenceClickHandler}>Sterge</button>
                    </li>
                `
        )}
    `;

export const component = {
    render: (props, domContainer) => render(template(props), domContainer)
};
