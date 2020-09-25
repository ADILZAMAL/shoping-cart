import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../style/Cart.css";
import Fade from "react-reveal";
import { cartItemSelector, removeFromCart } from "../store/product";
import { useSelector, useDispatch } from "react-redux";
export default function CartItems({ placeOrder }) {
  const cartItems = useSelector(cartItemSelector);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const createOrder = (event) => {
    event.preventDefault();
    const order = {
      name,
      email,
      address,
      cartItems,
    };
    placeOrder(order);

    setEmail("");
    setName("");
    setAddress("");
    console.log(order);
  };
  return (
    <Container fluid className="cart">
      <Row className="cart__header p-3">
        <h6>
          {cartItems.length === 0
            ? "You have zero item in the cart"
            : `You have ${cartItems.length} items in the cart`}
        </h6>
      </Row>
      <Fade left cascade>
        <Row>
          {cartItems.map((item) => {
            return (
              <div key={item._id} className="cart__item p-3 ">
                <div className="cart__image_title ">
                  <img className="px-3" src={item.image} />
                  <div>
                    <p>{item.title}</p>
                    <div className="cart__price_removeBtn">
                      <p>
                        ${item.price}*{item.count}
                      </p>
                      <Button
                        onClick={() => {
                          dispatch(removeFromCart(item));
                        }}
                        variant="secondary"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {cartItems.length !== 0 && (
            <div className="cart__total p-5">
              <p className="cart__total__price">
                Total:$
                {cartItems
                  .reduce((a, b) => a + b.price * b.count, 0)
                  .toFixed(2)}
              </p>
              <Button
                onClick={() => {
                  setShowCheckoutForm(true);
                }}
                size="sm"
                variant="warning"
              >
                Proceed
              </Button>
            </div>
          )}
        </Row>
      </Fade>
      {showCheckoutForm && (
        <Row>
          <Col>
            <Fade right cascade>
              <Form onSubmit={createOrder}>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter Address"
                  />
                </Form.Group>
                <Button variant="warning" type="submit">
                  Checkout
                </Button>
              </Form>
            </Fade>
          </Col>
        </Row>
      )}
    </Container>
  );
}
