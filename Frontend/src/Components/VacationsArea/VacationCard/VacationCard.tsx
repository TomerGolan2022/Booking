import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import config from "../../../Utils/Config";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import store from "../../../Redux/Store";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import Role from "../../../Models/RoleModel";
import FollowerModel from "../../../Models/FollowerModel";
import followersService from "../../../Services/FollowersService";
import heartOutline from "../../../Assets/Images/heart-outline.png";
import heartFill from "../../../Assets/Images/heart-fill.png";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
    allFollowers: FollowerModel[];
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        // Load user when component starts: 
        setUser(store.getState().authState.user);
        // Subscribe to changes - when user login/register/logout - reload again the user to the state: 
        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });
        // Unsubscribe when component destroyed:
        return () => unsubscribe();

    }, []);

    const navigate = useNavigate();

    // For Admin:
    async function deleteVacation() {
        try {
            const ok = window.confirm("Are you sure you want to delete?");
            if(!ok) return;
            await vacationsService.deleteVacation(props.vacation.vacationId);
            notifyService.success("Vacation has been deleted.");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    // For User:
    async function follow() {
        try {
            const follower = new FollowerModel();
            follower.vacationId = props.vacation.vacationId;
            follower.userId = store.getState().authState.user.userId;
            const newFollower = await followersService.follow(follower);
            // notifyService.success(`New FollowerId: ${newFollower.followerId}`);
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    // For User:
    async function unFollow() {
        const followers = await followersService.getAllFollowers();
        const vacationId = props.vacation.vacationId;
        const userId = store.getState().authState.user.userId;
        const follower = followers.find(f => f.vacationId === vacationId && f.userId === userId);
        try {
            await followersService.unFollow(follower.followerId);
            // notifyService.success(`FollowerId: ${follower.followerId} has been deleted.`);
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="VacationCard Box">

            {/* Vacation Data: */}

            {/* Admin */}

            {user && user.role === Role.Admin &&

                <div className="card">
                    <div className="card-price">${props.vacation.price}</div>
                    <div className="card-header">
                        <div className="profile">
                            <span className="letter">B</span>
                        </div>
                        <div className="card-title-group">
                            <h5 className="card-title">{props.vacation.location}</h5>
                            <div className="card-date">From: {props.vacation.fromDate} | Until: {props.vacation.untilDate}</div>
                        </div>
                    </div>
                    <NavLink to={"/vacations/details/" + props.vacation.vacationId}>
                        <img className="card-image" src={config.vacationImagesUrl + props.vacation.imageName} />
                    </NavLink>
                    <div className="card-text">{props.vacation.description}</div>
                    <div className="card-like-bar">
                        <NavLink to={"/vacations/edit/" + props.vacation.vacationId}>✏️</NavLink>
                        <div className="like-text">
                            <b>{props.vacation.followers}</b> Likes
                        </div>
                        <NavLink to="#" onClick={deleteVacation}>🗑️</NavLink>
                    </div>

                </div>

            }

            {/* User */}

            {user && user.role === Role.User &&

                <div className="card">
                    <div className="card-price">${props.vacation.price}</div>
                    <div className="card-header">
                        <div className="profile">
                            <span className="letter">B</span>
                        </div>
                        <div className="card-title-group">
                            <h5 className="card-title">{props.vacation.location}</h5>
                            <div className="card-date">From: {props.vacation.fromDate} | Until: {props.vacation.untilDate}</div>
                        </div>
                    </div>
                    <NavLink to={"/vacations/details/" + props.vacation.vacationId}>
                        <img className="card-image" src={config.vacationImagesUrl + props.vacation.imageName} />
                    </NavLink>
                    <div className="card-text">{props.vacation.description}</div>
                    <div className="card-like-bar">
                        {!props.allFollowers.find(f => f.vacationId === props.vacation.vacationId && f.userId === user.userId) &&
                            <NavLink to="#" onClick={follow} className={"Follow"}>
                                <img className="card-like-icon" src={heartOutline} alt="Logo" />
                            </NavLink>
                        }
                        {props.allFollowers.find(f => f.vacationId === props.vacation.vacationId && f.userId === user.userId) &&
                            <NavLink to="#" onClick={unFollow} className={"UnFollow"}>
                                <img className="card-like-icon" src={heartFill} alt="Logo" />
                            </NavLink>
                        }
                        <div className="like-text">
                            <b>{props.vacation.followers}</b> Likes
                        </div>
                    </div>

                </div>
            }

        </div>
    );
}

export default VacationCard;
