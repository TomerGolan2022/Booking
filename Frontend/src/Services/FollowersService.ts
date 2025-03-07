import axios from "axios";
import { fetchAllFollowersAction, followAction, unFollowAction } from "../Redux/FollowersState";
import store from "../Redux/Store";
import config from "../Utils/Config";
import FollowerModel from "../Models/FollowerModel";

class FollowersService {

    // Get all followers: 
    public async getAllFollowers(): Promise<FollowerModel[]> {
        let followers = store.getState().followersState.followers;
        if (followers.length === 0) {
            const response = await axios.get<FollowerModel[]>(config.followersUrl);
            followers = response.data;
            store.dispatch(fetchAllFollowersAction(followers)); // Add followers to Redux
        }
        return followers;
    }

    // Add new follower:
    public async follow(follower: FollowerModel): Promise<FollowerModel> {
        const response = await axios.post<FollowerModel>(config.followersUrl, follower);
        const newFollower = response.data;
        store.dispatch(followAction(newFollower));
        return newFollower;
    }

    // Delete existing follower by followerId: 
    public async unFollow(followerId: number): Promise<void> {
        await axios.delete(config.followersUrl + followerId);
        store.dispatch(unFollowAction(followerId));
    }

}

const followersService = new FollowersService();

export default followersService;

