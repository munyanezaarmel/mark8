import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchProductDetails, fetchProductsByCategory } from "../auth/auth";
import {
  Card,
  Typography,
  Space,
  Rate,
  List,
  Avatar,
  Row,
  Col,
  Breadcrumb,
  notification,
  Button,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { withAuth } from "../components/WithAuth";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function ProductDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(id),
  });

  const {
    data: recommendedProducts,
    isLoading: isLoadingRecommended,
    error: recommendedError,
  } = useQuery({
    queryKey: ["recommendedProducts", product?.category?.id],
    queryFn: () => fetchProductsByCategory(product?.category?.id),
    enabled: !!product?.category?.id,
  });

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    notification.success({
      message: "Added to Cart",
      description: `${quantity} ${
        quantity > 1 ? "items" : "item"
      } added to your cart`,
      icon: <ShoppingCartOutlined style={{ color: "#C1CF16" }} />,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href="/">Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href={`/category/${product.category.id}`}>
            {product.category.name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Card>
        <Row gutter={24}>
          <Col span={12}>
            <Image
              src={
                product.thumbnail[selectedImage] ||
                "https://res.cloudinary.com/ds7a3a2yb/image/upload/v1720452581/mark8/uevtmop5vpklkba09g1c.jpg"
              }
              alt={product.name}
              width={400}
              height={400}
            />
            <Row gutter={8} style={{ marginTop: 16 }}>
              {product.thumbnail.map((thumb, index) => (
                <Col key={index} span={6}>
                  <Image
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    onClick={() => setSelectedImage(index)}
                    style={{
                      cursor: "pointer",
                      border:
                        index === selectedImage ? "2px solid #1890ff" : "none",
                    }}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col span={12}>
            <Space direction="vertical" size="large">
              <Title level={2}>{product.name}</Title>
              <Text strong>{product.unitPrice} Rwf</Text>
              <Rate disabled defaultValue={product.rating || 0} />
              <Text>{product.description}</Text>
              <Text>Category: {product.category.name}</Text>
              <Space>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={addToCart}
                  style={{ backgroundColor: "#C1CF16", borderColor: "#C1CF16" }}
                >
                  Add to Cart
                </Button>
                <Button icon={<HeartOutlined />}>Save</Button>
              </Space>
            </Space>
          </Col>
        </Row>
      </Card>

      <Title level={3} style={{ marginTop: 24 }}>
        You might also like
      </Title>
      {isLoadingRecommended ? (
        <div>Loading recommendations...</div>
      ) : recommendedError ? (
        <div>Recommendations currently unavailable.</div>
      ) : (
        <Row gutter={[16, 16]}>
          {recommendedProducts?.data?.products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((recommendedProduct) => (
              <Col key={recommendedProduct.id} xs={24} sm={12} md={6}>
                <Link href={`/product/${recommendedProduct.id}`}>
                  <Card
                    hoverable
                    cover={
                      <Image
                        alt={recommendedProduct.name}
                        src={recommendedProduct.thumbnail[0]}
                        width={200}
                        height={200}
                      />
                    }
                  >
                    <Card.Meta
                      title={recommendedProduct.name}
                      description={`${recommendedProduct.unitPrice} Rwf`}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
}

export default withAuth(ProductDetails);
