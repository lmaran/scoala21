// CoreModule is a conventional name for an NgModule with providers for the singleton services you load when the application starts.
// Import CoreModule in the root AppModule only. Never import CoreModule in any other module.
// Consider making CoreModule a pure services module with no declarations.

// modules (vendor)
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// modules (app)
import { SharedModule } from '../shared/shared.module'; // we need clarity for home, about or layout components

// services (singleton)
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from './services/message.service';
import { DishService } from './services/dish.service';
import { UserService } from './services/user.service';
import { ValidationService } from './services/validation.service';
import { EntityService } from './services/entity.service';
import { AuthenticationService } from './services/authentication.service';

// components (global / single use)
import { Layout2Component } from './components/layout2/layout2.component';
import { Header2Component } from './components/header2/header2.component';
import { VerticalNavComponent } from './components/vertical-nav/vertical-nav.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { DishListComponent } from './components/dish/dish-list/dish-list.component';
import { DishDetailComponent } from './components/dish/dish-detail/dish-detail.component';

// others
import { environment } from '../../environments/environment';
import { RouterEffects } from './state/router/router.effects';
import { CustomSerializer } from './state/router/router-state.serializer';
import { reducers, metaReducers } from './state/app.reducers';

export const COMPONENTS = [
    Layout2Component,
    Header2Component,
    VerticalNavComponent,

    AboutComponent,
    HomeComponent,

    UserListComponent,
    UserDetailComponent,
    DishListComponent,
    DishDetailComponent,
];

@NgModule({
    imports: [
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([RouterEffects]),

        // enable NgRx DevTool
        !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],

        // integrates Angular router with NgRx DevTool
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    ],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
})
export class CoreModule {
    // use the .forRoot() method to create a singleton instance of our module’s services
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                HttpErrorHandler,
                MessageService,
                DishService,
                UserService,
                ValidationService,
                EntityService,
                AuthenticationService,
                { provide: RouterStateSerializer, useClass: CustomSerializer },
            ],
        };
    }
}
