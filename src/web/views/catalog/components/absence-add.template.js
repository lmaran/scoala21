import { html, render } from "/scripts/lit-html/lit-html.js";
// import { classMap } from "/scripts/lit-html/directives/class-map.js";

const ALL_MONTHS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const ALL_DAYS = [...Array(31)].map((crt, i) => i + 1); // [1, 2, 3 ... 31]

const template = props =>
    html`
        <div>Luna:</div>
        <div class="month-container btn-group btn-group-toggle flex-wrap mb-3" data-toggle="buttons">
            ${ALL_MONTHS.map(
                crt =>
                    html`
                        <label class="btn btn-light">
                            <input type="radio" name="options" id="option1" autocomplete="off" /> ${crt}
                        </label>
                        ${crt === "VII"
                            ? html`
                                  <label class="btn btn-light flex-new-line"></label>
                              `
                            : html``}
                    `
            )}
        </div>

        <div>Ziua:</div>
        <div class="month-container btn-group btn-group-toggle flex-wrap mb-3" data-toggle="buttons">
            ${ALL_DAYS.map(
                crt =>
                    html`
                        <label class="btn btn-light">
                            <input type="checkbox" name="options" id="option1" autocomplete="off" /> ${crt}
                        </label>
                        ${crt === 7 || crt === 14 || crt === 21 || crt === 28
                            ? html`
                                  <label class="btn btn-light flex-new-line"></label>
                              `
                            : html``}
                    `
            )}
        </div>

        <div class="form-check mb-3 mr-sm-2">
            <input class="form-check-input is-excused-input" type="checkbox" id="inlineFormCheck" />
            <label class="form-check-label" for="inlineFormCheck">
                Absentele selectate sunt motivate
            </label>
        </div>

        <div class="pb-3">
            <!-- <button class="save-absences-btn btn btn-sm btn-success" a@click={saveAbsenceHandler}>Salveaza</button> -->
            <button class="save-absences-btn btn btn-sm btn-success">Salveaza si cont.</button>
            <button class="collapse-add-absence-btn btn btn-sm btn-link" @click="${props.test}">Renunta</button>
        </div>

        <div class="result"></div>
    `;

export function renderComponent(props, container) {
    // console.log("container in absence-add-template:");
    // console.log(container);
    render(template(props), container);
}