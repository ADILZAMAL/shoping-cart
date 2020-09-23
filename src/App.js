import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data.json";
import { Col, Container, Row } from "react-bootstrap";
import Product from "./components/Product";
import Filter from "./components/Filter";
import CartItems from "./components/CartItems";
function App() {
  const [products, setProducts] = useState([]);
  const [size, setSize] = useState("ALL"); //filter
  const [sort, setSort] = useState("Latest"); //sort
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setProducts(data.products);
  }, []);

  const removeItemFromCart = (product) => {
    const oldCartItems = [...cartItems];
    const index = oldCartItems.findIndex((item) => {
      return item._id == product._id;
    });
    oldCartItems.splice(index, 1);
    setCartItems(oldCartItems);
  };
  const addToCartItem = (product) => {
    const oldCartItems = [...cartItems];
    const index = oldCartItems.findIndex((item) => {
      return item._id == product._id;
    });
    console.log(index);
    if (index > -1) {
      oldCartItems[index].count++;
    } else {
      oldCartItems.push({ ...product, count: 1 });
    }
    setCartItems(oldCartItems);
  };
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
          <Col className="border product__list" md="9">
            <Row>
              <Filter
                size={size}
                sort={sort}
                filterProducts={filterProducts}
                sortProducts={sortProducts}
                count={products.length}
              />
              {products.map((product) => {
                return (
                  <Product
                    addToCartItem={addToCartItem}
                    key={product._id}
                    data={product}
                  />
                );
              })}
            </Row>
          </Col>
          <Col className="border" md="3">
            <CartItems
              cartItems={cartItems}
              removeItemFromCart={removeItemFromCart}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
