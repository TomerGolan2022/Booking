import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

// 1. State
export class AuthState {

    public token: string = null;
    public user: UserModel = null;
    public users: UserModel[] = [];

    public constructor() {
        this.token = localStorage.getItem("token"); // Restore token from storage.
        if (this.token) {
            this.user = (jwtDecode(this.token) as any).user;
        }
    }
}

// 2. Action Type
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// 3. Action
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

// 4. Action Creators
export function registerAction(token: string): AuthAction {
    const action: AuthAction = { type: AuthActionType.Register, payload: token };
    return action;
}
export function loginAction(token: string): AuthAction {
    const action: AuthAction = { type: AuthActionType.Login, payload: token };
    return action;
}
export function logoutAction(): AuthAction {
    const action: AuthAction = { type: AuthActionType.Logout };
    return action;
}

// 5. Reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };

    switch (action.type) {

        case AuthActionType.Register:
            newState.users.push(action.payload); // <-- here payload is the user to add.
            break;

        case AuthActionType.Login:
            const token = action.payload;
            newState.token = token;
            newState.user = (jwtDecode(token) as any).user;
            localStorage.setItem("token", token); // Save token in storage.
            break;

        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token"); // Clear token from storage.
            break;
    }

    return newState;

}
