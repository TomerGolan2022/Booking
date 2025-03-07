import { useEffect, useState } from "react";
import socketService from "../../../Services/SocketService";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import notifyService from "../../../Services/NotifyService";
import store from "../../../Redux/Store";
import UserModel from "../../../Models/UserModel";
import interceptorService from "../../../Services/InterceptorService";
import authService from "../../../Services/AuthService";
import FollowerModel from "../../../Models/FollowerModel";
import followersService from "../../../Services/FollowersService";
import "./VacationsList.css";

function VacationsList(): JSX.Element {

    // Create interceptors: 
    interceptorService.createInterceptors();

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        // Load user when component starts: 
        setUser(store.getState().authState.user);

        // Subscribe to changes - when user login/register/logout - reload again the user to the state: 
        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });

        // Unsubscribe when component destroyed:
        return () => {
            unsubscribe();
        };

    }, []);

    // State to handle vacations: 
    const [vacations, setVacations] = useState<VacationModel[]>([]);

      // Take the value:
      const userId = authService.getUserId();

    useEffect(() => {

        // Get all vacations (from backend or from store):
        vacationsService.getVacationsByUserId(userId)
            .then(vacations => setVacations(vacations))
            .catch(err => notifyService.error(err));

        // Subscribe for redux changes: 
        const unsubscribe = store.subscribe(() => {
            const dup = [...store.getState().vacationsState.vacationsByUser];
            setVacations(dup);
        });

        // Stop listening and unsubscribe: 
        return () => {
            socketService.disconnect();
            unsubscribe();
        };

    }, []);

    // State to handle followers: 
    const [followers, setFollowers] = useState<FollowerModel[]>([]);

    useEffect(() => {

        // Connect to socket.io: 
        socketService.connect();

        // Get all followers (from backend or from store):
        followersService.getAllFollowers()
            .then(followers => setFollowers(followers))
            .catch(err => notifyService.error(err));

        // Subscribe for redux changes: 
        const unsubscribe = store.subscribe(() => {
            const dup = [...store.getState().followersState.followers];
            setFollowers(dup);
        });

        // Stop listening and unsubscribe: 
        return () => {
            socketService.disconnect();
            unsubscribe();
        };

    }, []);

    return (
        <div className="VacationsList">

            {vacations.length === 0 && <Loading />}

            {/* Order By user Is-Following && followers number: */}
            {vacations.map(v => followers.find(f => f.vacationId === v.vacationId && f.userId === userId)
                && <VacationCard key={v.vacationId} vacation={v} allFollowers={followers} />)}

            {/* Order By followers number Only (the other vacations that user is Un-Following): */}
            {vacations.map(v => !followers.find(f => f.vacationId === v.vacationId && f.userId === userId)
                && <VacationCard key={v.vacationId} vacation={v} allFollowers={followers} />)}

        </div>
    );
}

export default VacationsList;
