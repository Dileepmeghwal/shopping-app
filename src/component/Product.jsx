import React, { useContext, useState } from "react";
import { ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Product = ({
  id,
  title,
  images,
  description,
  price,
  creationAt,
  updatedAt,
  category,
}) => {
  const navigate = useNavigate();
  const { handleCounter } = useContext(CartContext);
  return (
    <div className=" rounded-lg p-6 overflow-hidden  bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 ">
      <h3 className="text-2xl font-medium">{title} </h3>
      <p className="text break-words">{description}</p>
      <img
        src={
          images
            ? images
            : "https://cdn.iconscout.com/icon/free/png-256/free-no-image-1771002-1505134.png"
        }
        className=" object-cover h-20 w-20 "
        alt={images}
      />

      <div className="grid grid-cols-2   items-center justify-between">
        <div className="updated w-1/4">
          <p className="font-bold text-lg">{`$${price}`}</p>
        </div>
        <div className="updated w-10">
          <button
            // onClick={() => {
            //   // console.log(id);
            //   // navigate(`/products/${id}`);

            // }}
            onClick={handleCounter}
            className="py-2 px-2 mx-16 bg-slate-800 text-white flex justify-between items-center rounded-md"
          >
            Add <ShoppingOutlined className="mx-2" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-between items-center">
        <div className="updated">{creationAt}</div>
        <div className="updated">{updatedAt}</div>
      </div>
    </div>
  );
};

export default Product;
