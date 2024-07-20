"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  InstagramOutlined,
  XOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  UserOutlined,
  StarOutlined,
  HomeOutlined,
  ShopOutlined,
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  CheckOutlined,
  ArrowRightOutlined,
  HeartOutlined,
  MenuOutlined,
  HeartFilled,
  PullRequestOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Row,
  Col,
  Layout,
  Menu,
  theme,
  Avatar,
  Typography,
  Flex,
  Input,
  Space,
  Drawer,
  Button,
  Modal,
  Pagination,
  Badge,
  Divider,
  notification,
  Card,
} from "antd";
import Image from "next/image";
import { withAuth } from "./components/WithAuth";

const { Meta } = Card;

import UserProfileDropdown from "./components/UserProfileDropdown";
import { useAuth } from "./hooks/useAuth";
import CartDrawer from "./components/CartDrawer";
import { fetchCategories, fetchProducts, fetchStores } from "./auth/auth";
import {
  useQuery,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useSavedProducts } from "./hooks/useSavedProduct";
import HeartIcon from "./components/HeartIcon";

import { useRouter } from "next/navigation";
import Link from "next/link";
import StoresSidebar from "./components/SideBar/StoresSidebar";

interface PaginationData {
  totalRecords: number;
}

interface Category {
  id: string;
  name: string;
}
interface CategoriesData {
  categories: Category[];
  pagination: PaginationData;
}

interface FetchCategoriesResponse {
  data: CategoriesData;
}
import { useMediaQuery } from "react-responsive";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const HomePage = () => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 989 });
  const { user, isPending, isAuthenticated } = useAuth();
  const { savedProducts, saveProduct, removeProduct, isProductSaved } =
    useSavedProducts();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modalSearchTerm, setModalSearchTerm] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const openStoreRef = useRef(null);
  const recordsPerPage = 10;

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
  const handleSearch = () => {
    setSearchTerm(modalSearchTerm);
    setIsSearchModalVisible(false);
  };
  const handleCategorySelect = (categoryId) => {
    setSelectedCategories((prev) => {
      if (categoryId === "all") {
        return [];
      }
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  const filteredProducts =
    productsData?.pages
      .flatMap((page) => page.data.products)
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category.id);
        return matchesSearch && matchesCategory;
      }) || [];

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleSaveProduct = (product) => {
    if (isProductSaved(product.id)) {
      removeProduct(product.id);
    } else {
      saveProduct(product);
    }
  };
  const scrollToOpenStore = () => {
    openStoreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  const handleStores = () => {
    router.push("/stores");
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    router.push("/login");
    return <div>Please log in to view this page.</div>;
  }
  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined className="menu-icon active" />,
      label: <span className="menu-text">Home</span>,
    },
    {
      key: "stores",
      icon: <ShopOutlined className="menu-icon" />,
      label: <span className="menu-text">Stores</span>,
      onClick: handleStores,
    },
  ];

  const HeaderContent = () => (
    <>
      <div className="flex lg:pl-12">
        <div className="logo gap-4">
          <Image
            src="/mark8 logo.png"
            alt="Mark8 Logo"
            width={40}
            height={40}
          />
          <div className="flex-col flex ">
            <Text strong>Mark8</Text>
            <Text type="secondary">by Awesomity Lab</Text>
          </div>
        </div>

        <div>
          {!isMobile && (
            <Menu
              className=""
              mode="horizontal"
              items={menuItems}
              selectedKeys={["home"]}
            ></Menu>
          )}
        </div>
      </div>

      {!isMobile && (
        <Space>
          <div className="header-actions pr-12">
            <SearchOutlined
              className="search-icon header-icon"
              onClick={() => setIsSearchModalVisible(true)}
            />
            <Modal
              visible={isSearchModalVisible}
              footer={null}
              closable={false}
              className="search-modal"
              maskClosable={true}
              onCancel={() => setIsSearchModalVisible(false)}
              centered={true}
            >
              <div className="search-container gap-4">
                <Typography>Search</Typography>
                <Input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="open-transparent"
                  size="large"
                  placeholder="Search products, stores, etc..."
                  prefix={
                    <SearchOutlined
                      className="icon-color"
                      style={{ marginRight: "10px" }}
                    />
                  }
                />
                <Button
                  onClick={() => {
                    setIsSearchModalVisible(false);
                  }}
                  icon={<SearchOutlined />}
                  iconPosition="end"
                >
                  Search
                </Button>
              </div>
            </Modal>
            <div
              className="flex gap-1 cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              {" "}
              <ShoppingCartOutlined className="header-icon" />
              My Cart
            </div>

            <Link href="/saved">
              <div className="flex gap-1">
                <HeartOutlined />
                Saved ({savedProducts.length})
              </div>
            </Link>

            <Button
              className="font-bold"
              icon={<ShopOutlined className="icon-color" />}
              iconPosition="end"
              onClick={scrollToOpenStore}
            >
              Open a store
            </Button>
            <UserProfileDropdown />
          </div>
        </Space>
      )}
      {isMobile && (
        <Button type="text" icon={<MenuOutlined />} onClick={toggleMenu} />
      )}
    </>
  );

  return (
    <Layout style={{ backgroundColor: "#fff" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          padding: "0 20px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <HeaderContent />
      </Header>

      <Drawer placement="right" onClose={toggleMenu} visible={menuVisible}>
        <Menu mode="vertical" items={menuItems} />
        <div style={{ padding: "20px 0" }}>
          <Input.Search placeholder="Search" style={{ marginBottom: 20 }} />
          <Button
            icon={<ShopOutlined className="icon-color" />}
            iconPosition="end"
            className="font-bold"
            onClick={() => {
              scrollToOpenStore();
              toggleMenu();
            }}
          >
            Open a store
          </Button>
          <div
            onClick={() => setIsCartOpen(true)}
            style={{ padding: "20px 0" }}
            className="flex gap-4"
          >
            <ShoppingCartOutlined className="header-icon" />
            My Cart
          </div>
          <Link href="/saved">
            <div style={{ padding: "20px 0" }} className="flex gap-4">
              <HeartOutlined className="header-icon" />
              Saved ({savedProducts.length})
            </div>
          </Link>

          <UserProfileDropdown />
        </div>
      </Drawer>

      <Content style={{ padding: "0 20px" }}>
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
                  {categoriesData?.data.categories.map((category) => (
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
                  {" "}
                  <ShopOutlined className="icon-color mr-4" />
                  Recent Products (100)
                </Title>
              </div>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={18}>
                  <Row gutter={[16, 16]}>
                    {filteredProducts.map((product) => (
                      <Col key={product.id} xs={24} sm={12} md={8} lg={8}>
                        <Card
                          className="custom-card"
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
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <Row
              className="open-store-section open-store"
              align="middle"
              justify="space-between"
              ref={openStoreRef}
            >
              <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                <Typography.Text className="banner-text">
                  Open your
                </Typography.Text>
                <Typography.Text className="banner-text-2">
                  {" "}
                  Store
                </Typography.Text>
              </Col>

              <Col xs={24} sm={12} md={16} lg={16} xl={12}>
                <div className="flex gap-4">
                  <Input
                    className="open-transparent"
                    size="large"
                    placeholder="Enter your Email"
                    prefix={
                      <MailOutlined
                        className="icon-color"
                        style={{ marginRight: "10px" }}
                      />
                    }
                  />
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                    style={{
                      width: "125px",
                      background: "#C1CF16",
                      color: "black",
                      fontWeight: 600,
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>

      <Footer style={{ background: "#F4F5F6" }}>
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12} md={12} lg={6}>
            <Space>
              <Image
                src="/mark8 logo.png"
                alt="Mark8 Logo"
                width={40}
                height={40}
              />
              <Text strong>Mark8</Text>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <div className="flex items-center">
              <Space>
                <Typography className="font-bold">
                  ©{new Date().getFullYear()}.Mark8
                </Typography>
                <Typography className="footer-text">
                  By Awesomity Lab
                </Typography>
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
    </Layout>
  );
};

export default withAuth(HomePage);
