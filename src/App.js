import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data.json";
import { Col, Container, Row } from "react-bootstrap";
import Product from "./components/Product";
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(data.products);
  }, []);
  return (
    <div className="app">
      <Navbar />
      <Container fluid>
        <Row>
          <Col className="border product__list" md="8">
            <Row>
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
