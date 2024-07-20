"use client";
import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Layout, Typography, Input, Space, Row, Col, Card, Button, Rate } from 'antd';
import { SearchOutlined, PhoneOutlined, HeartOutlined } from '@ant-design/icons';
import { fetchStores, fetchStoreProducts } from '../auth/auth';
import { useRouter } from "next/navigation";
import { withAuth } from "../components/WithAuth";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const StorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
 

  const { data: storesData, isLoading: isLoadingStores } = useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores,
  });

  const stores = storesData?.data?.stores || [];

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: '0 50px' }}>
        {/* Add your header content here */}
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#f0f2f5', padding: '24px 0' }}>
          <Title level={2} style={{ textAlign: 'center' }}>Mark8 Stores</Title>
          <Text style={{ textAlign: 'center', display: 'block' }}>{stores.length} Stores</Text>
          <Space style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <Input
              size="large"
              placeholder="Search Store"
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 300 }}
            />
          </Space>
          <Space style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="default">All</Button>
            <Button>Vetrina</Button>
            <Button>Icons</Button>
            <Button>Backgrounds</Button>
          </Space>
        </div>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          {filteredStores.map(store => (
            <Col span={24} key={store.id}>
              <StoreCard store={store} />
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

const StoreCard = ({ store }) => {
  const router = useRouter();
  const { data: productsData } = useQuery({
    queryKey: ['storeProducts', store.id],
    queryFn: () => fetchStoreProducts(store.id),
  });

  const products = productsData?.data?.products || [];

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`);
  };


  return (
    <Card>
      <Row gutter={16}>
        <Col span={16}>
          <Space align="start">
            <div style={{ width: 50, height: 50, background: '#e0e0e0', borderRadius: '50%' }} />
            <div>
              <Title level={4}>{store.name}</Title>
              <Text>{store.productCount || 0} Products</Text>
            </div>
          </Space>
          <Button type="primary" style={{ float: 'right' }}>View Profile</Button>
          <PhoneOutlined style={{ float: 'right', marginRight: 16 }} />
          <HeartOutlined style={{ float: 'right', marginRight: 16 }} />
          
          <Text style={{ display: 'block', marginTop: 16 }}>About</Text>
          <Text type="secondary">{store.description}</Text>
          
          <Text style={{ display: 'block', marginTop: 16 }}>Categories</Text>
          <Space>
            {store.categories?.map(category => (
              <Button key={category} size="small">{category}</Button>
            ))}
          </Space>
          
          <div style={{ marginTop: 16 }}>
            <Rate disabled defaultValue={store.rating || 0} />
            <Text style={{ marginLeft: 8 }}>{store.reviewCount || 0} Reviews</Text>
          </div>
          
          <Button type="link" style={{ paddingLeft: 0, marginTop: 16 }}>Explore Products</Button>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            {products.slice(0, 3).map(product => (
              <Col span={8} key={product.id}>
                <Card
                  cover={<img alt={product.name} src={product.thumbnail[0]} style={{ height: 100, objectFit: 'cover' }} />}
                  bodyStyle={{ padding: 8 }}
                  onClick={() => handleProductClick (product.id)}
                >
                  <Text strong>{product.name}</Text>
                  <Text type="success" style={{ display: 'block' }}>{product.unitPrice} Rwf</Text>
                  <HeartOutlined style={{ float: 'right' }} />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default withAuth(StorePage);