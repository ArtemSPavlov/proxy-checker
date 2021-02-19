import { UserActions, EUserActions } from '../actions/user.action';
import { initialUserState, IUserState } from '../state/user.state';

export const userReducers = function(
    state = initialUserState,
    action: UserActions
): IUserState {
    switch (action.type){
        case EUserActions.SetUser:
            return {
                ...state,
                selectedUser: action.payload
            }
        case EUserActions.LoadUser:
            return {
                ...state
            }
        case EUserActions.LoadUserSuccess:
            return {
                ...state,
                selectedUser: action.payload
            }
        case EUserActions.RemoveUser:
            return {
                ...initialUserState
            }
        case EUserActions.SetError:
            return {
                ...state,
                responseError: action.payload
            }
        default:
            return state;
    }
}