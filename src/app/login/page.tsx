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

export default function LoginPage() {
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
      <Row className="card">
      <Col className="custom-col" style={{ background: "#F4F5F6" }} xs={24} md={12}>
          <div className="avatar-section">
            <Meta avatar={<Avatar src="/mark8 logo.png" className="avatar" />} />
          </div>
          <div className="bottom-section">
            <Typography.Title
              level={5}
              style={{
                color: "#495D69",
                fontSize: "12px",
                marginLeft: "40px",
                fontWeight: 400,
              }}
            >
              By Awesomity Lab
            </Typography.Title>

            <Typography.Title
              level={5}
              style={{
                color: "#495D69",
                fontSize: "12px",
                marginLeft: "40px",
                fontWeight: 700,

              }}
              className="buttom-text"
            >
              &copy; 2024 Awesomity Lab
            </Typography.Title>
          </div>
        </Col>
        <Col xs={24} md={12} style={{ background: "#fff" }}>
          <Typography.Title
            level={2}
            style={{ margin: "40px", color: "#0C0D0D" }}
          >
            Login
          </Typography.Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            style={{ margin: "40px" }}
            layout="vertical"
            requiredMark={false}
          >
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
                style={{ height: "48px"  }}
                className="custom-input"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span className="custom-label">Password</span>}
              rules={[{ required: true, message: "Enter Password" }]}
              style={{ color: "#0C0D0D" }}
            >
              <Input.Password
                prefix={
                  <LockOutlined
                    className="site-form-item-icon"
                    style={{
                      color: "#C1CF16",
                      fontSize: "18px",
                      marginRight: "20px",
                    }}
                 
                  />
                }
                type="password"
                placeholder="Enter Password"
                variant="filled"
                    className="custom-input"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                style={{ height: "48px" }}
              />
            </Form.Item>

            <Flex justify="space-between" align="center">
              <Form.Item>
                <Link href="/forgot-Password" passHref>
                  <Typography className="custom-link">
                    Forgot password
                  </Typography>
                </Link>
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
                  Log in
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Col>
      </Row>
      <Row className="card-2">
        <Col xs={24}  style={{ background: "#fff" }}>
          <Flex
            justify="space-between"
            align="center"
            style={{ margin: "40px" }}
          >
            <Flex vertical>
              <Typography  style={{ color: "#0C0D0D",fontSize:"14px",fontWeight:700 }}>new here ?</Typography>
              <Typography.Link href="/register" style={{ color: "#495D69" ,fontSize:"14px",marginTop:"10px"}}>Create an account</Typography.Link>
            </Flex>
            <Link href="/register">
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
              Register Here{" "}
            </Button>
            </Link>
           
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
