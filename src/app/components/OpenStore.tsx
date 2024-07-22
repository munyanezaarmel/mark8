import React from 'react';
import { Row, Col, Typography, Input, Button } from 'antd';
import { MailOutlined, ArrowRightOutlined } from '@ant-design/icons';
interface OpenStoreComponentProps {
  openStoreRef: React.RefObject<HTMLDivElement>;
}

const OpenStoreComponent: React.FC<OpenStoreComponentProps> = ({ openStoreRef }) => {
  return (
    <Row className="open-store-section open-store" align="middle" justify="space-between" ref={openStoreRef}>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Typography.Text className="banner-text">Open your</Typography.Text>
        <Typography.Text className="banner-text-2"> Store</Typography.Text>
      </Col>

      <Col xs={24} sm={12} md={16} lg={16} xl={12}>
        <div className="flex gap-4">
          <Input
            className="open-transparent"
            size="large"
            placeholder="Enter your Email"
            prefix={<MailOutlined className="icon-color" style={{ marginRight: '10px' }} />}
          />
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
            icon={<ArrowRightOutlined />}
            iconPosition="end"
            style={{
             
              background: '#C1CF16',
              color: 'black',
              fontWeight: 600,
            }}
          >
            Submit
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default OpenStoreComponent;