import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data.json";
import { Col, Container, Row } from "react-bootstrap";
import Product from "./components/Product";
import Filter from "./components/Filter";
function App() {
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState("ALL"); //filter
  const [sort, setSort] = useState("Latest"); //sort
  useEffect(() => {
    setProducts(data.products);
  }, []);
  const sortProducts = (event) => {
    setSort(event.target.value);
    products.sort((a, b) => {
      if (event.target.value === "lowest") {
        return a.price > b.price ? 1 : -1;
      } else if (event.target.value === "highest") {
        return a.price < b.price ? 1 : -1;
      } else {
        return a._id > b._id ? -1 : 1;
      }
    });
  };

  //Size filter
  const filterProducts = (event) => {
    setSize(event.target.value);
    setProducts(
      data.products.filter((product) => {
        if (event.target.value == "ALL") return true;
        const index = product.availableSizes.findIndex(
          (availableSize) => availableSize == event.target.value
        );
        if (index > -1) return true;
        else return false;
      })
    );
  };

  return (
    <div className="app">
      <Navbar />
      <Container fluid>
        <Row>
          <Col className="border product__list" md="8">
            <Row>
              <Filter
                size={size}
                sort={sort}
                filterProducts={filterProducts}
                sortProducts={sortProducts}
                count={products.length}
              />
              {products.map((product) => {
                return <Product key={product._id} data={product} />;
              })}
            </Row>
          </Col>
          <Col className="border" md="4">
            <h1>Shopping summary</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
