// modules (vendor)
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// modules (app)
import { SharedModule } from '../shared/shared.module';
import { EntityRoutingModule } from './entity-routing.module';

// containers (smart)
import { EntityListPageComponent } from './containers/entity-list-page/entity-list-page.component';
import { EntityCreatePageComponent } from './containers/entity-create-page/entity-create-page.component';
import { EntityEditPageComponent } from './containers/entity-edit-page/entity-edit-page.component';

// components (pure)
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { EntityDetailComponent } from './components/entity-detail/entity-detail.component';
import { EntityFieldListComponent } from './components/entity-field-list/entity-field-list.component';
import { EntityFieldDetailComponent } from './components/entity-field-detail/entity-field-detail.component';

// ngrx store
import { reducer } from './state/entity.reducer';
import { EntityEffects } from './state/entity.effects';
// import { RouterEffects } from '../core/state/effects/router.effects';

export const CONTAINERS = [EntityListPageComponent, EntityCreatePageComponent, EntityEditPageComponent];
export const COMPONENTS = [
    EntityListComponent,
    EntityDetailComponent,
    EntityFieldListComponent,
    EntityFieldDetailComponent,
];

@NgModule({
    imports: [
        SharedModule,
        EntityRoutingModule,

        /**
         * StoreModule.forFeature is used for composing state
         * from feature modules. These modules can be loaded
         * eagerly or lazily and will be dynamically added to
         * the existing state.
         */
        StoreModule.forFeature('entity', reducer),

        /**
         * Effects.forFeature is used to register effects
         * from feature modules. Effects can be loaded
         * eagerly or lazily and will be started immediately.
         *
         * All Effects will only be instantiated once regardless of
         * whether they are registered once or multiple times.
         */
        EffectsModule.forFeature([EntityEffects]),
    ],
    declarations: [...CONTAINERS, ...COMPONENTS],
})
export class EntityModule {}
