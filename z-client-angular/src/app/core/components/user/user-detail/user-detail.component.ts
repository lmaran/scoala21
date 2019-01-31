import { Component, OnInit, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ValidationService } from '../../../services/validation.service';

import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.interfaces';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
    isEditMode: boolean;
    submitted: boolean;
    userForm: FormGroup;
    user: User;
    title: string;
    private formSubmitAttempt: boolean;

    // firstName = new FormControl('', Validators.required);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private location: Location,
        public renderer2: Renderer2
    ) {
        this.createForm();
    }

    createForm() {
        this.userForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            // age: '',
            email: [null, [Validators.required, Validators.email]],
        });
    }

    isFieldInvalid(field: string) {
        // return (
        //     (!this.userForm.get(field).valid && this.userForm.get(field).touched) ||
        //     (this.userForm.get(field).untouched && this.formSubmitAttempt)
        // );

        return !this.userForm.get(field).valid && this.formSubmitAttempt;
    }

    // // https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit
    // validateAllFormFields(formGroup: FormGroup) {
    //     Object.keys(formGroup.controls).forEach(field => {
    //         const control = formGroup.get(field);
    //         if (control instanceof FormControl) {
    //             control.markAsTouched({ onlySelf: true });
    //             console.log(field); // firstName, email
    //             console.log(control.errors); // {required:true, email:true}

    //             if (control.errors && control.errors.required) {
    //                 const propertyName = 'required';
    //                 const err = ValidationService.getValidatorErrorMessage(propertyName, control.errors[propertyName]);
    //                 console.log(err);
    //             } else if (control.errors && control.errors.email) {
    //                 const propertyName = 'email';
    //                 const err = ValidationService.getValidatorErrorMessage(propertyName, control.errors[propertyName]);
    //                 console.log(err);
    //             } else {
    //             }

    //             console.log('------------------');
    //         } else if (control instanceof FormGroup) {
    //             this.validateAllFormFields(control);
    //         }
    //     });
    // }

    onSubmit() {
        this.formSubmitAttempt = true;

        if (this.userForm.invalid) {
            return;
        }

        const user = this.userForm.value;
        this.submitted = true;

        if (this.isEditMode) {
            user._id = this.user._id;

            this.userService.updateUser(user).subscribe(saved => {
                this.router.navigate(['/users']);
            });
        } else {
            this.userService.createUser(user).subscribe(saved => {
                this.router.navigate(['/users']);
            });
        }
    }

    goBack() {
        // https://stackoverflow.com/a/36470719
        this.location.back();
    }

    // reset() {
    //     this.userForm.reset();
    //     this.formSubmitAttempt = false;
    // }

    ngOnInit() {
        // focus on first field https://stackoverflow.com/a/34573219/2726725
        this.renderer2.selectRootElement('#userLastName').focus();

        // or directly...https://github.com/rogerpadilla/angular2-minimalist-starter/blob/master/src/app/question/question-form.component.ts
        // const id = this.route.snapshot.params['id'];
        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            if (id) {
                this.isEditMode = true;
                this.title = 'Editeaza utilizator';

                this.userService.getUserById(id.toString()).subscribe((user: User) => {
                    this.user = user;
                    this.userForm.reset({ firstName: user.firstName, lastName: user.lastName });
                    // console.log(user);
                });
            } else {
                this.title = 'Adauga utilizator';
            }
        });
    }

    // // listen for changes on the entire form
    // onChanges(): void {
    //     this.userForm.valueChanges.subscribe(val => {
    //         this.getFirstErr = `Hello,
    //       My name is ${val.firstName} and my email is ${val.email}.`;
    //     });
    // }

    // listen for changes on on specific form control
    // onChanges(): void {
    //     this.userForm.get('email').valueChanges.subscribe(val => {
    //         console.log(this.userForm.get('email').errors);

    //         const errors = this.userForm.get('email').errors;
    //         if (errors) {
    //             const k = Object.keys(this.userForm.get('email').errors);
    //             // if (k && k.length > 0) {
    //             //     console.log(k[0]);
    //             // }
    //             this.getFirstErr = `My first err is ${k[0]}.`;
    //         }

    //         // this.getFirstErr = `My email is ${val}.`;

    //         // Object.keys(this.field.errors).forEach(key => {
    //         // console.log(key);
    //         // return key;
    //         // });
    //     });
    // }
}
