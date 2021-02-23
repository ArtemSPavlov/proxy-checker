enum Roles {
    user,
    admin
}

export type User = {
    readonly id?: number;
    readonly login: string;
    readonly uuid?: string;
    readonly email: string;
    readonly password?: string;
    readonly isActive?: boolean;
    readonly role?: Roles;
    readonly createTime?: string;
}