import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  LoginOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CartContext, CartProvider } from "../context/CartContext";
import { Avatar, Badge, Space } from "antd";
import { useAuth } from "../context/AuthContext";

const Header = ({ data }) => {
  const { counter } = useContext(CartContext);

  const { accessToken, logout } = useAuth();

  const navigate = useNavigate();
  const handleRefresh = () => {
    window.location.reload();
  };



  console.log("user", data);
  return (
    <>
      <header className="py-4 bg-slate-800 w-full">
        <div className="flex justify-between md:container lg:mx-auto items-center">
          <div className="logo text-teal-50 font-mono font-bold text-xl m-2  md:text-3xl">
            <Link to="/" onClick={handleRefresh}>
              <ShoppingOutlined />
            </Link>
          </div>
          <div className="nav-link m-2">
            <ul className="flex gap-10">
              <div className="md:flex hidden md:gap-3">
                <li className="text-white">
                  <Link>Home</Link>
                </li>
                <li className="text-white">
                  <Link>Product</Link>
                </li>
                <li className="text-white">
                  <Link>Blog</Link>
                </li>
              </div>

              <li className="text-white flex gap-4 items-center">
                <div className="user">
                  <img
                    src={
                      data.avatar
                        ? data.avatar
                        : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=6hQNACQQjktni8CxSS_QSPqJv2tycskYmpFGzxv3FNs="
                    }
                    alt=""
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-whit"
                  />
                  <span>{data.name}</span>
                </div>
                <div className="login" onClick={logout}>
                  {accessToken ? (
                    <LoginOutlined className="text-white" />
                  ) : (
                    <UserOutlined />
                  )}
                </div>
                <div>
                  <Badge count={counter}>
                    <Avatar
                      shape="square"
                      icon={<ShoppingCartOutlined size={"100"} />}
                    />
                  </Badge>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
