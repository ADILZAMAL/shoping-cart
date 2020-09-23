import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "../style/Cart.css";
export default function CartItems({ cartItems, removeItemFromCart }) {
  return (
    <Container fluid className="cart">
      <Row className="cart__header p-3">
        <h6>
          {cartItems.length === 0
            ? "You have zero item in the cart"
            : `You have ${cartItems.length} items in the cart`}
        </h6>
      </Row>
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
                        removeItemFromCart(item);
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
              {cartItems.reduce((a, b) => a + b.price * b.count, 0).toFixed(2)}
            </p>
            <Button size="sm" variant="warning">
              Proceed
            </Button>
          </div>
        )}
      </Row>
    </Container>
  );
}
