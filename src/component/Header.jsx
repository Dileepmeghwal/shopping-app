import React from "react";
import { Link } from "react-router-dom";
import {ShoppingCartOutlined } from '@ant-design/icons'
const Header = () => {
  return (
    <header className="py-4 bg-slate-800 ">
      <div className="flex container mx-auto justify-self-center align-middle justify-between">
        <div className="logo text-teal-50 font-mono font-bold text-xl m-2  md:text-3xl">
          {`c:))`}
        </div>
        <div className="nav-link m-2">
          <ul className="flex gap-10">
            <li className="text-white">
              <Link>Home</Link>
            </li>
            <li className="text-white">
              <Link>Product</Link>
            </li>
            <li className="text-white">
              <Link>Blog</Link>
            </li>
            <li className="text-white">
              <div><ShoppingCartOutlined size={'100'}/></div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
