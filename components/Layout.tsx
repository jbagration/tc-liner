import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ marginTop: '120px' }}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
