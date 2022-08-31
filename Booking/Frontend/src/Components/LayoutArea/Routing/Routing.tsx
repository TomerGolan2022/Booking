import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Role from "../../../Models/RoleModel";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import FollowersChart from "../../FollowersArea/FollowersChart/FollowersChart";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {

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


    return (
        <div>

            {/* Not Logged in */}

            {!authService.isLoggedIn() &&

                <Routes>

                    {/* Register: */}
                    <Route path="/register" element={<Register />} />

                    {/* Login: */}
                    <Route path="/login" element={<Login />} />

                    {/* Default Route */}
                    <Route path="" element={<Navigate to="/login" />} />

                    {/* Page Not Found*/}
                    <Route path="*" element={<PageNotFound />} />

                </Routes>

            }

            {/* Admin Logged in */}

            {user && user.role === Role.Admin &&

                <Routes>
                    {/* Logout: */}
                    <Route path="/logout" element={<Logout />} />

                    {/* Vacations list: */}
                    <Route path="/vacations" element={<VacationsList />} />

                    {/* /:prodId is a route parameter */}
                    <Route path="/vacations/details/:prodId" element={<VacationDetails />} />

                    {/* /:prodId is a route parameter */}
                    <Route path="/vacations/edit/:prodId" element={<EditVacation />} />

                    {/* Add new vacation: */}
                    <Route path="/add-new-vacation" element={<AddVacation />} />

                    {/* Add new vacation: */}
                    <Route path="/followers-chart" element={<FollowersChart />} />

                    {/* Default Route */}
                    <Route path="" element={<Navigate to="/vacations" />} />

                    {/* Page Not Found*/}
                    <Route path="*" element={<PageNotFound />} />

                </Routes>

            }

            {/* User Logged in */}

            {user && user.role === Role.User &&

                <Routes>

                    {/* Logout: */}
                    <Route path="/logout" element={<Logout />} />

                    {/* Vacations list: */}
                    <Route path="/vacations" element={<VacationsList />} />

                    {/* /:prodId is a route parameter */}
                    <Route path="/vacations/details/:prodId" element={<VacationDetails />} />

                    {/* Default Route */}
                    <Route path="" element={<Navigate to="/vacations" />} />

                    {/* Page Not Found*/}
                    <Route path="*" element={<PageNotFound />} />

                </Routes>

            }

        </div>
    );
}

export default Routing;
