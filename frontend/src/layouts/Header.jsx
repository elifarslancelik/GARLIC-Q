import React from 'react';
import logo from '../../assets/garliq.png';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="GARLIC-Q Logo" className="w-8 h-8" />
          <span className="text-white text-apple font-light">GARLIC-Q</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 