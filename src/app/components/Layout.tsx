import React, { useRef } from "react";
import { Layout } from "antd";
import HeaderComponent from "./Header/Header";
import FooterComponent from "./Footer";
import OpenStoreComponent from "./OpenStore";
import { Suspense } from 'react';
import Skeleton from "./Skeleton";


const { Content } = Layout;
interface MainLayoutProps {
  children: React.ReactNode;
  savedProductsCount?: number;
  setIsCartOpen?: (isOpen: boolean) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const openStoreRef = useRef<HTMLDivElement>(null);

  const scrollToOpenStore = () => {
    openStoreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Suspense fallback={<Skeleton/>}>

 
      <HeaderComponent scrollToOpenStore={scrollToOpenStore} />
      <Content style={{ padding: "0 20px" }}>
        {children}
        <OpenStoreComponent openStoreRef={openStoreRef} />
      </Content>
      <FooterComponent />
      </Suspense>
    </Layout>
  );
};

export default MainLayout;
