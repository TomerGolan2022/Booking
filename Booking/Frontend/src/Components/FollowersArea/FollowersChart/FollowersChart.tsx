import { useEffect, useState } from "react";
import socketService from "../../../Services/SocketService";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import Loading from "../../SharedArea/Loading/Loading";
import notifyService from "../../../Services/NotifyService";
import store from "../../../Redux/Store";
import interceptorService from "../../../Services/InterceptorService";
import authService from "../../../Services/AuthService";
import ChartCanvas from "../ChartCanvas/ChartCanvas";

function FollowersChart(): JSX.Element {

    // Create interceptors: 
    interceptorService.createInterceptors();

    // State to handle vacations: 
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {

         // Connect to socket.io: 
         socketService.connect();

        const userId = authService.getUserId();

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

    return (
        <div>

            {vacations.length === 0 && <Loading />}
            
            <ChartCanvas vacations={vacations.filter(v => v.followers > 0)}/>

        </div>
    );
}

export default FollowersChart;
