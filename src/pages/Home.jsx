import React, { useEffect, useState } from "react";
import Banner from "../component/Banner";
import Product from "../component/Product";
import Header from "../component/Header";
import { get } from "../Network/ApiCalling";
import Search from "../component/Search";
import { Button, Pagination, message } from "antd";
import { Spin } from "antd";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    getProductList();
  }, [currentPage, itemsPerPage]);

  const getProductList = (offset, limit) => {
    setLoading(true);
    get(
      `https://api.escuelajs.co/api/v1/products?offset=${
        (currentPage - 1) * itemsPerPage
      }&limit=${itemsPerPage}`
    )
      .then((res) => {
        console.log(res);
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
        console.log("productList", productList);
        setProducts(productList);
        setSearchFilter(productList);
        setTotalPages(res);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };
  const totalPage = Math.ceil(totalItems / itemsPerPage);
  const handlepageChage = (page) => {
    setCurrentPage(page);
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

  return (
    <>
      <Header />

      <div className="md:w-3/6 px-3  py-3 mx-auto">
        <Search value={search} onChange={searchHandler} />
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 2xl:grid-cols-4 lg:grid-cols-3 gap-5 m-3 justify-stretch  dark:bg-slate-800  bg-white">
          {products.length === 0 ? (
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

        <Pagination
          className="flex justify-center mt-10"
          defaultCurrent={1}
          current={currentPage}
          total={totalPages}
          onChange={handlepageChage}
          pageSize={itemsPerPage}
        />
      </div>
    </>
  );
};

export default Home;
