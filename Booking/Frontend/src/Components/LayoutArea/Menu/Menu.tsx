import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Role from "../../../Models/RoleModel";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./Menu.css";

function Menu(): JSX.Element {

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
        <div className="Menu">

            {/* User Not Logged in: */}
            {!user &&
                <>
                    <NavLink to="/login"> Login</NavLink>

                    <span>  |  </span>

                    <NavLink to="/register">Register</NavLink>
                </>
            }

            {/* User & Admin: */}
            {user &&
                <NavLink to="/vacations">✈️ Vacations List</NavLink>
            }

            {/* Admin: */}
            {user && user.role === Role.Admin &&
                <>
                    <span>  |  </span>

                    <NavLink to="/add-new-vacation"> ➕ New Vacation</NavLink>

                    <span>  |  </span>

                    <NavLink to="/followers-chart">📉 Followers Chart</NavLink>
                </>
            }

        </div>
    );
}

export default Menu;
