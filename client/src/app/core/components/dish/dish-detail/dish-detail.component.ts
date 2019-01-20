import { Component, OnInit, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { ValidationService } from '../../../services/validation.service';

import { DishService } from '../../../services/dish.service';
import { Dish } from '../../../interfaces/dish.interfaces';

@Component({
    selector: 'app-dish-detail',
    templateUrl: './dish-detail.component.html',
    styleUrls: ['./dish-detail.component.scss'],
})
export class DishDetailComponent implements OnInit {
    isEditMode: boolean;
    submitted: boolean;
    dishForm: FormGroup;
    dish: Dish;
    title: string;
    private formSubmitAttempt: boolean;
    categoryList: any;
    // categoryList: [
    //     { label: '' },
    //     { value: '1'; label: 'Supa' },
    //     { value: '2'; label: 'Felul doi' },
    //     { value: '3'; label: 'Salata' },
    //     { value: '4'; label: 'Desert' }
    // ];

    // firstName = new FormControl('', Validators.required);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private dishService: DishService,
        private location: Location,
        public renderer2: Renderer2
    ) {
        this.createForm();
    }

    createForm() {
        this.dishForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: [''],
            category: '',
            calories: '',
            isFasting: false,
        });
    }

    isFieldInvalid(field: string) {
        // return (
        //     (!this.dishForm.get(field).valid && this.dishForm.get(field).touched) ||
        //     (this.dishForm.get(field).untouched && this.formSubmitAttempt)
        // );

        return !this.dishForm.get(field).valid && this.formSubmitAttempt;
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

        if (this.dishForm.invalid) {
            return;
        }

        const dish = this.dishForm.value;
        this.submitted = true;

        if (this.isEditMode) {
            dish._id = this.dish._id;

            this.dishService.updateDish(dish).subscribe(saved => {
                this.router.navigate(['/dishes']);
            });
        } else {
            this.dishService.createDish(dish).subscribe(saved => {
                this.router.navigate(['/dishes']);
            });
        }
    }

    goBack() {
        // https://stackoverflow.com/a/36470719
        this.location.back();
    }

    // reset() {
    //     this.dishForm.reset();
    //     this.formSubmitAttempt = false;
    // }

    ngOnInit() {
        this.categoryList = [
            { label: '' },
            { value: '1', label: 'Supa' },
            { value: '2', label: 'Felul doi' },
            { value: '3', label: 'Salata' },
            { value: '4', label: 'Desert' },
        ];

        // focus on first field https://stackoverflow.com/a/34573219/2726725
        this.renderer2.selectRootElement('#dishName').focus();

        // or directly...https://github.com/rogerpadilla/angular2-minimalist-starter/blob/master/src/app/question/question-form.component.ts
        // const id = this.route.snapshot.params['id'];
        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            if (id) {
                this.isEditMode = true;
                this.title = 'Editeaza felul de mancare';

                this.dishService.getDishById(id.toString()).subscribe((dish: any) => {
                    this.dish = dish;
                    this.dishForm.reset({
                        name: dish.name,
                        category: dish.category,
                        calories: dish.calories,
                        description: dish.description,
                        isFasting: dish.isFasting,
                    });
                });
            } else {
                this.title = 'Adauga fel de mancare';
            }
        });
    }

    // // listen for changes on the entire form
    // onChanges(): void {
    //     this.dishForm.valueChanges.subscribe(val => {
    //         this.getFirstErr = `Hello,
    //       My name is ${val.firstName} and my email is ${val.email}.`;
    //     });
    // }

    // listen for changes on on specific form control
    // onChanges(): void {
    //     this.dishForm.get('email').valueChanges.subscribe(val => {
    //         console.log(this.dishForm.get('email').errors);

    //         const errors = this.dishForm.get('email').errors;
    //         if (errors) {
    //             const k = Object.keys(this.dishForm.get('email').errors);
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
