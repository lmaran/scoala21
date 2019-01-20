import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Entity } from '../../../core/interfaces/entity.interfaces';
import { AppModalComponent } from '../../../shared/components/confirmDelete/confirmDelete.component';

@Component({
    selector: 'app-entity-list',
    templateUrl: './entity-list.component.html',
    styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent {
    @Input() entities: Entity[];
    @Input() loading = false;
    @Output() delete = new EventEmitter<Entity>();

    // Don't forget to add this (child) component in the current html
    @ViewChild(AppModalComponent) modal: AppModalComponent;

    deleteEntity = function(entity) {
        this.modal.open(`${entity.displayName}`, () => {
            this.delete.emit(entity);
        });
    };
}
