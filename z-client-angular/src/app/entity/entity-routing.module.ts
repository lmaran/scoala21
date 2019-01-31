import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntityListPageComponent } from './containers/entity-list-page/entity-list-page.component';
import { EntityCreatePageComponent } from './containers/entity-create-page/entity-create-page.component';
import { EntityEditPageComponent } from './containers/entity-edit-page/entity-edit-page.component';

const routes: Routes = [
    { path: '', component: EntityListPageComponent },
    { path: 'new', component: EntityCreatePageComponent },
    { path: ':id', component: EntityEditPageComponent },
    { path: ':id/fields/new', component: EntityCreatePageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EntityRoutingModule {}
