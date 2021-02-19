export type User = {
    readonly id?: number;
    readonly login: string;
    readonly uuid?: string;
    readonly email: string;
    readonly password?: string;
    readonly isActive?: boolean;
    readonly isAdmin?: boolean;
    readonly createTime?: string;
}