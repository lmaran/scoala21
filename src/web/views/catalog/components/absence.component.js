import { html, render } from "/scripts/lit-html/lit-html.js";

const ALL_MONTHS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const ALL_DAYS = [...Array(31)].map((crt, i) => i + 1); // [1, 2, 3 ... 31]

const absenceAddTemplateResult = (data, methods) =>
    html`absenceAdd
    `;

const absenceListTemplateResult = (data, methods) =>
    html`absenceList
`;

const absenceTemplateResult = (data, methods) =>
    html`
        <div class="font-weight-bold">Absente:</div>
        <ul class="absence-list-container">
            ${absenceListTemplateResult}
        </ul>
        
        <button class="expand-add-absence-btn btn btn-sm btn-primary ml-4">Adauga absente</button>
        ${absenceAddTemplateResult}
    `;

let methods;

export const absenceComponent = {
    init: eventHandlers => (methods = eventHandlers),
    render: (data, domElement) => render(absenceTemplateResult(data, methods), domElement)
};
