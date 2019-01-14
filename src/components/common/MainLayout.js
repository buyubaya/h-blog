import React from 'react';
import MainNavigator from 'components/common/MainNavigator';


const MainLayout = ({ children }) => (
    <div>
        <MainNavigator />
        {children}
    </div>
)

export default MainLayout;