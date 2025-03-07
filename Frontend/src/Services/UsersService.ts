import axios from "axios";
import UserModel from "../Models/UserModel";
import { fetchUsersAction, updateUserAction, deleteUserAction } from "../Redux/UsersState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class UsersService {

    // Get all users: 
    public async getAllUsers(): Promise<UserModel[]> {
        let users = store.getState().usersState.users;
        if (users.length === 0) {
            const response = await axios.get<UserModel[]>(config.usersUrl);
            users = response.data;
            store.dispatch(fetchUsersAction(users)); // Add users to Redux
        }
        return users;
    }

    // Get one user by id: 
    public async getOneUser(id: number): Promise<UserModel> {
        const users = await this.getAllUsers();
        const user = users.find(u => u.userId === id);
        return user;
    }

    // Update existing user:
    public async updateUser(user: UserModel): Promise<UserModel> {
        const formData = new FormData();
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("username", user.username);
        formData.append("password", user.password);
        const response = await axios.put<UserModel>(config.usersUrl + user.userId, formData);
        const updatedUser = response.data;
        store.dispatch(updateUserAction(updatedUser));
        return updatedUser;
    }

    // Delete existing user by id: 
    public async deleteUser(id: number): Promise<void> {
        await axios.delete(config.usersUrl + id);
        store.dispatch(deleteUserAction(id));
    }

}

const usersService = new UsersService();

export default usersService;

