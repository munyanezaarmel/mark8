"use client";

import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { useSavedProducts } from '../hooks/useSavedProduct';
import HeartIcon from '../components/HeartIcon';

const { Meta } = Card;
const { Title } = Typography;

export default function SavedProducts() {
  const { savedProducts, removeProduct } = useSavedProducts();

  return (
    <div>
      <Title level={2}>Saved Products</Title>
      <Row gutter={[16, 16]}>
        {savedProducts.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.thumbnail[0]} />}
              actions={[
                <HeartIcon 
                  key="heart"
                  isSaved={true} 
                  onClick={() => removeProduct(product.id)}
                />
              ]}
            >
              <Meta title={product.name} description={`${product.unitPrice} Rwf`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}