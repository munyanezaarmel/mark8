
"use client";
import React, { FormEventHandler, useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  LoginOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  PhoneOutlined,
  ArrowRightOutlined,
  MailOutlined,
} from "@ant-design/icons";
import axios, { AxiosError } from "axios";
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
  notification,
} from "antd";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";

import { signUp } from "../auth/auth";
import PhoneInput from '../components/PhoneInput';


const { Meta } = Card;
export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  const router = useRouter();

  interface ApiErrorResponse {
    message: string[] | string;
    error: string;
    statusCode: number;
  }

  interface ApiSuccessResponse {
    message: string;
  }

  const { mutate: register,isPending } = useMutation<
    ApiSuccessResponse,
    AxiosError<ApiErrorResponse>
  >({
    mutationFn: signUp,
    onSuccess: (data) => {
      notification.success({
        message: "Registration Successful",
        description: data?.message || "Account created successfully!",
      });
      router.push("/login");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const apiError = error.response?.data;
      const messages = apiError?.message;

      if (Array.isArray(messages)) {
        messages.forEach((msg) => {
          notification.error({
            message: "Registration failed",
            description: msg,
          });
        });
      } else {
        notification.error({
          message: "Registration failed",
          description:
            messages ||
            apiError?.error ||
            "An error occurred during registration.",
        });
      }
    },
  });
  const onFinish = (values: any) => {
    register(values);
  };

  return (
    <div className="relative w-full h-screen background bg-customBlack flex flex-col items-center justify-center  overflow-auto">
      <Image
        src="/auth.png"
        alt="Image background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="-z-10"
      />
      <div className="card max-h-[90vh] overflow-y-auto">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          style={{ margin: "20px" }}
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          disabled={isPending}
        >
          <Typography.Title level={2} style={{ color: "#0C0D0D" }}>
            Register
          </Typography.Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="firstName"
                label={<span className="custom-label">First Name </span>}
                rules={[
                  { required: true, message: "please Enter your First Name!" },
                ]}
                style={{ color: "#0C0D0D" }}
              >
                <Input
                  prefix={
                    <UserOutlined
                      style={{
                        color: "#C1CF16",
                        fontSize: "18px",
                        marginRight: "20px",
                      }}
                    />
                  }
                  placeholder="Enter First Name"
                  variant="filled"
                  style={{ height: "48px" }}
                  className="custom-input"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="lastName"
                label={<span className="custom-label">Last Name </span>}
                rules={[
                  { required: true, message: "Please input your Last Name!" },
                ]}
                style={{ color: "#0C0D0D" }}
              >
                <Input
                  prefix={
                    <UserOutlined
                      style={{
                        color: "#C1CF16",
                        fontSize: "18px",
                        marginRight: "20px",
                      }}
                    />
                  }
                  placeholder="Enter Last Name"
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
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "The input is not valid E-mail!" },
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
                name="phoneNumber"
                label={<span className="custom-label">Phone Number</span>}
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                ]}
                style={{ color: "#0C0D0D" }}
              >
                <Input
                  prefix={
                    <PhoneOutlined
                      className="icon-profile icon-contact"
                      style={{
                        color: "#C1CF16",
                        fontSize: "18px",
                        marginRight: "20px",
                      }}
                    />
                  }
                  placeholder="250 --- --- ---"
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
                name="password"
                label={<span className="custom-label">Password</span>}
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                style={{ color: "#0C0D0D" }}
              >
                <Input.Password
                  prefix={
                    <LockOutlined
                      style={{
                        color: "#C1CF16",
                        fontSize: "18px",
                        marginRight: "20px",
                      }}
                    />
                  }
                  placeholder="Enter Password"
                  variant="filled"
                  type="password"
                  style={{ height: "48px" }}
                  className="custom-input"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Flex justify="space-between" align="center">
            <Form.Item
              valuePropName="checked"
               name="agreeToTerms"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          "You must agree to the terms and conditions"
                        ),
                },
              ]}
            >
              <span className="flex items-center gap-2">
                <Checkbox className="custom-checkbox" />
                <Typography>I agree to the </Typography>
                <Typography className="custom-link">
                  Terms And condition{" "}
                </Typography>
              </span>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                icon={isPending ? null : <LoginOutlined />}
                loading={isPending}
                iconPosition="end"
                style={{
                  height: "48px",
                  background: "#C1CF16",
                  color: "black",

                  fontWeight: 700,
                }}
              >
            {isPending ? "Creating accoung..." : "Register"}
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
            style={{ margin: "20px" }}
            wrap="wrap" 
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
