// app/login/page.js
"use client";
import React, { useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  LoginOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  ArrowRightOutlined,
  CheckOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Skeleton,
  Typography,
  Button,
  Checkbox,
  Form,
  Row,
  Col,
  Input,
  Space,
  Flex,
} from "antd";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Meta } = Card;
export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };

  const handleRegister = () => {
    router.push("/register");
  };
  return (
    <div className="relative w-full h-screen background bg-customBlack flex flex-col items-center justify-center">
      <Image
        src="/auth.png"
        alt="Image background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="-z-10"
      />
      <div className="card-forgot">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          style={{ margin: "40px" }}
          layout="vertical"
          requiredMark={false}
        >
          <Typography.Title level={2} style={{ color: "#0C0D0D" }}>
            Forgot Password
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={24} lg={24} sm={24} xl={24} xxl={24}>
              <Form.Item
                name="email"
                label={<span className="custom-label">Email</span>}
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
                style={{ color: "#0C0D0D" }}
              >
                <Input
                  prefix={
                    <MailOutlined
                      style={{
                        color: "#C1CF16",
                        fontSize: "18px",
                        marginRight: "20px",
                      }}
                    />
                  }
                  placeholder="Enter Email"
                  variant="filled"
                  style={{ height: "48px" }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
          </Row>
          <Flex justify="space-between" align="center">
            <Form.Item>
            <Link href="/login" passHref>
                  <Typography className="custom-link">
                   login instead
                  </Typography>
                </Link>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                icon={<CheckOutlined />}
                iconPosition="end"
                style={{
                  height: "48px",
                  width: "125px",
                  background: "#C1CF16",
                  color: "black",
                  fontWeight: 700,
                }}
              >
                Submit
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </div>
    </div>
  );
}
