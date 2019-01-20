import { Component, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../../../interfaces/dish.interfaces';
import { DishService } from '../../../services/dish.service';
import { AppModalComponent } from '../../../../shared/components/confirmDelete/confirmDelete.component';

@Component({
    selector: 'app-dish-list',
    templateUrl: './dish-list.component.html',
    styleUrls: ['./dish-list.component.scss'],
    providers: [DishService],
})
export class DishListComponent implements OnInit {
    newDish: Dish;

    dishes: Dish[] = [];
    deleteModal = false;
    selectedDish: Dish;
    title: string;
    categoryList: any;

    // Don't forget to add this (child) component in the current html
    @ViewChild(AppModalComponent) modal: AppModalComponent;

    constructor(private dishService: DishService) {}

    ngOnInit() {
        // this.dishService.getAllDishes().subscribe(dishes => {
        //     this.dishes = dishes;
        //     // console.log(dishes);
        // });
        this.categoryList = [
            { label: '' },
            { value: '1', label: 'Supa' },
            { value: '2', label: 'Felul doi' },
            { value: '3', label: 'Salata' },
            { value: '4', label: 'Desert' },
        ];

        this.title = 'Feluri de mancare';
        this.refreshDishList();
    }

    refreshDishList() {
        this.dishService.getAllDishes().subscribe(dishes => {
            // this.dishes = dishes;
            this.dishes = dishes.map(x => {
                const newCategory = this.categoryList.find(c => c.value === x.category);
                if (newCategory) {
                    x.category = newCategory.label;
                }
                return x;
            });
        });
    }

    // toggleDishComplete(dish) {
    //     this.dishDataService.toggleDishComplete(dish);
    // }

    // get dishes() {
    //     return this.dishDataService.getAllDishes();
    // }

    // /**
    //  * Delete dish (met.1)
    //  */
    // confirmDeleteDish(dish) {
    //     this.deleteModal = true;
    //     this.selectedDish = dish;
    // }

    // met.1
    // deleteDish(dishId) {
    //     this.deleteModal = false;
    //     this.dishService.deleteDishById(dishId).subscribe(res => {
    //         this.refreshDishList();
    //     });
    // }

    // met 2.
    deleteDish = function(dish) {
        this.modal.open(`${dish.firstName} ${dish.lastName}`, () => {
            this.dishService.deleteDishById(dish._id).subscribe(res => {
                this.refreshDishList();
            });
            // this.modal.show = false;
        });
    };
}
