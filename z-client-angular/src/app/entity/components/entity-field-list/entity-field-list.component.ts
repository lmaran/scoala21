import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { EntityField } from '../../../core/interfaces/entity.interfaces';
import { AppModalComponent } from '../../../shared/components/confirmDelete/confirmDelete.component';

@Component({
    selector: 'app-entity-field-list',
    templateUrl: './entity-field-list.component.html',
    styleUrls: ['./entity-field-list.component.scss'],
})
export class EntityFieldListComponent {
    @Input() entityFields: EntityField[];

    // Don't forget to add this (child) component in the current html
    @ViewChild(AppModalComponent) modal: AppModalComponent;

    deleteEntityField = function(field) {
        this.modal.open(`${field.displayName}`, () => {
            // this.delete.emit(field);
        });
    };

    editEntityField = function(field) {};
}
