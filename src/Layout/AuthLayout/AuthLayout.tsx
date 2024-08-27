import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbars/Navbar";

function AuthLayout() {
    return(
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default AuthLayout;
