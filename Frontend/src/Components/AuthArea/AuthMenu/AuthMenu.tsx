import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Role from "../../../Models/RoleModel";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

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
        <div className="AuthMenu">

            {user && <span className="logout">Hello {user.firstName} {user.lastName} | <NavLink to="/logout">Logout</NavLink> </span>}

            {!user && <span className="login-register">Hello Guest | <NavLink to="/login">Login</NavLink> | <NavLink to="/register">Register</NavLink> </span>}

        </div>
    );
}

export default AuthMenu;
