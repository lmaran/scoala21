// https://coryrylan.com/blog/angular-form-builder-and-validation-management
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../../core/services/validation.service';

@Component({
    selector: 'app-display-error',
    templateUrl: './display-error.component.html',
    styleUrls: ['./display-error.component.scss'],
})
export class DisplayErrorComponent {
    @Input() control: FormControl;

    constructor() {}

    get errorMessage() {
        for (const propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName)) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
    }

    // getControlName(c: AbstractControl): string | null {
    //     const formGroup = c.parent.controls;
    //     return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    // }
}
