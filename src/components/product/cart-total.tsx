import { Col, Row } from "react-bootstrap";

import { FC } from "react";

type CartTotalProps = {
  cartTotal: number | string;
};

export const CartTotal: FC<CartTotalProps> = ({ cartTotal }) => {
  return (
    <Row>
      <Col className="text-end total">
        <span>£{cartTotal}</span>
      </Col>
    </Row>
  );
};
