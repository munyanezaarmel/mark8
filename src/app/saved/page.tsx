"use client";

import React from "react";
import { Card, Row, Col, notification, Typography } from "antd";
import { useSavedProducts } from "../hooks/useSavedProduct";
import HeartIcon from "../components/HeartIcon";
import MainLayout from "../components/Layout";
import {
  ShopOutlined,
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  PullRequestOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Meta } = Card;
const { Title } = Typography;

export default function SavedProducts() {
  const { savedProducts, saveProduct, removeProduct, isProductSaved } =
    useSavedProducts();
  const router = useRouter();

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    notification.success({
      message: "Added to Cart",
      icon: <ShoppingCartOutlined style={{ color: "#C1CF16" }} />,
    });
  };
  const handleSaveProduct = (product) => {
    if (isProductSaved(product.id)) {
      removeProduct(product.id);
    } else {
      saveProduct(product);
    }
  };

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <MainLayout>
      <div style={{ padding: "24px 0" }} className="back-store mt-8 mb-8">
        <Title level={2} style={{ textAlign: "center" }}>
          Saved Products
        </Title>
        <Typography style={{ textAlign: "center" }}>
        {savedProducts.length} saved
        </Typography>
      </div>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Row gutter={[16, 16]}>
          {savedProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={8}>
              <Card
                className="custom-card cursor-pointer"
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
                actions={[
                  <div
                    key="actions"
                    className="flex justify-between items-center w-full px-4"
                  >
                    <div className="flex flex-col mb-4">
                      <Typography.Text
                        strong
                        style={{
                          fontWeight: 700,
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        {product.name}
                      </Typography.Text>
                      <Typography.Text
                        strong
                        style={{
                          color: "#C1CF16",
                          fontWeight: 700,
                          fontSize: "16px",
                        }}
                      >
                        {product.unitPrice} Rwf
                      </Typography.Text>
                    </div>
                    <div className="flex gap-2">
                      <div
                        className="block-icon mb-4 flex justify-center items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        <ShoppingCartOutlined className="icon-profile" />
                      </div>
                      <div
                        className="block-icon mb-4 flex justify-center items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveProduct(product);
                        }}
                      >
                        {isProductSaved(product.id) ? (
                          <HeartFilled className="icon-color" />
                        ) : (
                          <HeartOutlined className="icon-profile" />
                        )}
                      </div>
                    </div>
                  </div>,
                ]}
              >
                <Meta description={product.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </MainLayout>
  );
}
