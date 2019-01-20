import { Action } from '@ngrx/store';
import { BackupItem } from '../../interfaces/backup.interfaces';

export enum BackupActionTypes {
    ADD_BACKUP = '[BackupState] Add Backup',
}

export class AddBackup implements Action {
    readonly type = BackupActionTypes.ADD_BACKUP;

    constructor(public payload: BackupItem) {}
}

export type BackupActions = AddBackup;
