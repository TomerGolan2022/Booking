import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class AuthService {

    // Register (Add new user)
    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.registerUrl, user);
        const token = response.data;
        store.dispatch(registerAction(token));
    }

    // Login
    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(config.loginUrl, credentials);
        const token = response.data;
        store.dispatch(loginAction(token));
    }

    // Logout
    public logout(): void {
        store.dispatch(logoutAction());
        // clean vacation list:
        store.getState().vacationsState.vacationsByUser = [];
        store.getState().followersState.followers = [];
    }

    // Is Logged in
    public isLoggedIn(): boolean {
        return store.getState().authState.user !== null;
    }

    // Get userId
    public getUserId(): number {
        return store.getState().authState.user.userId;
    }

}

const authService = new AuthService();

export default authService;