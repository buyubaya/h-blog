import React from 'react';
import MainNavigator from 'components/common/MainNavigator';


const MainLayout = ({ children }) => (
    <div className='mainLayout'>
        <MainNavigator />
        {children}
    </div>
)

export default MainLayout;