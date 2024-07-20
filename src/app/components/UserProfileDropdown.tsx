import React, { useState } from 'react';
import { MenuProps, Modal, Dropdown, Typography, Space, Divider } from 'antd';
import { DownOutlined, UserOutlined, SmileOutlined, HeartOutlined ,SettingOutlined,ShoppingCartOutlined,ExclamationCircleOutlined,GlobalOutlined,LogoutOutlined} from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';






const UserProfileDropdown = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  function logout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
  
    router.push("/login");
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const items: MenuProps['items'] = [

    {
      key: '1',
      label: (
        <div>
          <Space>
              <Image
                src="/mark8 logo.png"
                alt="footer logo"
                width={40}
                height={40}
              />
              <div>
                <Typography className="font-bold text-xs">Yves Honore B.</Typography>
                <Typography className="footer-text">yveshonore@gmail.com</Typography>    
              </div>
           
            </Space>
            <Divider />
        </div>
      ),
    },
    {
      key: '2',
      label: 'My Account',
      icon: <UserOutlined />,
     
    },
    {
      key: '3',
      label: 'My orders',
      icon: <ShoppingCartOutlined />,
     
    },
    {
      key: '4',
      label: 'Help',
      icon:   <GlobalOutlined />,
     
    },
    {
      key: '5',
      label: 'About',
      icon: <ExclamationCircleOutlined />,
     
    },
    
    {
      key: '6',
      label: 'Settings',
      icon: <SettingOutlined />,
     
    },
    {
     
      key: 'divider',
      label: <Divider  />, 
  
    },
  
  
  
    {
      key: '7',
      label: 'Logout',
      icon:   <LogoutOutlined  />,
      onClick: () => logout()
     
    },
  
  
  
  ];

  return (
    <div>
      <Dropdown menu={{ items }} trigger={['click']}>
        <div className="user-profile" onClick={showModal}>
          <div className="icon-container">
            <UserOutlined />
          </div>
          <div className="icon-container">
            <DownOutlined />
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default UserProfileDropdown;
