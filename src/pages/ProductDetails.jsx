import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../Network/ApiCalling";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [imageView, setImageView] = useState();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getSingleProduct();
  }, []);
  const getSingleProduct = () => {
    get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => {
        console.log(res);
        setDetails(res);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="grid gap-3  lg:grid-cols-2 2xl:grid-cols-2">
      <div className="shadow-lg">
        <img
          src={imageView ? imageView : details?.images}
          className="w-45 h-45 p-2"
          alt="img"
        />
        <div className="vertical-bar gap-2 p-2 flex md:flex-col">
          {details?.images?.map((item, index) => (
            <img
              src={item}
              alt=""
              width={80}
              className="gap-3 rounded-sm ring-1 ring-blue-400  hover:ring-slate-500"
              onMouseEnter={() => setImageView(item)}
            />
          ))}
        </div>
      </div>
      <div className="shadow-lg p-3">
        <h2 className="text-2xl font-bold">{details.title}</h2>
        <p className="py-2">{details.description}</p>
        <h1 className="text-2xl md:text-3xl text-slate-800 font-medium">
          {`$ ${details.price}`}
        </h1>
        <div className="grid lg:grid-cols-2 gap-3 mt-3">
        <button className="py-2 px-4 hover:bg-slate-600 bg-black  text-white p-2">
          Add to Cart
        </button>
        <button className="py-2 hover:bg-slate-500 px-4 text-white bg-slate-900">
          Remove
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
