import React, { useEffect, useState } from "react";
import Banner from "../component/Banner";
import Product from "../component/Product";
import Header from "../component/Header";
import { get, post } from "../Network/ApiCalling";
import Search from "../component/Search";
import { Button, Pagination, message, Modal, Form, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Col, InputNumber, Row, Slider, Space, Dropdown } from "antd";
import { CartProvider } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [select, setSelect] = useState();
  const [inputValue, setInputValue] = useState(1);
  const [optionList, setOptionList] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productImg, setProductImg] = useState("");
  const [description, setDescrition] = useState("");

  const { accessToken, logout } = useAuth();

  useEffect(() => {
    getProductList();
    userProfile();
  }, []);

  const getProductList = () => {
    setLoading(true);
    get(`https://api.escuelajs.co/api/v1/products`)
      .then((res) => {
        const productList = res.map((item) => {
          const creationAt = new Date(item.creationAt).toDateString();
          const updatedAt = new Date(item.updatedAt).toDateString();
          const category = item.category;
          const price = item.price;
          const title = item.title.toUpperCase();
          const description = item.description;
          const images = item.images;
          return {
            id: item.id,
            creationAt,
            updatedAt,
            category,
            price,
            title,
            description,
            images,
          };
        });
        // console.log("productList", productList);
        setProducts(productList);
        setSearchFilter(productList);
        setFilterCategory(productList);
        setOptionList(productList);
        setPriceFilter(productList);

        setLoading(false);
      })
      .catch((error) => setError(error));
  };

  const onChange = (value) => {
    const selectedPrice = value;
    setInputValue(selectedPrice);
    console.log(selectedPrice);
    if (inputValue === "") {
      setProducts(priceFilter);
    } else {
      const filterPrice = priceFilter.filter(
        (item) =>
          item.price >= selectedPrice[0] && item.price <= selectedPrice[1]
      );

      setProducts(filterPrice);
    }
  };

  const searchHandler = (e) => {
    const serachText = e.target.value;
    setSearch(serachText);
    const filteredText = searchFilter.filter(
      (item) => item.title.toLowerCase().indexOf(serachText) !== -1
    );
    setProducts(filteredText);
  };

  if (loading) {
    return (
      <div className="flex w-50 h-screen justify-center content-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-50 h-screen justify-center content-center items-center flex-wrap">
        {error}
      </div>
    );
  }

  const options = [];
  optionList.forEach((element) => {
    return options.push(element.category.name);
  });
  const uniq = [...new Set(options)];
  // console.log("options", options);
  // console.log("uniq", uniq);

  const selectOptionHandle = (e) => {
    // console.log(e.target.value);

    const selectedOption = e.target.value;
    console.log(selectedOption);
    setSelect(selectedOption);
    if (selectedOption === "All") {
      setProducts(filterCategory);
    } else {
      const filtCat = filterCategory.filter(
        (item) => item.category.name === selectedOption
      );
      setProducts(filtCat);
    }
  };

  const userProfile = async () => {
    try {
      const url = "https://api.escuelajs.co/api/v1/auth/profile";

      axios
        .get(url, { headers: { Authorization: `Bearer ${accessToken}` } })
        .then((res) => {
          console.log(res.data);
          setUserDetails(res.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createNewProduct = () => {
    post(`https://api.escuelajs.co/api/v1/products/`, {
      title: productName,
      price: price,
      description: description,
      categoryId: category,
      images: [productImg],
    })
      .then((res) => {
        console.log(res);
        getProductList();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CartProvider>
      <Header data={userDetails} />

      <div className="md:flex md:w-9/12 mx-auto justify-between container mb-3 mt-4">
        <Search value={search} onChange={searchHandler} />

        <select
          name="category"
          id=""
          className="border-width-1 border outline-1 focus-within:outline-2 p-2 mx-3 rounded-lg w-30"
          value={select}
          onChange={selectOptionHandle}
        >
          <option>All</option>

          {uniq.map((item, i) => (
            <option key={i}>{item}</option>
          ))}
        </select>
        <div className="div">
          <Row>
            <Col span={12}>
              <Slider
                onChange={onChange}
                value={typeof inputValue === "number" ? inputValue : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                style={{
                  margin: "0 16px",
                }}
                value={inputValue}
                onChange={onChange}
              />
            </Col>
          </Row>
        </div>
      </div>

      <Modal
        title="Create New Product"
        okType="danger"
        open={isModalOpen}
        onOk={createNewProduct}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
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
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
              size="large"
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
              value={description}
              placeholder="description"
              onChange={(e) => setDescrition(e.target.value)}
              size="large"
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
              value={category}
              placeholder="category id"
              onChange={(e) => setCategory(e.target.value)}
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={productImg}
              placeholder="Pase Image URL"
              onChange={(e) => setProductImg(e.target.value)}
              size="large"
            />
          </Form.Item>
        </Form>
      </Modal>
      <div className="container mx-auto flex justify-end">
      <Button
        type="primary"
        className="bg-blue-600 text-white"
        onClick={() => setIsModalOpen(true)}
      >
        Add Product
      </Button>
      </div>
      <div className="container mx-auto  ">
        <span className=" italic text-red-500 font-semibold md:m-3">{`${products.length} found`}</span>

        <div className="grid  grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 gap-5  m-3  dark:bg-slate-800  bg-white">
          {products.length === 0 || products.length === null ? (
            <p className="  font-sans italic text-center">
              sorry! didn't found
            </p>
          ) : (
            products.map((item) => {
              return (
                <Product
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  images={item.images}
                  description={item.description}
                  creationAt={item.creationAt}
                  updatedAt={item.updatedAt}
                  category={item.category}
                  price={item.price}
                />
              );
            })
          )}
        </div>
      </div>
    </CartProvider>
  );
};

export default Home;
