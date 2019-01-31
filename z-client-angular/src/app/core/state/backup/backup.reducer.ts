import { BackupActionTypes, BackupActions } from './backup.actions';
import { BackupState } from './backup-state.interfaces';

const initialState: BackupState = {
    backupItems: [],
};

export function backupReducer(state: BackupState = initialState, action: BackupActions): BackupState {
    switch (action.type) {
        case BackupActionTypes.ADD_BACKUP:
            return {
                ...state,
                backupItems: [action.payload],
            };

        default:
            return state;
    }
}
