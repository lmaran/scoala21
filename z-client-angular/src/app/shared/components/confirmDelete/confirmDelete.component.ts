import { Component, Input } from '@angular/core';

@Component({
    templateUrl: './confirmDelete.component.html',
    selector: 'app-modal-component',
})
export class AppModalComponent {
    @Input() btnText = 'OK!';

    show = false;
    msg = '';
    cb: Function;

    open(msg: string, cb) {
        this.show = true;
        this.msg = msg;
        this.cb = cb;
    }

    delete() {
        this.show = false;
        this.cb();
    }
}
