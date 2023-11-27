import React from "react";
import { ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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
  return (
    <div className="mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 ">
      <h3 className="text-2xl font-medium">{title} </h3>
      <p>{description}</p>
      <img src={images} className=" object-cover h-50 w-100" alt={images} />

      <div className="grid grid-cols-2   items-center justify-between">
        <div className="updated w-1/4">
          <p className="font-bold text-lg">{`$${price}`}</p>
        </div>
        <div className="updated w-10">
          <button
            onClick={() => {
              console.log(id);
              navigate(`/products/${id}`);
            }}
            className="py-2 px-4 bg-slate-800 text-white flex justify-between items-center"
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
