import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarEnhanced from './NavbarEnhanced';
import FooterEnhanced from './FooterEnhanced';
import Breadcrumbs from './Breadcrumbs';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <NavbarEnhanced />
      <Breadcrumbs />
      <main className="layout-main">
        {children || <Outlet />}
      </main>
      <FooterEnhanced />
    </div>
  );
};

export default Layout;
