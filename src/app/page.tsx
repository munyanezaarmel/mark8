"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ShopOutlined,
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  PullRequestOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Typography,
  Input,
  Button,
  Card,
  Space,
  notification,
} from "antd";
import Image from "next/image";
import { withAuth } from "./components/WithAuth";
import MainLayout from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import CartDrawer from "./components/CartDrawer";
import { fetchCategories, fetchProducts, fetchStores } from "./auth/auth";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useSavedProducts } from "./hooks/useSavedProduct";
import { useRouter } from "next/navigation";
import Link from "next/link";
import StoresSidebar from "./components/SideBar/StoresSidebar";
import { useMediaQuery } from "react-responsive";
import NoProductsFound from "./components/NoProductFound";

const { Title, Text } = Typography;
const { Meta } = Card;

const HomePage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 989 });
  const { user, isPending, isAuthenticated } = useAuth();
  const { savedProducts, saveProduct, removeProduct, isProductSaved } =
    useSavedProducts();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const openStoreRef = useRef(null);
  const [noProductsFound, setNoProductsFound] = useState(false);

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories({ pageNumber: 1, recordsPerPage: 10 }),
  });

  const {
    data: storesData,
    isLoading: isLoadingStores,
    error: storesError,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
  });

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({ pageNumber: pageParam, recordsPerPage: 10 }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.products.length < 10) return undefined;
      return pages.length + 1;
    },
  });

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

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

  const handleCategorySelect = (categoryId: string | "all") => {
    setSelectedCategories((prev:any) => {
      if (categoryId === "all") {
        return [];
      }
      if (prev.includes(categoryId)) {
        return prev.filter((id:any) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };
  const filteredProducts =
    productsData?.pages
      .flatMap((page:any) => page.data.products)
      .filter((product:any) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category.id);
        return matchesSearch && matchesCategory;
      }) || [];

  useEffect(() => {
    setNoProductsFound(filteredProducts.length === 0);
  }, [filteredProducts]);

  const removeFromCart = (productId:any) => {
    setCartItems((prevItems) =>
      prevItems.filter((item:any) => item.id !== productId)
    );
  };

  const handleSaveProduct = (product:any) => {
    if (isProductSaved(product.id)) {
      removeProduct(product.id);
    } else {
      saveProduct(product);
    }
  };

  const handleProductClick = (productId:any) => {
    router.push(`/product/${productId}`);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    router.push("/login");
    return <div>Please log in to view this page.</div>;
  }

  return (
    <MainLayout
      savedProductsCount={savedProducts.length}
      setIsCartOpen={setIsCartOpen}
    >
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={24} lg={22} xl={23}>
          <div className="hero-section text-center ">
            <Title level={2}>
              <span className="highlight-1"> Welcome to</span>{" "}
              <span className="highlight">Mark8</span>
            </Title>
            <Text className="text-white">58 Products</Text>
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={18} md={12} lg={10} xl={10}>
                <div className="flex items-center justify-center">
                  <Input
                    size="large"
                    placeholder="What are you looking for?"
                    prefix={<SearchOutlined className="icon-color" />}
                    suffix={
                      <PullRequestOutlined style={{ fontSize: "20px" }} />
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginTop: 20 }}
                    className="search-transparent"
                  />
                </div>
              </Col>
            </Row>

            <div className="category-buttons flex items-center justify-center ">
              <Row gutter={[16, 16]} className="categories-grid">
                <Col>
                  <Button
                    className={`banner-button ${
                      selectedCategories.length === 0 ? "selected" : ""
                    }`}
                    onClick={() => handleCategorySelect("all")}
                  >
                    All
                  </Button>
                </Col>
                {categoriesData?.data.categories.map((category:any) => (
                  <Col key={category.id}>
                    <Button
                      className={`banner-button ${
                        selectedCategories.includes(category.id)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {category.name}
                    </Button>
                  </Col>
                ))}
              </Row>
            </div>
          </div>

          <div className="products-section">
            <div
              className="flex items-center gap-4 mb-8"
              style={{ fontSize: "24px" }}
            >
              <Title level={4}>
                <ShopOutlined className="icon-color mr-4" />
                Recent Products ({filteredProducts.length})
              </Title>
            </div>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={18}>
                {noProductsFound ? (
                  <NoProductsFound onClearFilters={handleClearFilters} />
                ) : (
                  <Row gutter={[16, 16]}>
                    {filteredProducts.map((product) => (
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
                )}
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={6}>
                {isLoadingStores ? (
                  <div>Loading stores...</div>
                ) : storesError ? (
                  <div>Error loading stores: {storesError.message}</div>
                ) : (
                  <StoresSidebar stores={storesData?.data?.stores || []} />
                )}
              </Col>
            </Row>
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            {hasNextPage && (
              <Button
                icon={<DownOutlined className="icon-color" />}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                style={{ marginTop: "20px" }}
                className="font-bold load-more"
              >
                {isFetchingNextPage ? "Loading more..." : "Load More"}
              </Button>
            )}
          </div>
          <CartDrawer
            visible={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default withAuth(HomePage);
