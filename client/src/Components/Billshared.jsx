//To share the bill details with both admin and cashier


import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext'; 
import AdminLayout from '../Components/AdminLayout';
import CashierLayout from '../Components/CashierLayout';

import Billdetails from '../Pages/Billdetails';

const Billshared = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return null; 
    }

    const Layout = currentUser.usertype === 'cashier' ? CashierLayout:AdminLayout;

    return (
        <Layout>
            <Billdetails />
        </Layout>
    );
};

export default Billshared;
