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
      <div className="card">
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
            Register
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
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
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
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
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
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
              <span className="flex items-center gap-2">
                <Checkbox className="custom-checkbox" />
                <Typography >I agree to the </Typography>
                <Typography className="custom-link">Terms And condition </Typography>
              </span>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                icon={<LoginOutlined />}
                iconPosition="end"
                style={{
                  height: "48px",
                  width: "125px",
                  background: "#C1CF16",
                  color: "black",
                  fontWeight: 700,
                }}
              >
                Register
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </div>

      <Row className="card-2">
        <Col xs={24} style={{ background: "#fff" }}>
          <Flex
            justify="space-between"
            align="center"
            style={{ margin: "40px" }}
          >
            <Flex vertical>
              <Typography
                style={{
                  color: "#0C0D0D",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                Already have an account ?
              </Typography>
              <Typography.Link
                href="/login"
                style={{
                  color: "#495D69",
                  fontSize: "14px",
                  marginTop: "10px",
                }}
              >
               Go to Login
              </Typography.Link>
            </Flex>
            <Link href="/login">
              <Button
                className="custom-button"
                icon={
                  <ArrowRightOutlined
                    style={{
                      color: "#C1CF16",
                      fontSize: "18px",
                    }}
                  />
                }
                iconPosition="end"
                style={{
                  height: "48px",
                  width: "181px",
                  color: "black",
                  fontWeight: 700,
                }}
              >
                Login
              </Button>
            </Link>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
