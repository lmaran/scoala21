import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../interfaces/user.interfaces';
import { UserService } from '../../../services/user.service';
import { AppModalComponent } from '../../../../shared/components/confirmDelete/confirmDelete.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    providers: [UserService],
})
export class UserListComponent implements OnInit {
    newUser: User;

    users: User[] = [];
    deleteModal = false;
    selectedUser: User;

    // Don't forget to add this (child) component in the current html
    @ViewChild(AppModalComponent) modal: AppModalComponent;

    constructor(private userService: UserService) {}

    ngOnInit() {
        // this.userService.getAllUsers().subscribe(users => {
        //     this.users = users;
        //     // console.log(users);
        // });
        this.refreshUserList();
    }

    refreshUserList() {
        this.userService.getAllUsers().subscribe(
            users => {
                this.users = users;
                // this.users = Array.from(users).concat([]);
            } // success path
            // error => this.error = error // error path
        );
    }

    // toggleUserComplete(user) {
    //     this.userDataService.toggleUserComplete(user);
    // }

    // get users() {
    //     return this.userDataService.getAllUsers();
    // }

    // /**
    //  * Delete user (met.1)
    //  */
    // confirmDeleteUser(user) {
    //     this.deleteModal = true;
    //     this.selectedUser = user;
    // }

    // met.1
    // deleteUser(userId) {
    //     this.deleteModal = false;
    //     this.userService.deleteUserById(userId).subscribe(res => {
    //         this.refreshUserList();
    //     });
    // }

    // met 2.
    deleteUser = function(user) {
        this.modal.open(`${user.firstName} ${user.lastName}`, () => {
            this.userService.deleteUserById(user._id).subscribe(res => {
                this.refreshUserList();
            });
            // this.modal.show = false;
        });
    };
}
