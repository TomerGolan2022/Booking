class FollowerModel {
    public followerId: number;
    public vacationId: number;
    public userId: number;

    public constructor(follower: FollowerModel) {
        this.followerId = follower.followerId;
        this.vacationId = follower.vacationId;
        this.userId = follower.userId;
    }
}

export default FollowerModel;