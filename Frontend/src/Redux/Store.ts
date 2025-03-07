import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { vacationsReducer } from "./VacationsState";
import { usersReducer } from "./UsersState";
import { followersReducer } from "./FollowersState";

// Single object containing all reducers:
const reducers = combineReducers({
    vacationsState: vacationsReducer,
    authState: authReducer,
    usersState: usersReducer,
    followersState: followersReducer
});

const store = createStore(reducers);

export default store;
