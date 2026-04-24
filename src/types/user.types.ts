import { UserRole } from "@/lib/authutils";

export interface UserInfo {
    id : string;
    name : string,
    email : string,
    role : UserRole
}