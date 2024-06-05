import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext'; // Adjust the path as necessary
import CashierLayout from '../Components/CashierLayout';
import AdminLayout from '../Components/AdminLayout';
import Billdetails from '../Pages/Billdetails';

const Billshared = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return null; // or some fallback UI
    }

    const Layout = currentUser.usertype === 'cashier' ? CashierLayout : AdminLayout;

    return (
        <Layout>
            <Billdetails />
        </Layout>
    );
};

export default Billshared;
