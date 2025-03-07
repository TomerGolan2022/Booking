import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import Loading from "../../SharedArea/Loading/Loading";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import socketService from "../../../Services/SocketService";
import store from "../../../Redux/Store";
import UserModel from "../../../Models/UserModel";
import Role from "../../../Models/RoleModel";
import FollowerModel from "../../../Models/FollowerModel";
import followersService from "../../../Services/FollowersService";
import heartOutline from "../../../Assets/Images/heart-outline.png";
import heartFill from "../../../Assets/Images/heart-fill.png";
import "./VacationDetails.css";


function VacationDetails(): JSX.Element {

    // React Hook for getting the route parameter values in the current route:
    const params = useParams();

    const navigate = useNavigate();

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

    const [vacation, setVacation] = useState<VacationModel>();

    useEffect(() => {

        // Take the value:
        const vacationId: number = +params.prodId; // prodId is the name of the route parameter.
        const userId = authService.getUserId();

        vacationsService.getOneVacation(vacationId, userId)
            .then(vacation => setVacation(vacation))
            .catch(err => notifyService.error(err));

            // Subscribe for redux changes: 
        const unsubscribe = store.subscribe(() => {
            setVacation(store.getState().vacationsState.vacationsByUser.find(v => v.vacationId === vacationId));
        });

        // Stop listening and unsubscribe: 
        return () => {
            socketService.disconnect();
            unsubscribe();
        };

    }, []);

    const [allFollowers, setAllFollowers] = useState<FollowerModel[]>();

    useEffect(() => {

        // Connect to socket.io: 
        socketService.connect();

        followersService.getAllFollowers()
            .then(allFollowers => setAllFollowers(allFollowers))
            .catch(err => notifyService.error(err));

        // Subscribe for redux changes: 
        const unsubscribe = store.subscribe(() => {
            const dup = [...store.getState().followersState.followers];
            setAllFollowers(dup);
        });

        // Stop listening and unsubscribe: 
        return () => {
            socketService.disconnect();
            unsubscribe();
        };

    }, []);

    // For Admin:
    async function deleteVacation() {
        try {
            const ok = window.confirm("Are you sure you want to delete?");
            if(!ok) return;
            await vacationsService.deleteVacation(vacation.vacationId);
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
            follower.vacationId = vacation.vacationId;
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
        const vacationId = vacation.vacationId;
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
        <div className="VacationDetails Box">

            {!vacation && <Loading />}

            <NavLink to="/vacations">🔙</NavLink>

            {/* Admin */}
            {vacation && user && user.role === Role.Admin && <>
                <div className="card-details">
                    <div className="card-details-price">${vacation.price}</div>
                    <div className="card-details-header">
                        <div className="details-profile">
                            <span className="details-letter">B</span>
                        </div>
                        <div className="card-details-title-group">
                            <h5 className="card-details-title">{vacation.location}</h5>
                            <div className="card-details-date">From: {vacation.fromDate} | Until: {vacation.untilDate}</div>
                        </div>
                    </div>
                    <img className="card-details-image" src={config.vacationImagesUrl + vacation.imageName} />
                    <div className="card-details-text">{vacation.description}</div>
                    <div className="card-details-like-bar">
                        <NavLink to={"/vacations/edit/" + vacation.vacationId}>✏️</NavLink>
                        <div className="details-like-text">
                            <b>{vacation.followers}</b> Likes
                        </div>
                        <NavLink to="#" onClick={deleteVacation}>🗑️</NavLink>
                    </div>
                </div>
            </>}

            {/* User */}
            {vacation && user && user.role === Role.User && <>
                <div className="card-details">
                    <div className="card-details-price">${vacation.price}</div>
                    <div className="card-details-header">
                        <div className="details-profile">
                            <span className="details-letter">B</span>
                        </div>
                        <div className="card-details-title-group">
                            <h5 className="card-details-title">{vacation.location}</h5>
                            <div className="card-details-date">From: {vacation.fromDate} | Until: {vacation.untilDate}</div>
                        </div>
                    </div>
                    <img className="card-details-image" src={config.vacationImagesUrl + vacation.imageName} />
                    <div className="card-details-text">{vacation.description}</div>
                    <div className="card-details-like-bar">
                        {!allFollowers.find(f => f.vacationId === vacation.vacationId && f.userId === user.userId) &&
                            <NavLink to="#" onClick={follow} className={"Follow"}>
                                <img className="card-details-like-icon" src={heartOutline} alt="Logo" />
                            </NavLink>
                        }
                        {allFollowers.find(f => f.vacationId === vacation.vacationId && f.userId === user.userId) &&
                            <NavLink to="#" onClick={unFollow} className={"UnFollow"}>
                                <img className="card-details-like-icon" src={heartFill} alt="Logo" />
                            </NavLink>
                        }
                        <div className="details-like-text">
                            <b>{allFollowers.filter(f => f.vacationId === vacation.vacationId).length}</b> Likes
                        </div>
                    </div>
                </div>
            </>}

        </div>
    );
}

export default VacationDetails;
