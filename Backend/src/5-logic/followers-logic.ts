import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import FollowerModel from "../4-models/follower-model";
import VacationModel from "../4-models/vacation-model";
import socketLogic from "../5-logic/socket-logic";
import vacationsLogic from "./vacations-logic";

// Get all followers: 
async function getAllFollowers(): Promise<FollowerModel[]> {
    const sql = `SELECT * FROM followers`;
    const followers = await dal.execute(sql);
    return followers;
}

// Get all followers: 
async function getFollowersByVacation(vacationId: number): Promise<FollowerModel[]> {
    const sql = `SELECT followers.vacationId, COUNT(followers.userId) AS followers FROM followers WHERE vacationId = ?`;
    const followers = await dal.execute(sql, vacationId);
    return followers;
}

// Add follower to Vacation: 
async function follow(follower: FollowerModel): Promise<FollowerModel> {
    const sql = `INSERT INTO followers(vacationId, userId) VALUES(?, ?)`;
    const values = [follower.vacationId, follower.userId];
    const result: OkPacket = await dal.execute(sql, values);
    follower.followerId = result.insertId;
    // socketLogic.reportFollowVacation(follower)
    const allVacations = await vacationsLogic.getAllVacations();
    socketLogic.reportAllVacations(allVacations);
    return follower;
}

// Delete follower from Vacation: 
async function unFollow(followerId: number): Promise<void> {
    const sql = `DELETE FROM followers WHERE followerId=?`;
    const values = [followerId];
    await dal.execute(sql, values);
    socketLogic.reportUnFollowVacation(followerId);
    const allVacations = await vacationsLogic.getAllVacations();
    socketLogic.reportAllVacations(allVacations);
}

export default {
    getAllFollowers,
    getFollowersByVacation,
    follow,
    unFollow
};