import { CartActionTypes, CartItems } from "../interfaces/cart";

import { Products } from "../interfaces/product";

export const filterByColor = (data: Products, color: string): Products =>
  data.filter((item) => item.colour === color);

export const extractColorsFromProducts = (data: Products): string[] => [
  ...data
    .map((item) => item.colour)
    .filter((value, index, self) => self.indexOf(value) === index),
];

export const findProduct = (data: Products, id: number) =>
  data.find((item) => item.id === id);

export const modifyCart = (
  cart: CartItems,
  products: Products,
  product_id: number,
  type: CartActionTypes
) => {
  const product = findProduct(products, product_id);
  if (!product) {
    return [...cart];
  }
  const productAlreadyInCart = checkIfProductExistsInCart(cart, product_id);
  const addProductToCart = () => {
    if (productAlreadyInCart) {
      return [
        ...cart.map((item) =>
          item.product_id === product_id
            ? {
                ...item,
                price: item.price + product.price,
                quantity: ++item.quantity,
              }
            : item
        ),
      ];
    }
    return [...cart, { product_id, price: product.price, quantity: 1 }];
  };
  const removeProductFromCart = () =>
    cart.filter((item) => item.product_id !== product_id);

  const decrement = () => [
    ...cart.map((item) =>
      item.product_id === product_id && item.quantity > 1
        ? {
            ...item,
            price: item.price - product.price,
            quantity: --item.quantity,
          }
        : item
    ),
  ];

  switch (type) {
    case "add":
    case "increment":
      return addProductToCart();
    case "remove":
      return removeProductFromCart();
    // case "increment":
    case "decrement":
      return decrement();
    default:
      return [...cart];
  }
};

export const getSingleProduct = (data: CartItems, product_id: number) =>
  data.find((item) => item.product_id === product_id);

export const checkIfProductExistsInCart = (
  data: CartItems,
  product_id: number
) => !!data.find((item) => item.product_id === product_id);

export const cartTotal = (data: CartItems) =>
  data.reduce((a, b) => a + b.price, 0).toFixed(2);
