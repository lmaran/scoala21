import { html, render } from "/scripts/lit-html/lit-html.js";
// import { classMap } from "/scripts/lit-html/directives/class-map.js";

const ALL_MONTHS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const ALL_DAYS = [...Array(31)].map((crt, i) => i + 1); // [1, 2, 3 ... 31]
// console.log(ALL_DAYS);

const myTemplate = data =>
    html`
        <p>Hello ${data}</p>
    `;

const myTemplate3 = data =>
    // prettier-ignore
    html`
    ${data.absences.map(absence => {
        let classes = { 'text-success': absence.itemIsExcused };
        return html`
            <li>
                <span class=${classMap(classes)}>${absence.itemDate}</span>
                ${!absence.itemIsExcused 
                    ? html`<button type="button" class="btn btn-link">Motiveza</button> |` 
                    : html``}
                <button class="btn btn-link">Sterge</button>
            </li>
            `
    })}

`;

const absenceListTemplate = data =>
    html`
        ${data.absences.map(
            absence =>
                html`
                    <li>
                        <span class=${absence.itemIsExcused ? "text-success" : ""}>${absence.itemDate}</span>
                        ${!absence.itemIsExcused
                            ? html`
                                  <button type="button" class="btn btn-link">Motiveza</button> |
                              `
                            : html``}
                        <button class="btn btn-link" @click=${deleteAbsenceHandler}>Sterge</button>
                    </li>
                `
        )}
    `;

const absenceCreateTemplate = data =>
    html`
        <div>Luna:</div>
        <div class="month-container btn-group btn-group-toggle flex-wrap mb-3" data-toggle="buttons">
            ${ALL_MONTHS.map(
                (crt, i) =>
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
                (crt, i) =>
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
            <button class="save-absences-btn btn btn-sm btn-success" @click=${saveAbsenceHandler}>Salveaza</button>
            <button class="save-absences-btn btn btn-sm btn-success">Salveaza si cont.</button>
            <button class="hide-absence-btn btn btn-sm btn-link">Renunta</button>
        </div>

        <div class="result"></div>
    `;

const deleteAbsenceHandler = event => {
    var targetElement = event.target || event.srcElement;
    alert(targetElement.innerHTML);
};

let absenceListContainer2;

const saveAbsenceHandler = event => {
    // var targetElement = event.target || event.srcElement;
    // alert(targetElement.innerHTML);

    var data = {
        absences: [
            {
                itemDate: "aaa",
                itemIsExcused: true
            },
            {
                itemDate: "bbb",
                itemIsExcused: false
            }
        ]
    };
    console.log(absenceListContainer2);
    renderAbsenceList(data, absenceListContainer2);
};

export function renderAbsenceList(data, container) {
    render(absenceListTemplate(data), container);
}

export function renderAbsenceCreate(data, container, absenceListContainer) {
    console.log(absenceListContainer);
    absenceListContainer2 = absenceListContainer;
    console.log(absenceListContainer2);
    render(absenceCreateTemplate(data), container);
}

export const PI = 3.1415926;
