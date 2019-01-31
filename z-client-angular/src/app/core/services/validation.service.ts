import { UserService } from './user.service';
import { AbstractControl } from '@angular/forms';

// note: this is a static class (no instance), then no need for an instance,
// so no need for DI, and therefore no need for @injectable

export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            required: 'Camp obligatoriu',
            email: 'Email invalid',
            minlength: `Minim ${validatorValue.requiredLength} caractere`,

            // custom validators
            invalidCreditCard: 'Is invalid credit card number',
            invalidPassword: 'Invalid password. Password must be at least 6 characters long, and contain a number.',
        };

        return config[validatorName];
    }

    // async validations:
    // https://alligator.io/angular/async-validators/
    // http://fiyazhasan.me/asynchronous-validation-in-angulars-reactive-forms-control/
    // static createValidator(userService: UserService) {
    //     return (control: AbstractControl) => {
    //         return userService.checkEmailNotTaken(control.value).map(res => {
    //             return res ? null : { emailTaken: true };
    //         });
    //     };
    // }

    // static creditCardValidator(control) {
    //     // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    //     if (
    //         control.value.match(
    // tslint:disable-next-line:max-line-length
    //             /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
    //         )
    //     ) {
    //         return null;
    //     } else {
    //         return { invalidCreditCard: true };
    //     }
    // }

    // static emailValidator(control) {
    //     // RFC 2822 compliant regex
    //     if (
    //         control.value.match(
    // tslint:disable-next-line:max-line-length
    //             /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    //         )
    //     ) {
    //         return null;
    //     } else {
    //         return { invalidEmailAddress: true };
    //     }
    // }

    // static passwordValidator(control) {
    //     // {6,100}           - Assert password is between 6 and 100 characters
    //     // (?=.*[0-9])       - Assert a string has at least one number
    //     if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
    //         return null;
    //     } else {
    //         return { invalidPassword: true };
    //     }
    // }
}
