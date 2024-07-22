import React, { useState } from "react";
import {
  Layout,
  Menu,
  Space,
  Button,
  Modal,
  Input,
  Drawer,
  Typography,
} from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  ShopOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import UserProfileDropdown from "../UserProfileDropdown";
import CartDrawer from "../CartDrawer";

const { Header } = Layout;
const { Text } = Typography;

const HeaderComponent = ({ scrollToOpenStore }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 989 });

  const handleStores = () => {
    router.push("/stores");
  };
  const handleHome = () => {
    router.push("/");
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const getSelectedKey = () => {
    if (pathname === "/") return "home";
    if (pathname === "/stores") return "stores";
    return "";
  };
  const isActive = (path) => pathname === path;

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined className={`menu-icon ${isActive('/') ? 'active' : ''}`} />,
      label: <span className="menu-text">Home</span>,
      onClick: () => router.push("/"),
    },
    {
      key: "stores",
      icon: <ShopOutlined className={`menu-icon ${isActive('/stores') ? 'active' : ''}`} />,
      label: <span className="menu-text">Stores</span>,
      onClick: handleStores,
    },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        padding: "0 20px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div className="flex lg:pl-12">
        <div className="logo gap-4">
          <Image
            src="/mark8 logo.png"
            alt="Mark8 Logo"
            width={40}
            height={40}
          />
          <div className="flex-col flex cursor-pointer " onClick={handleHome}>
            <Text strong>Mark8</Text>
            <Text type="secondary">by Awesomity Lab</Text>
          </div>
        </div>

        <div>
          {!isMobile && (
            <Menu
              className=""
              mode="horizontal"
              items={menuItems}
              selectedKeys={[getSelectedKey()]}
            />
          )}
        </div>
      </div>

      {!isMobile && (
        <Space>
          <div className="header-actions pr-12">
            <SearchOutlined
              className="search-icon header-icon"
              onClick={() => setIsSearchModalVisible(true)}
            />
            <Modal
              visible={isSearchModalVisible}
              footer={null}
              closable={false}
              className="search-modal"
              maskClosable={true}
              onCancel={() => setIsSearchModalVisible(false)}
              centered={true}
            >
              <div className="search-container">
                <Input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="open-transparent"
                  size="large"
                  placeholder="Search products, stores, etc..."
                  prefix={
                    <SearchOutlined
                      className="icon-color"
                      style={{ marginRight: "10px" }}
                    />
                  }
                />
                <Button
                  onClick={() => setIsSearchModalVisible(false)}
                  icon={<SearchOutlined />}
                  iconPosition="end"
                >
                  Search
                </Button>
              </div>
            </Modal>

            <div
              className="flex gap-1 cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCartOutlined className="header-icon" />
              My Cart
            </div>

            <Link href="/saved">
              <div className="flex gap-1">
                <HeartOutlined />
                Saved
              </div>
            </Link>

            <Button
              className="font-bold"
              icon={<ShopOutlined className="icon-color" />}
              iconPosition="end"
              onClick={scrollToOpenStore}
            >
              Open a store
            </Button>

            <UserProfileDropdown />
          </div>
        </Space>
      )}

      {isMobile && (
        <Button type="text" icon={<MenuOutlined />} onClick={toggleMenu} />
      )}

      <Drawer placement="right" onClose={toggleMenu} visible={menuVisible}>
        <Menu mode="vertical" items={menuItems} />
        <div style={{ padding: "20px 0" }}>
          <Input.Search placeholder="Search" style={{ marginBottom: 20 }} />
          <Button
            icon={<ShopOutlined className="icon-color" />}
            iconPosition="end"
            className="font-bold"
            onClick={() => {
              scrollToOpenStore();
              toggleMenu();
            }}
          >
            Open a store
          </Button>
          <div
            onClick={() => setIsCartOpen(true)}
            style={{ padding: "20px 0" }}
            className="flex gap-4 cursor-pointer"
          >
            <ShoppingCartOutlined className="header-icon" />
            My Cart
          </div>
          <Link href="/saved">
            <div style={{ padding: "20px 0" }} className="flex gap-4">
              <HeartOutlined className="header-icon" />
              Saved
            </div>
          </Link>
          <UserProfileDropdown />
        </div>
      </Drawer>

      <CartDrawer
        visible={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={[]} 
        removeFromCart={() => {}}
      />
    </Header>
  );
};

export default HeaderComponent;
