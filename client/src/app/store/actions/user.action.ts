import { Action } from '@ngrx/store';
import { User } from '../../types/user.type';

export enum EUserActions {
    SetUser = '[User] Set user',
    LoadUser = '[User] Load user',
    LoadUserSuccess = '[User] Success loading user',
    LoadUserError = '[User] User loading error',
    RemoveUser = '[User] Remove user',
    SetError = '[User] Set error'
}

export class SetUser implements Action {
    public readonly type = EUserActions.SetUser;
    public payload: User;
}

export class LoadUser implements Action {
    public readonly type = EUserActions.LoadUser;
}

export class LoadUserSuccess implements Action {
    public readonly type = EUserActions.LoadUserSuccess;
    public payload: User;
}

export class LoadUserError implements Action {
    public readonly type = EUserActions.LoadUserError;
    public payload: any;
}

export class RemoveUser implements Action {
    public readonly type = EUserActions.RemoveUser;
}

export class SetUserError implements Action {
    public readonly type = EUserActions.SetError;
    public payload: any;
}

export type UserActions = SetUser | RemoveUser | LoadUser | LoadUserSuccess | LoadUserError | SetUserError;