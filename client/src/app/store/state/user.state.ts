import { User } from '../../types/user.type';

export interface IUserState {
    selectedUser: User,
    responseError: any
}

export const initialUserState: IUserState = {
    selectedUser: null,
    responseError: null
}
