import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import Product from "./components/Product";
import Filter from "./components/Filter";
import CartItems from "./components/CartItems";
import Fade from "react-reveal";
import { fetchProducts } from "./store/product";
import { useDispatch, useSelector } from "react-redux";
import { filteredProductSelector } from "./store/product";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const products = useSelector(filteredProductSelector);

  const placeOrder = (order) => {
    alert("save order data for" + order.name);
  };

  return (
    <div className="app">
      <Fade>
        <Navbar />
      </Fade>

      <Container fluid>
        <Row>
          <Col className=" product__list" md="9">
            <Row>
              <Filter count={products.length} />
              <Fade bottom cascade>
                <Row>
                  {products.map((product) => {
                    return <Product key={product._id} data={product} />;
                  })}
                </Row>
              </Fade>
            </Row>
          </Col>
          <Col className="" md="3">
            <CartItems placeOrder={placeOrder} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
