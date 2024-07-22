// components/NoProductsFound.js
import React from 'react';
import { Card, Space, Typography, Button } from 'antd';
import { ShopOutlined } from '@ant-design/icons';

const NoProductsFound = ({ onClearFilters }) => (
  <div className="no-products-found">
    <Card className="custom-card">
      <Space direction="vertical" align="center" size="large">
        <ShopOutlined style={{ fontSize: '48px', color: '#C1CF16' }} />
        <Typography.Title level={3}>No Products Found</Typography.Title>
        <Typography.Text>
          We couldn&apos;t find any products matching your search or selected categories.
        </Typography.Text>
        <Button
          type="primary"
          onClick={onClearFilters}
          style={{ backgroundColor: '#C1CF16', borderColor: '#C1CF16' }}
        >
          Clear Filters
        </Button>
      </Space>
    </Card>
  </div>
);

export default NoProductsFound;