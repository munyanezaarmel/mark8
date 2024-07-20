import React from 'react';
import { Layout as AntLayout } from 'antd';
import HeaderComponent from './Header/Header';
import FooterComponent from './Footer';
import OpenStore from './OpenStore';

const { Content } = AntLayout;



const Layout = ({ children, showOpenStore = true }) => {
  // Add your state and functions here
  const openStoreRef = React.useRef(null);

  return (
    <AntLayout style={{ backgroundColor: '#fff' }}>
      <HeaderComponent
        isMobile={false} // You need to implement this
        menuItems={[]} // Add your menu items here
        savedProductsCount={0} // Add your saved products count here
        setIsCartOpen={() => {}} // Add your cart open function here
        scrollToOpenStore={() => openStoreRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />
      <Content style={{ padding: '0 20px' }}>{children}</Content>
      {showOpenStore && <OpenStore openStoreRef={openStoreRef} />}
      <FooterComponent />
    </AntLayout>
  );
};

export default Layout;