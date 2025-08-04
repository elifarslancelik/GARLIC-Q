import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

const RootLayout = () => {
  const location = useLocation();
  
  // Don't show header on landing page
  const showHeader = location.pathname !== '/';

  return (
    <div className="App">
      {showHeader && <Header />}
      <Outlet />
    </div>
  );
};

export default RootLayout; 