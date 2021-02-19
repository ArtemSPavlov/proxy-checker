import { createSelector } from '@ngrx/store';
import { IAppState } from "../state/app.state";
import { IUserState } from '../state/user.state';

const selectUser = function(state: IAppState){
    return state.user;
}

export const selectSelectedUser = createSelector(
    selectUser,
    (state: IUserState) => state.selectedUser
)

export const userResponseError = createSelector(
    selectUser,
    (state: any) => state.responseError
)