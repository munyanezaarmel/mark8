import React, { useState } from 'react';
import { Layout, Menu, Space, Button, Modal, Input, Typography } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, HeartOutlined, ShopOutlined, MenuOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import UserProfileDropdown from './UserProfileDropdown';

const { Header } = Layout;
const { Text } = Typography;

const HeaderComponent = ({ isMobile, menuItems, savedProductsCount, setIsCartOpen, scrollToOpenStore }) => {
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Implement search logic here
    setIsSearchModalVisible(false);
  };

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        padding: '0 20px',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <div className="flex lg:pl-12">
        <div className="logo gap-4">
          <Image src="/mark8 logo.png" alt="Mark8 Logo" width={40} height={40} />
          <div className="flex-col flex">
            <Text strong>Mark8</Text>
            <Text type="secondary">by Awesomity Lab</Text>
          </div>
        </div>

        <div>{!isMobile && <Menu className="" mode="horizontal" items={menuItems} selectedKeys={['home']} />}</div>
      </div>

      {!isMobile && (
        <Space>
          <div className="header-actions pr-12">
            <SearchOutlined className="search-icon header-icon" onClick={() => setIsSearchModalVisible(true)} />
            <Modal
              visible={isSearchModalVisible}
              footer={null}
              closable={false}
              className="search-modal"
              maskClosable={true}
              onCancel={() => setIsSearchModalVisible(false)}
              centered={true}
            >
              <div className="search-container gap-4">
                <Typography>Search</Typography>
                <Input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="open-transparent"
                  size="large"
                  placeholder="Search products, stores, etc..."
                  prefix={<SearchOutlined className="icon-color" style={{ marginRight: '10px' }} />}
                />
                <Button onClick={handleSearch} icon={<SearchOutlined />} iconPosition="end">
                  Search
                </Button>
              </div>
            </Modal>
            <div className="flex gap-1 cursor-pointer" onClick={() => setIsCartOpen(true)}>
              <ShoppingCartOutlined className="header-icon" />
              My Cart
            </div>

            <Link href="/saved">
              <div className="flex gap-1">
                <HeartOutlined />
                Saved ({savedProductsCount})
              </div>
            </Link>

            <Button className="font-bold" icon={<ShopOutlined className="icon-color" />} iconPosition="end" onClick={scrollToOpenStore}>
              Open a store
            </Button>
            <UserProfileDropdown />
          </div>
        </Space>
      )}
      {isMobile && <Button type="text" icon={<MenuOutlined />} onClick={() => {}} />}
    </Header>
  );
};

export default HeaderComponent;