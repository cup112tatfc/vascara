import BtnBackToTop from 'components/btn-back-to-top/BtnBackToTop';
import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import * as React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  return (
    <div className="layout">
      <Header />
      {props.children}
      <BtnBackToTop />
      <Footer />
    </div>
  );
};

export default Layout;
