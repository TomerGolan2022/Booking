import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import store from "../../../Redux/Store";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {

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
        <div className="Layout">

            <header>
                <Header />
            </header>

                <nav>
                    <Menu />
                </nav>
            
            <main>
                <Routing />
            </main>

        </div>
    );
}

export default Layout;
