import FollowerModel from "../Models/FollowerModel";

// 1. Followers State - The global state relate to Followers:
export class FollowersState {
    public followers: FollowerModel[] = [];
}

// 2. followers Action Type - list of actions we can do on the above FollowersState:
export enum FollowersActionType {
    FetchAllFollowers = "FetchAllFollowers",
    Follow = "Follow",
    UnFollow = "UnFollow"
}

// 3. Followers Action - interface for building a single action from the above FollowersActionType
export interface FollowersAction {
    type: FollowersActionType; // The type of the acton to perform.
    payload: any; // The data we need to do that action
}

// 4. Action Creators - Functions for creating suitable Action objects: 
export function fetchAllFollowersAction(followers: FollowerModel[]): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.FetchAllFollowers, payload: followers };
    return action;
}
export function followAction(follower: FollowerModel): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.Follow, payload: follower };
    return action;
}
export function unFollowAction(followerId: number): FollowersAction {
    const action: FollowersAction = { type: FollowersActionType.UnFollow, payload: followerId };
    return action;
}

// 5. followers Reducer - Do any of the above actions:
export function followersReducer(currentState: FollowersState = new FollowersState(), action: FollowersAction): FollowersState {
    const newState = { ...currentState };

    switch (action.type) {

        case FollowersActionType.FetchAllFollowers:
            newState.followers = action.payload; // <-- here payload is all followers
            break;

        case FollowersActionType.Follow:
            newState.followers.push(action.payload); // <-- here payload is the Follower to add.
            break;

        case FollowersActionType.UnFollow:
            const indexToDelete = newState.followers.findIndex(f => f.followerId === action.payload); // <-- here payload is the followerId to delete.
            if (indexToDelete >= 0) {
                newState.followers.splice(indexToDelete, 1);
            }
            break;
    }

    return newState;
}

