export interface AuthorizationOptions {
    hasRole: Array<"officer" | "manager" | "admin">;
    allowSameUser?: boolean;
}
