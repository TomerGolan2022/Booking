import UserModel from "../Models/UserModel";

// 1. users State - The global state relate to users:
export class UsersState {
    public users: UserModel[] = [];
}

// 2. users Action Type - list of actions we can do on the above UsersState:
export enum UsersActionType {
    FetchUsers = "FetchUsers",
    UpdateUser = "UpdateUser",
    DeleteUser = "DeleteUser"
}

// 3. user Action - interface for building a single action from the above usersActionType
export interface UsersAction {
    type: UsersActionType; // The type of the acton to perform.
    payload: any; // The data we need to do that action
}

// 4. Action Creators - Functions for creating suitable Action objects: 
export function fetchUsersAction(users: UserModel[]): UsersAction {
    const action: UsersAction = { type: UsersActionType.FetchUsers, payload: users };
    return action;
}
export function updateUserAction(user: UserModel): UsersAction {
    const action: UsersAction = { type: UsersActionType.UpdateUser, payload: user };
    return action;
}
export function deleteUserAction(id: number): UsersAction {
    const action: UsersAction = { type: UsersActionType.DeleteUser, payload: id };
    return action;
}

// 5. users Reducer - Do any of the above actions:
export function usersReducer(currentState: UsersState = new UsersState(), action: UsersAction): UsersState {
    const newState = { ...currentState };

    switch (action.type) {

        case UsersActionType.FetchUsers:
            newState.users = action.payload; // <-- here payload is all users
            break;

        case UsersActionType.UpdateUser:
            const indexToUpdate = newState.users.findIndex(v => v.userId === action.payload.id); // <-- here payload is the user to update.
            if (indexToUpdate >= 0) {
                newState.users[indexToUpdate] = action.payload;
            }
            break;

        case UsersActionType.DeleteUser:
            const indexToDelete = newState.users.findIndex(v => v.userId === action.payload); // <-- here payload is the id to delete.
            if (indexToDelete >= 0) {
                newState.users.splice(indexToDelete, 1);
            }
            break;
    }

    return newState;
}

