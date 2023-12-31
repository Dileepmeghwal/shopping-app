import React, { useEffect, useState } from "react";
import { Button, Checkbox, message, Form, Input, Layout } from "antd";
import { post } from "../Network/ApiCalling";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import { useAuth } from "../context/AuthContext";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigation = useNavigate();

  const loginHandler = () => {
    setLoading(true);
    post(`https://api.escuelajs.co/api/v1/auth/login`, {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        login(res.access_token);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginHandler();
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  return (
    <>
      <div className=" mt-32">
        <div className="mt-50"> {contextHolder}</div>

        <div className="max-w-sm mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
            <Form
              onSubmitCapture={handleSubmit}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  placeholder="example@gmail.com"
                  value={email}
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              {/* <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

              <Form.Item>
                <Button
                  type="primary"
                  className="bg-slate-800 w-full mx-auto"
                  htmlType="submit"
                  size="large"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            {error && <p className="text-red-600">{error}</p>}
            <span className="block text-center">
              Create an account ?
              <Link to="/register" className=" text-blue-600">
                {" "}
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
