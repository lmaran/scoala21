import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BackupState } from './backup-state.interfaces';

// get a slice of state (in this case, only the entity related state)
const getBackupState = createFeatureSelector<BackupState>('backup');

// here 'state' is the result of first argument
export const getBackupItems = createSelector(getBackupState, state => state.backupItems);
