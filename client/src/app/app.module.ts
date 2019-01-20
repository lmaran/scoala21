// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { ClarityModule } from '@clr/angular';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// @NgModule({
//     declarations: [AppComponent],
//     imports: [BrowserModule, AppRoutingModule, ClarityModule, BrowserAnimationsModule],
//     providers: [],
//     bootstrap: [AppComponent],
// })
// export class AppModule {}

// modules (vendor)
import { NgModule } from '@angular/core';

// modules (app)
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

// components (global / single use)
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [AppRoutingModule, CoreModule.forRoot()],
    bootstrap: [AppComponent],
})
export class AppModule {}
