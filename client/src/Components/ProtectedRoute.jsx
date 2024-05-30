import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext"; // Adjusted import path

const ProtectedRoute = ({ allowedRoles }) => {
    const { currentUser } = useContext(AuthContext);

    console.log('ProtectedRoute - currentUser:', currentUser);
    console.log('ProtectedRoute - allowedRoles:', allowedRoles);

    //user is not logged inNULL
    if (!currentUser) {
        console.log('No currentUser, redirecting to /Homefilter');
        return <Navigate to="/Home" replace />;
    }
 //not allowed
    if (!allowedRoles.includes(currentUser.usertype)) {
        console.log(`Usertype ${currentUser.usertype} not allowed, redirecting to /Home`);
        return <Navigate to="/Home" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;

