import { Card, Col, Image, Row } from "react-bootstrap";
import { FC, ReactElement } from "react";

import { CartItem } from "../../interfaces/cart";
import { Product } from "../../interfaces/product";

type ProductCardProps = {
  product: Product;
  addToCart: (product_id: number) => void;
  removeFromCart: (product_id: number) => void;
  incrementProduct: (product_id: number) => void;
  decrementProduct: (product_id: number) => void;
  existsInCart: (product_id: number) => boolean;
  getCartItemDetails: (product_id: number) => CartItem | undefined;
};

export const ProductCard: FC<ProductCardProps> = ({
  product,
  addToCart,
  removeFromCart,
  incrementProduct,
  decrementProduct,
  existsInCart,
  getCartItemDetails,
}): ReactElement => {
  const { id, price, name, colour, img } = product;
  return (
    <section>
      <Row className="py-3">
        <Col>
          <Card>
            <Row>
              <Col>
                <Image src={img} alt={colour} className="p-3" height={300} />
              </Col>
              <Col md={8} className="d-flex justify-content-between">
                <div className="card-details w-75">
                  <h2>{name}</h2>
                  <p className="color">{colour}</p>
                  <p className="price">
                    £<span>{price}</span>
                  </p>
                </div>
                <div className="w-25 d-flex align-items-center justify-content-center flex-column">
                  {existsInCart(id) ? (
                    <div className="counter w-75 d-flex justify-content-between">
                      <span
                        className="pr-2 cursor-pointer user-select-none"
                        onClick={() => decrementProduct(id)}
                      >
                        -
                      </span>
                      {getCartItemDetails(id)?.quantity}
                      <span
                        className="pl-2 cursor-pointer user-select-none"
                        onClick={() => incrementProduct(id)}
                      >
                        +
                      </span>
                    </div>
                  ) : null}
                  {!existsInCart(id) ? (
                    <div
                      className="counter cursor-pointer user-select-none"
                      onClick={() => addToCart(id)}
                    >
                      Add
                    </div>
                  ) : null}
                  {existsInCart(id) ? (
                    <div
                      className="counter text-sm cursor-pointer user-select-none"
                      onClick={() => removeFromCart(id)}
                    >
                      Remove
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {/* <div className="continer">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="row">
                <div className="col-md-4">
                  <img src="" alt="" />
                </div>
                <div className="col-md-8 d-flex justify-content-between">
                  <div className="card-details">
                    <h2>Card HEading</h2>
                    <p className="price">
                      Price <span>1300</span>
                    </p>
                  </div>
                  <div className="counter"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};
