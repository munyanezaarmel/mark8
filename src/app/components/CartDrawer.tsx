import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  Button,
  Typography,
  Space,
  InputNumber,
  notification,
} from "antd";
import Image from "next/image";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface CartItem {
  id: string | number;
  name: string;
  thumbnail: string[];
  unitPrice: number;
  quantity: number;
}

interface CartDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ visible, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [visible]);

  const saveCart = (updatedCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const removeFromCart = (id: string | number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: quantity } : item
    );
    saveCart(updatedCart);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
  };

  const handleSaveForLater = () => {
 
    console.log("Saving cart for later");
  };

  return (
    <Drawer
      title={`My Cart (${cartItems.length})`}
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
      extra={
        <Space>
          <Button onClick={handleSaveForLater} icon={<ShoppingCartOutlined />}>
            Save Cart For Later
          </Button>
          <Button onClick={onClose} icon={<DeleteOutlined />} />
        </Space>
      }
    >
      <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
        By proceeding you won&apos;t be charged yet
      </Text>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item, index) => (
          <List.Item>
            <div
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              <Text strong style={{ marginRight: 16 }}>
                {index + 1}
              </Text>
              <Image
                src={item.thumbnail[0] || "https://res.cloudinary.com/ds7a3a2yb/image/upload/v1720453900/mark8/tyzrzvivq3odqubwqggz.jpg"}
                alt={item.name}
                width={50}
                height={50}
                style={{ marginRight: 16 }}
              />
              <div style={{ flex: 1 }}>
                <Text strong>{item.name}</Text>
                <Text type="secondary" style={{ display: "block" }}>
                  {item.unitPrice} Rwf
                </Text>
              </div>
              <Space>
                <Button
                  size="small"
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  -
                </Button>
                <InputNumber
                  min={1}
                  value={item.quantity}
                  onChange={(value) => updateQuantity(item.id, value as number)}
                  style={{ width: 50 }}
                />
                <Button
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => removeFromCart(item.id)}
                  type="text"
                  danger
                />
              </Space>
            </div>
          </List.Item>
        )}
      />
      <div style={{ position: "absolute", bottom: 20, left: 24, right: 24 }}>
        <Text strong style={{ fontSize: 18 }}>
          Total: {total.toLocaleString()} Rwf
        </Text>
        <Button
          type="primary"
          block
          style={{
            marginTop: 16,
            backgroundColor: "#C1CF16",
            borderColor: "#C1CF16",
          }}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
