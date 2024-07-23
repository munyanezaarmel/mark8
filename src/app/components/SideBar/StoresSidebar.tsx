// components/StoresSidebar.js
import React, { useState } from "react";
import { Input, List, Typography, Space, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Text } = Typography;

const StoresSidebar = ({ stores }: { stores: any }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStores = stores.filter((store: any) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="stores-sidebar">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Typography.Title level={5}>Top 10 Stores</Typography.Title>

        <Input
          placeholder="Search a store"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <List
          itemLayout="horizontal"
          dataSource={filteredStores}
          renderItem={(store: any) => (
            <List.Item className="custom-list-item">
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={store.image}
                    className="avatar-store"
                    style={{ backgroundColor: store.color }}
                  />
                }
                title={<Link href={`/store/${store.id}`}>{store.name}</Link>}
                description={`134 Products`}
              />
            </List.Item>
          )}
        />
      </Space>
    </div>
  );
};

export default StoresSidebar;
