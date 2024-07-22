import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchProductDetails, fetchProductsByCategory } from "../auth/auth";
import {
  Card,
  Typography,
  Space,
  Rate,
  Row,
  Col,
  Breadcrumb,
  notification,
  Button,
  Divider,
  InputNumber,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { withAuth } from "../components/WithAuth";
import { useSavedProducts } from "../hooks/useSavedProduct";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ArrowLeftOutlined,
  HeartFilled,
  StarOutlined,
  PhoneOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import MainLayout from "../components/Layout";

const { Title, Text } = Typography;
const { Meta } = Card;
interface Product {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  thumbnail: string[];
  category: {
    id: string;
    name: string;
  };
  reviews: {
    rating: number;
  }[];
}

interface CartItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}


function ProductDetails() {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(id),
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(product?.unitPrice || 0);
  const { savedProducts, saveProduct, removeProduct, isProductSaved } =
    useSavedProducts();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  useEffect(() => {
    if (product) {
      setTotalPrice(product.unitPrice);
    }
  }, [product]);

  const handleSaveProduct = (product: Product) => {
    if (isProductSaved(product.id)) {
      removeProduct(product.id);
    } else {
      saveProduct(product);
    }
  };

  const saveCart = (updatedCart: any) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // const removeFromCart = (id: string) => {
  //   const updatedCart = cartItems.filter((item) => item.id !== id);
  //   saveCart(updatedCart);
  // };

  const updateQuantity = (value: any) => {
    setQuantity(value);
    setTotalPrice(value * product.unitPrice);
  };

  // const total = cartItems.reduce(
  //   (sum, item) => sum + item.unitPrice * item.quantity,
  //   0
  // );

  const {
    data: recommendedProducts,
    isLoading: isLoadingRecommended,
    error: recommendedError,
  } = useQuery({
    queryKey: ["recommendedProducts", product?.category?.id],
    queryFn: () => fetchProductsByCategory(product?.category?.id),
    enabled: !!product?.category?.id,
  });

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item:any) => item.id === product.id);

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

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce(
          (acc: any, review: any) => acc + review.rating,
          0
        ) / product.reviews.length
      : 0;

  return (
    <MainLayout>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px" }}>
        <div className="flex items-center gap-4 mb-12">
          <ArrowLeftOutlined className="icon-color" />
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
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card
              className="custom-card cursor-pointer"
              cover={
                <div className="product-image-container">
                  <img
                    src={
                      product.thumbnail[selectedImage] ||
                      "https://res.cloudinary.com/ds7a3a2yb/image/upload/v1720452581/mark8/uevtmop5vpklkba09g1c.jpg"
                    }
                    alt={product.name}
                    className="product-image"
                  />
                </div>
              }
            >
              <Row gutter={[8, 8]}>
                {product.thumbnail.map((thumb: any, index: any) => (
                  <Col key={index} span={6}>
                    <div className="product-image-container">
                      <Image
                        src={thumb}
                        className="product-image rounded-lg"
                        alt={`Thumbnail ${index + 1}`}
                        width={60}
                        height={60}
                        onClick={() => setSelectedImage(index)}
                        style={{
                          cursor: "pointer",
                          border:
                            index === selectedImage
                              ? "2px solid #C1CF16"
                              : "none",
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card>
              <div className="flex justify-between items-center flex-wrap">
                <div className="flex gap-2 items-center mb-2">
                  <Typography className="font-bold">Product Details</Typography>
                  <Typography className="font-bold bg-gray-100 px-2 py-1 text-card-2-user">
                    IN STOCK
                  </Typography>
                </div>

                <div className="flex gap-2">
                  <Button
                    icon={
                      isProductSaved(product.id) ? (
                        <HeartFilled className="icon-color" />
                      ) : (
                        <HeartOutlined className="icon-profile" />
                      )
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveProduct(product);
                    }}
                  >
                    {isProductSaved(product.id) ? "saved" : "save"}
                  </Button>
                  <MoreOutlined size={30} />
                </div>
              </div>
              <Divider />
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <Title level={2}>{product.name}</Title>
                <Text strong style={{ fontSize: 24, color: "#C1CF16" }}>
                  {totalPrice} Rwf
                </Text>
                <Text>{product.description}</Text>
                <Typography.Title level={3} className="font-bold">
                  Reviews
                </Typography.Title>
                <div className="flex gap-2 items-center">
                  <StarOutlined
                    style={{ fontSize: "25px", fontWeight: "bold" }}
                    className="icon-color"
                  />
                  <Typography className="font-bold text-16">
                    {averageRating.toFixed(1)}
                  </Typography>
                </div>

                <Space>
                  <Button
                    size="small"
                    onClick={() => updateQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => updateQuantity(value)}
                    style={{ width: 50 }}
                  />
                  <Button
                    size="small"
                    onClick={() => updateQuantity(quantity + 1)}
                  >
                    +
                  </Button>

                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={addToCart}
                    style={{
                      backgroundColor: "#C1CF16",
                      borderColor: "#C1CF16",
                      color: "black",
                    }}
                  >
                    Add to Cart
                  </Button>
                </Space>
              </Space>
              <Divider />
              <div className="flex justify-between items-center flex-wrap">
                <div className="flex items-center gap-1 mb-2">
                  <Typography className="font-bold">Store Info:</Typography>
                  <div
                    style={{
                      backgroundColor: "#C1CF16",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <Typography>Awesome shop 1</Typography>
                </div>

                <Button
                  icon={<PhoneOutlined className="icon-contact icon-color" />}
                  className="font-bold"
                >
                  Contact Store
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

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
              .filter((p: any) => p.id !== product.id)
              .slice(0, 4)
              .map((recommendedProduct: any) => (
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
                      <Meta
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
    </MainLayout>
  );
}

export default withAuth(ProductDetails);
