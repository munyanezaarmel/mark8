"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Layout,
  Typography,
  Input,
  Space,
  Row,
  Col,
  Card,
  Button,
  Rate,
  Divider,
  Avatar,
  List,
} from "antd";
import {
  SearchOutlined,
  PhoneOutlined,
  HeartOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { fetchStores, fetchStoreProducts } from "../auth/auth";
import { useRouter } from "next/navigation";

import MainLayout from "../components/Layout";
import { withAuth } from "../components/WithAuth";
import { useMediaQuery } from "react-responsive";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const StorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isLargeScreen = useMediaQuery({ minWidth: 992 });

  const { data: storesData, isLoading: isLoadingStores } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
  });

  const stores = storesData?.data?.stores || [];

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <Content style={{ padding: "0 20px" }}>
        {" "}
        {/* Reduced padding for mobile */}
        <div style={{ padding: "24px 0" }} className="back-store mt-8">
          <Title level={isLargeScreen ? 2 : 3} style={{ textAlign: "center" }}>
            <span className="highlight">Mark8</span> <span>Stores</span>
          </Title>
          <Text style={{ textAlign: "center", display: "block" }}>
            {stores.length} Stores
          </Text>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
              width: "100%",
            }}
          >
            <Input
              size={isLargeScreen ? "large" : "middle"}
              placeholder="Search Store"
              prefix={<SearchOutlined className="icon-color" />}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="open-transparent"
              style={{ width: isLargeScreen ? "50%" : "80%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <Button
              type="default"
              className="store-button-default store-button"
            >
              All
            </Button>
            <Button className="store-button">Vetrina</Button>
            <Button className="store-button">Icons</Button>
            <Button className="store-button">Backgrounds</Button>
          </div>
        </div>
        <Divider style={{ margin: "24px 0", width: "100%" }} />
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          {filteredStores.map((store) => (
            <Col xs={24} key={store.id}>
              <StoreCard store={store} />
            </Col>
          ))}
        </Row>
      </Content>
    </MainLayout>
  );
};

const StoreCard = ({ store }) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { data: productsData } = useQuery({
    queryKey: ["storeProducts", store.id],
    queryFn: () => fetchStoreProducts(store.id),
  });

  const products = productsData?.data?.products || [];

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <Card className="card-store-header">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "16px",
          }}
        >
          <Space align="start" size="middle">
            <Avatar
              style={{ borderRadius: "16px" }}
              size={50}
              src={store.image}
            />
            <div>
              <Title level={4} style={{ margin: 0 }}>
                {store.name}
              </Title>
              <Text>{store.productCount || 0} Products</Text>
            </div>
          </Space>
          <Space wrap style={{ marginTop: isMobile ? "16px" : 0 }}>
            <Button
              type="primary"
              icon={<UserOutlined />}
              style={{
                background: "#C1CF16",
                color: "black",
                fontWeight: 600,
              }}
            >
              View Profile
            </Button>
            <Button icon={<PhoneOutlined className="icon-contact" />} />
            <Button icon={<HeartOutlined />} />
          </Space>
        </div>

        <Col></Col>
        <Divider style={{ margin: "12px 0", width: "100%" }} />

        <Row gutter={[24, 24]}>
          <Col xs={24} xl={12}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div>
                <Typography
                  style={{ paddingBottom: "10px", fontWeight: "bold" }}
                >
                  About
                </Typography>
                <Typography>{store.description}</Typography>
              </div>
              <div>
                <Typography style={{ fontWeight: "bold" }}>
                  Categories
                </Typography>
                <br />
                <Space wrap>
                  <Button className="store-button">Icons</Button>
                  <Button className="store-button">Backgrounds</Button>
                </Space>
              </div>
              <Button
                icon={<ShopOutlined className="icon-color " />}
                className="font-bold p-4"
              >
                Explore Products
              </Button>
            </Space>
          </Col>
          <Col xs={24} xl={12}>
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
              dataSource={products.slice(0, 3)}
              renderItem={(product) => (
                <List.Item>
                  <Card
                    className="custom-card cursor-pointer"
                    hoverable
                    cover={
                      <div className="product-image-container">
                        <img
                          alt={product.name}
                          src={product.thumbnail[0]}
                          className="product-image"
                        />
                      </div>
                    }
                    onClick={() => handleProductClick(product.id)}
                  >
                    <Card.Meta
                      title={product.name}
                      description={
                        <Space
                          style={{
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography className="typo-price">
                            {product.unitPrice} Rwf
                          </Typography>
                          <HeartOutlined />
                        </Space>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Space>
    </Card>
  );
};

export default withAuth(StorePage);
