// import { html, render } from "/scripts/lit-html/lit-html.js";
import { html, render } from "/client/lib/lit-html/lit-html.js";

//
//  ************ Absence ************************************************************************************
//

const absenceTemplate = (data, methods) =>
    html`
        <div class="font-weight-bold">Absente:</div>

        ${data.absences ? absenceListTemplate(data, methods) : html``}

        <button
            class="expand-add-absence-btn btn btn-sm btn-primary ml-4 mt-1"
            ?disabled=${data.addAbsenceIsExpanded}
            @click=${methods.expandAddAbsence}
        >
            Adauga absente
        </button>

        ${data.addAbsenceIsExpanded ? absenceAddTemplate(data, methods) : html``}
    `;

const absenceListTemplate = (data, methods) =>
    html`
        <ul>
            ${data.absences.map(
                absence =>
                    html`
                        <li id=${absence.id}>
                            <span class="absence-date-span ${absence.isExcused ? "text-success" : ""}"
                                >${absence.friendlyDate}</span
                            >
                            ${!absence.isExcused
                                ? html`
                                      <button class="excuse-absence-btn btn btn-link" @click=${methods.excuseAbsence}>
                                          Motiveza
                                      </button>
                                      |
                                  `
                                : html``}
                            <button class="delete-absence-btn btn btn-link" @click=${methods.deleteAbsence}>
                                Sterge
                            </button>
                            <span
                                class="spinner ${absence.deleteAbsenceIsInProgress || absence.excuseAbsenceIsInProgress
                                    ? ""
                                    : "d-none"}"
                            >
                                <i class="fas fa-spinner spinning"></i>
                            </span>
                        </li>
                    `
            )}
        </ul>
    `;

const absenceAddTemplate = (data, methods) =>
    html`
        <div class="add-form ml-4 mt-1">
            <div>Luna:</div>
            ${getInputSelectionTemplate("month")}

            <div>Ziua <span class="text-muted">(selectie multipla)</span>:</div>
            ${getInputSelectionTemplate("day", true)}

            <div class="form-check mb-3 mr-sm-2">
                <input class="form-check-input is-excused-input" type="checkbox" id="inlineFormCheck" />
                <label class="form-check-label" for="inlineFormCheck">
                    Absentele selectate sunt motivate
                </label>
            </div>

            <div class="pb-3">
                <button class="save-absences-btn btn btn-sm btn-success" @click=${methods.saveAbsences}>
                    Salveaza si cont.
                </button>
                <button class="collapse-add-absence-btn btn btn-sm btn-link" @click=${methods.collapseAddAbsence}>
                    Renunta
                </button>
                <span class="spinner spinner-md ${data.addAbsenceIsInProgress ? "" : "d-none"}">
                    <i class="fas fa-spinner spinning"></i>
                </span>
            </div>
        </div>
    `;

//
//  ************ Mark ************************************************************************************
//

const markTemplate = (data, methods) =>
    html`
        <div class="font-weight-bold">Note:</div>

        ${data.marks ? markListTemplate(data, methods) : html``}

        <button
            class="expand-add-absence-btn btn btn-sm btn-primary ml-4 mt-1"
            ?disabled=${data.addMarkIsExpanded}
            @click=${methods.expandAddMark}
        >
            Adauga note
        </button>

        ${data.addMarkIsExpanded ? markAddTemplate(data, methods) : html``}
    `;

const markListTemplate = (data, methods) =>
    html`
        <ul>
            ${data.marks.map(
                mark =>
                    html`
                        <li id=${mark.id}>
                            <span class="mark-value-span">${mark.value}</span>
                            <span class="mark-date-span text-muted">/ ${mark.friendlyDate}</span>
                            <button class="delete-mark-btn btn btn-link" @click=${methods.deleteMark}>
                                Sterge
                            </button>
                            <span class="spinner ${mark.deleteMarkIsInProgress ? "" : "d-none"}">
                                <i class="fas fa-spinner spinning"></i>
                            </span>
                        </li>
                    `
            )}
        </ul>
    `;

const markAddTemplate = (data, methods) =>
    html`
        <div class="add-form ml-4 mt-1">
            <div>Nota:</div>
            ${getInputSelectionTemplate("mark-value")}

            <div>Ziua:</div>
            ${getInputSelectionTemplate("day")}

            <div>Luna:</div>
            ${getInputSelectionTemplate("month")}

            <div class="pb-3">
                <button class="save-absences-btn btn btn-sm btn-success" @click=${methods.saveMark}>
                    Salveaza si cont.
                </button>
                <button class="collapse-add-absence-btn btn btn-sm btn-link" @click=${methods.collapseAddMark}>
                    Renunta
                </button>
                <span class="spinner spinner-md ${data.addMarkIsInProgress ? "" : "d-none"}">
                    <i class="fas fa-spinner spinning"></i>
                </span>
            </div>
        </div>
    `;

//
//  ************ Semestrial Test Paper *********************************************************************
//

const semestrialTestPaperTemplate = (data, methods) =>
    html`
        <span class="font-weight-bold">Teza:</span>

        ${data.semestrialTestPaper
            ? html`
                  <span
                      id=${data.semestrialTestPaper.id}
                      class="semestrial-test-paper-value-span font-weight-bold text-danger"
                      >${data.semestrialTestPaper.value}</span
                  >
                  <button
                      class="delete-semestrial-test-paper-btn btn btn-link"
                      @click=${methods.deleteSemestrialTestPaper}
                  >
                      Sterge
                  </button>
                  <span
                      class="spinner ${data.semestrialTestPaper.deleteSemestrialTestPaperIsInProgress ? "" : "d-none"}"
                  >
                      <i class="fas fa-spinner spinning"></i>
                  </span>
              `
            : html`
                  <button
                      class="expand-add-semestrial-test-paper-btn btn btn-link"
                      ?disabled=${data.addSemestrialTestPaperIsExpanded}
                      @click=${methods.expandAddSemestrialTestPaper}
                  >
                      Adauga teza
                  </button>
              `}
        ${data.addSemestrialTestPaperIsExpanded ? semestrialTestPaperAddTemplate(data, methods) : html``}
    `;

const semestrialTestPaperAddTemplate = (data, methods) =>
    html`
        <div class="add-form ml-4 mt-1">
            <div>Nota:</div>
            ${getInputSelectionTemplate("semestrial-test-paper-value")}

            <div class="pb-3">
                <button class="save-absences-btn btn btn-sm btn-success" @click=${methods.saveSemestrialTestPaper}>
                    Salveaza
                </button>
                <button
                    class="collapse-add-absence-btn btn btn-sm btn-link"
                    @click=${methods.collapseAddSemestrialTestPaper}
                >
                    Renunta
                </button>
                <span class="spinner spinner-md ${data.addSemestrialTestPaperIsInProgress ? "" : "d-none"}">
                    <i class="fas fa-spinner spinning"></i>
                </span>
            </div>
        </div>
    `;

//
//  ************ Semestrial Average *********************************************************************
//

const semestrialAverageTemplate = (data, methods) =>
    html`
        <span class="font-weight-bold">Media:</span>

        ${data.semestrialAverage
            ? html`
                  <span
                      id=${data.semestrialAverage.id}
                      class="semestrial-average-value-span font-weight-bold text-danger"
                      >${data.semestrialAverage.value}</span
                  >
                  <span class="text-danger">(${data.semestrialAverage.valueAsText})</span>
                  <button class="delete-semestrial-average-btn btn btn-link" @click=${methods.deleteSemestrialAverage}>
                      Sterge
                  </button>
                  <span class="spinner ${data.semestrialAverage.deleteSemestrialAverageIsInProgress ? "" : "d-none"}">
                      <i class="fas fa-spinner spinning"></i>
                  </span>
              `
            : html`
                  <button
                      class="expand-add-semestrial-average-btn btn btn-link"
                      ?disabled=${data.addSemestrialAverageIsExpanded}
                      @click=${methods.expandAddSemestrialAverage}
                  >
                      Adauga media
                  </button>
              `}
        ${data.addSemestrialAverageIsExpanded ? semestrialAverageAddTemplate(data, methods) : html``}
    `;

const semestrialAverageAddTemplate = (data, methods) =>
    html`
        <div class="add-form ml-4 mt-1">
            <div>Nota:</div>
            ${getInputSelectionTemplate("semestrial-average-value")}

            <div class="pb-3">
                <button class="save-absences-btn btn btn-sm btn-success" @click=${methods.saveSemestrialAverage}>
                    Salveaza
                </button>
                <button
                    class="collapse-add-absence-btn btn btn-sm btn-link"
                    @click=${methods.collapseAddSemestrialAverage}
                >
                    Renunta
                </button>
                <span class="spinner spinner-md ${data.addSemestrialAverageIsInProgress ? "" : "d-none"}">
                    <i class="fas fa-spinner spinning"></i>
                </span>
            </div>
        </div>
    `;

const getInputSelectionTemplate = (type, allowMultipleSelections) => {
    const ALL_MONTHS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    const ALL_DAYS = [...Array(31)].map((crt, i) => i + 1); // [1, 2, 3 ... 31]
    const ALL_MARK_VALUES = [...Array(10)].map((crt, i) => i + 1); // [1, 2, 3 ... 10]

    const mapTypeToValues = {
        day: ALL_DAYS,
        month: ALL_MONTHS,
        "mark-value": ALL_MARK_VALUES,
        "semestrial-test-paper-value": ALL_MARK_VALUES,
        "semestrial-average-value": ALL_MARK_VALUES
    };

    const ALL_ITEMS = mapTypeToValues[type];

    return html`
        <div class="${type}-container btn-group btn-group-toggle flex-wrap mb-3" data-toggle="buttons">
            ${ALL_ITEMS.map(
                (crt, idx) =>
                    html`
                        <label class="btn btn-light">
                            <input
                                type="${allowMultipleSelections ? "checkbox" : "radio"}"
                                name="options"
                                autocomplete="off"
                            />
                            ${crt}
                        </label>
                        ${++idx % 7 === 0
                            ? html`
                                  <label class="btn btn-light flex-new-line"></label>
                              `
                            : html``}
                    `
            )}
        </div>
    `;
};

let methods;

export const components = {
    init: eventHandlers => (methods = eventHandlers),
    renderAbsence: (data, domElement) => render(absenceTemplate(data, methods), domElement),
    renderMark: (data, domElement) => render(markTemplate(data, methods), domElement),
    renderSemestrialTestPaper: (data, domElement) => render(semestrialTestPaperTemplate(data, methods), domElement),
    renderSemestrialAverage: (data, domElement) => render(semestrialAverageTemplate(data, methods), domElement)
};
