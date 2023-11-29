import { Header } from "antd/es/layout/layout";
import React from "react";

const Layout = ({ children }) => {
    console.log(children);
  return (
    <div>
     Header
      {children}
    </div>
  );
};

export default Layout;
