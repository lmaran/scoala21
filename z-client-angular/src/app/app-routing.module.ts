// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './core/components/about/about.component';
import { HomeComponent } from './core/components/home/home.component';
import { UserListComponent } from './core/components/user/user-list/user-list.component';
import { UserDetailComponent } from './core/components/user/user-detail/user-detail.component';
import { DishListComponent } from './core/components/dish/dish-list/dish-list.component';
import { DishDetailComponent } from './core/components/dish/dish-detail/dish-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { state: 'home' } },
    { path: 'about', component: AboutComponent, data: { state: 'about' } },

    { path: 'users', component: UserListComponent },
    { path: 'users/add', component: UserDetailComponent },
    { path: 'users/:id', component: UserDetailComponent },
    // { path: 'users/:id/edit', component: UserFormComponent },

    { path: 'dishes', component: DishListComponent },
    { path: 'dishes/add', component: DishDetailComponent },
    { path: 'dishes/:id', component: DishDetailComponent },

    {
        path: 'entities',
        // canActivate: [AuthGuard],
        loadChildren: './entity/entity.module#EntityModule',
    },

    // { path: '**', component: NotFound }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
