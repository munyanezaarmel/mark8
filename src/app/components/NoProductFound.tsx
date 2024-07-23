import React from "react";
import { Card, Space, Typography, Button } from "antd";
import { ShopOutlined } from "@ant-design/icons";
interface NoProductsFoundProps {
  onClearFilters: () => void;
}
const NoProductsFound: React.FC<NoProductsFoundProps> = ({
  onClearFilters,
}) => (
  <div className="no-products-found">
    <Card className="custom-card">
      <Space direction="vertical" align="center" size="large">
        <ShopOutlined style={{ fontSize: "48px", color: "#C1CF16" }} />
        <Typography.Title level={3}>No Products Found</Typography.Title>
        <Typography.Text>
          We couldn&apos;t find any products matching your search or selected
          categories(only accessories and swimwear has products from now ).
        </Typography.Text>
        <Button
          type="primary"
          onClick={onClearFilters}
          style={{ backgroundColor: "#C1CF16", borderColor: "#C1CF16" }}
        >
          Clear Filters
        </Button>
      </Space>
    </Card>
  </div>
);

export default NoProductsFound;
