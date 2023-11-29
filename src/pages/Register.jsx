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
  const [avatar, setAvatar] = useState(null);
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
      avatar: avatar,
    })
      .then((res) => {
        console.log(res);
        success();
        navigation("/");
      })
      .catch((error) => console.error(error), error());
  };
  return (
    <div className="">
      {contextHolder}

      <div className="max-w-sm mx-auto mt-32">
        <div className="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
          <Form
            onSubmitCapture={handleRegister}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                value={email}
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item
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
                placeholder="Password"
                size="large"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                value={avatar}
                placeholder="Pase Image URL"
                onChange={(e) => setAvatar(e.target.value)}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="bg-slate-800 hover:bg-slate-600 w-full text-white hover:text-white"
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <span className="block text-center">
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
