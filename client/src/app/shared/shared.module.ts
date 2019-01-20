// SharedModule is a conventional name for an NgModule with the components, directives, and pipes that you use everywhere in your app.
// This module should consist entirely of declarations, most of them exported.
// The SharedModule may re-export other widget modules, such as CommonModule, FormsModule, and NgModules with the UI controls
// that you use most widely.
// The SharedModule should not have providers nor should any of its imported or re-exported modules have providers.
// Import the SharedModule in your feature modules, both those loaded when the app starts and those you lazy load later.

// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';

// components
import { AppModalComponent } from './components/confirmDelete/confirmDelete.component';
import { DisplayErrorComponent } from './components/display-error/display-error.component';
import { MessagesComponent } from './components/messages/messages.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

// directives, pipes

export const MODULES = [CommonModule, ReactiveFormsModule, ClarityModule, RouterModule];
export const COMPONENTS = [AppModalComponent, DisplayErrorComponent, MessagesComponent, BreadcrumbComponent];

@NgModule({
    imports: [...MODULES],
    declarations: [...COMPONENTS],
    exports: [...MODULES, ...COMPONENTS],
})
export class SharedModule {}
