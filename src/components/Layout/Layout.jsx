import React from 'react';
import Header from '../Header/Header';
import Lowerheader from '../Header/Lowerheader';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Lowerheader />
      <main>{children}</main> {/* Wrap children in <main> for semantics */}
    </div>
  );
};

export default Layout;
