import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserService } from '../../user/user.service';
import { IAppState } from '../state/app.state';
import { EUserActions, LoadUser, LoadUserSuccess, LoadUserError, SetUserError } from '../actions/user.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
    constructor(
        private userService: UserService,
        private actions$: Actions,
        private store: Store<IAppState>
    ){}

    @Effect()
    getUser$ = this.actions$.pipe(
        ofType<LoadUser>(EUserActions.LoadUser),
        switchMap(() => {
            return this.userService.getUser().pipe(
                map(data => {
                    const responceAction = new LoadUserSuccess();
                    responceAction.payload = data;
                    return responceAction;
                }),
                catchError(error => {
                    const errorAction = new SetUserError();
                    errorAction.payload = error;
                    return of(errorAction);
                })
            )
        })
    )
}