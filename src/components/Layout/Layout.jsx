import React from 'react';
import Header from '../Header/Header';
import Lowerheader from '../Header/Lowerheader';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Lowerheader />
      <main>{children}</main> 
    </div>
  );
};

export default Layout;
