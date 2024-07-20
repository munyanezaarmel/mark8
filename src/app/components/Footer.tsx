import React from 'react';
import { Layout, Row, Col, Space, Typography } from 'antd';
import { XOutlined, InstagramOutlined, YoutubeOutlined, LinkedinOutlined } from '@ant-design/icons';
import Image from 'next/image';

const { Footer } = Layout;
const { Text } = Typography;

const FooterComponent = () => {
  return (
    <Footer style={{ background: '#F4F5F6' }}>
      <Row justify="space-between" align="middle">
        <Col xs={24} sm={12} md={12} lg={6}>
          <Space>
            <Image src="/mark8 logo.png" alt="Mark8 Logo" width={40} height={40} />
            <Text strong>Mark8</Text>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <div className="flex items-center">
            <Space>
              <Typography className="font-bold">©{new Date().getFullYear()}.Mark8</Typography>
              <Typography className="footer-text">By Awesomity Lab</Typography>
            </Space>
          </div>
        </Col>
        <Col>
          <Space>
            <XOutlined />
            <InstagramOutlined />
            <YoutubeOutlined />
            <LinkedinOutlined />
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;