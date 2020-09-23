import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../style/Filter.css";
export default function Filter({
  size,
  sort,
  filterProducts,
  sortProducts,
  count,
}) {
  return (
    <Container className="filter p-3">
      <Row>
        <Col>{count} Products</Col>
        <Col>
          Order{" "}
          <select value={sort} onChange={sortProducts}>
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </Col>
        <Col>
          Filter{" "}
          <select value={size} onChange={filterProducts}>
            <option value="ALL">ALL</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXl</option>
          </select>
        </Col>
      </Row>
    </Container>
  );
}
