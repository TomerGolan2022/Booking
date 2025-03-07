import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        
        try {
            authService.logout();
            // notifyService.success("You have been successfully logged-out");
            navigate("/login");
        }
        catch(err: any) {
            notifyService.error(err);
        }

    }, []);

    return null; // No need HTML.

}

export default Logout;
