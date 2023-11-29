import React, { useState } from "react";

import { Button, message, Space, Checkbox, Form, Input } from "antd";
import { post } from "../Network/ApiCalling";
import { Link, useNavigate } from "react-router-dom";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    post(`https://api.escuelajs.co/api/v1/users/`, {
      name: name,
      email: email,
      password: password,
      avatar:
        "https://images.unsplash.com/photo-1611747581637-a4c0993020ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
    })
      .then((res) => {
        console.log(res);
        success();
        navigation("/");
      })
      .catch((error) => console.error(error), error());
  };
  return (
    <div className="h-screen w-full border bg-gradient-to-r from-cyan-500 to-blue-500">
      {contextHolder}

      <div className="md:w-2/4 mx-auto p-5 m-10">
        <div className="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
          <Form
            onSubmitCapture={handleRegister}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className="bg-slate-800 hover:bg-slate-600"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>

          <span className="text-center">
            I have an account{" "}
            <Link to="/" className="text-blue-700 ">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
