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
  const [error, setError]=useState("")

  const { login} = useAuth();
  const navigation = useNavigate();



  const loginHandler = () => {
    post(`https://api.escuelajs.co/api/v1/auth/login`, {
      email: email,
      password: password,
    })
      .then((res) => {
        console.log(res);
        login(res.access_token);
        setTimeout(() => {
          success();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message)
        error();
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
      <div className="h-screen w-full border bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="mt-50"> {contextHolder}</div>
      
        <div className="md:w-2/4 mx-auto p-5 m-10">
          <div className="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
            <Form
              onSubmitCapture={handleSubmit}
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
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  //   value={userData.email}
                  value={email}
                  //   onChange={handleUser}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  //   value={userData.password}
                  value={password}
                  //    onChange={handleUser}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  className="bg-slate-800"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            {error && <p className="text-red-600">{error}</p>}
            <span>
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
