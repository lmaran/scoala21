import { Component, OnInit, Renderer2, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import {
    Entity,
    EntityField,
    SingleLineOfText,
    SingleLineOfTextFormatOptions,
    EntityFieldTypeOptions,
} from '../../../core/interfaces/entity.interfaces';

@Component({
    selector: 'app-entity-detail',
    templateUrl: './entity-detail.component.html',
    styleUrls: ['./entity-detail.component.scss'],
})
export class EntityDetailComponent implements OnInit, OnChanges {
    @Input() entity: Entity;
    // isEditMode: boolean;

    @Output() create = new EventEmitter<Entity>();
    @Output() update = new EventEmitter<Entity>();

    submitted: boolean;
    entityForm: FormGroup;
    title: string;

    entityFields: EntityField[];

    private formSubmitAttempt: boolean;

    constructor(private formBuilder: FormBuilder, public renderer2: Renderer2) {}

    ngOnInit() {
        this.createForm();

        // focus on first field https://stackoverflow.com/a/34573219/2726725
        this.renderer2.selectRootElement('#entityName').focus();

        const field1: EntityField = {
            displayName: 'Customer Id',
            uniqueName: '_id',
            type: EntityFieldTypeOptions.SINGLE_LINE_OF_TEXT,
            typeDetails: <SingleLineOfText>{
                format: SingleLineOfTextFormatOptions.TEXT,
                maxLength: 100,
            },
            description: 'Id-ul clientului',
        };

        const field2: EntityField = {
            displayName: 'Customer Name',
            uniqueName: 'name',
            type: EntityFieldTypeOptions.SINGLE_LINE_OF_TEXT,
            typeDetails: <SingleLineOfText>{
                format: SingleLineOfTextFormatOptions.TEXT,
                // maxLength: 100,
            },
            description: 'Numele clientului',
        };

        // this.entityFields = [field1, field2];
    }

    // the source of 'this.entity' (in parent container) is an Observable (stream)
    // => this value can be visible in UI (<pre>{{entity | json}}</pre>) but not available in Constructor or ngOnInit()
    // => we have to access this value later, in ngOnChanges. See also:
    // https://github.com/avatsaev/angular-contacts-app-example/.../contact-form.component.ts
    // https://github.com/DeborahK/Angular-NgRx-GettingStarted/.../product-edit.component.ts
    // https://github.com/blove/ngrx-tour-of-heros/.../edit-power.component.ts
    // https://www.concretepage.com/angular-2/angular-2-4-onchanges-simplechanges-example

    // Also, ensure that actions inside this method are fired only once (based on below)

    // 'add page' -> ngOnChanges() fires only once (before ngOnInit()) -> currentValue = null
    //      - applicable for both AppNav and PageReload
    // 'edit page' -> ngOnChanges() fires two times (before and after ngOnInit()) -> currentValue = ... it depends:
    //
    //      Page | From       | Fires | currentVal  | previousVal | firstChange | Notes
    //      ========================================================================================================================
    //      Add  | AppNav     | 1     | null        | undefined   | true        | ok (currentEntityId should be null in state)
    //      Add  | PageReload | 1     | null        | undefined   | true        | ok
    //
    //      Edit | AppNav     | 1     | {..}        | undefined   | true        | ignore (fires before onInit -> entityForm = undef.)
    //           |            | 2     | {..}        | {..}        | false       | ok
    //      Edit | PageReload | 1     | undefined   | undefined   | true        | ignore (fires before onInit -> entityForm = undef.)
    //           |            | 2     | {..}        | undefined   | false       | ok
    //
    ngOnChanges(changes: SimpleChanges) {
        // it fires only for "edit" (not for "create"...@input is not sent in this case)
        // ensure it fires only once (and after ngOnInit). Se comments above.
        if (!changes['entity'].firstChange) {
            this.populateForm(this.entity);
            this.entityFields = this.entity.fields;
        }
    }
    // ngOnChanges(changes: SimpleChanges) {
    //     console.log(changes);
    //     if (changes['entity'].firstChange) {
    //         if (changes['entity'].currentValue === null) {
    //             this.title = 'Adauga entitate';
    //         } else {
    //             this.isEditMode = true;
    //             this.title = 'Editeaza entitate';
    //         }
    //     } else {
    //         // ensure it fires only once (and after ngOnInit) ... se comments above
    //         // this.title = `${this.title}: ${this.entity.displayName}`; // optional
    //         this.populateForm(this.entity);
    //     }
    // }

    createForm() {
        this.entityForm = this.formBuilder.group({
            displayName: ['', [Validators.required, Validators.minLength(3)]],
            pluralName: ['', [Validators.required, Validators.minLength(3)]],
            uniqueName: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required]],
            // fields: this.formBuilder.array([]),
        });
    }

    // addEmployee() {
    //     let fg = this.formBuilder.group(field);
    //     this.empFormArray.push(fg);
    // }

    populateForm(entity: Entity) {
        this.entityForm.patchValue({
            ...entity,
        });

        // if (entity.fields) {
        //     entity.fields.forEach(field => {
        //         const fg = this.formBuilder.group(field);
        //         const fieldsArray = this.entityForm.get('fields') as FormArray;
        //         fieldsArray.push(fg);
        //     });
        // }

        // console.log(this.entityForm);
    }

    isFieldInvalid(field: string) {
        return !this.entityForm.get(field).valid && this.formSubmitAttempt;
    }

    saveEntity(): void {
        // if (this.entityForm.valid) {
        //     if (this.entityForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p: Entity = { ...this.entity, ...this.entityForm.value };

        if (p._id === undefined) {
            this.create.emit(p);
        } else {
            this.update.emit(p);
        }
        //     }
        // } else {
        //     // this.errorMessage = 'Please correct the validation errors.';
        // }
    }
}
