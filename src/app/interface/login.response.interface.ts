import { User } from "./user.interface";

export interface LoginResponse{
    user:  any;
    token: string;
    roleId: string;
    roleName: string;
    id: string;
}

