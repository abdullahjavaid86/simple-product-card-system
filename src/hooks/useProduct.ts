import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  cartTotal,
  checkIfProductExistsInCart,
  extractColorsFromProducts,
  filterByColor,
  getSingleProduct,
  modifyCart,
} from "../utils/helpers";

import { CartItems } from "../interfaces/cart";
import { FetchProductsApi } from "../utils/services/actions";
import { Products } from "../interfaces/product";

export const useProduct = () => {
  const [allProducts, setAllProducts] = useState<Products>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Products>([]);
  const [colorFilters, setColorFilters] = useState<string[]>([]);
  const [color, setColor] = useState<string>("");
  const [cart, setCart] = useState<CartItems>([]);

  const fetchProducts = useCallback(async (signal: AbortSignal) => {
    try {
      setLoading(true);
      const products = (await FetchProductsApi.fetchProductsApi(
        signal
      )) as unknown as Products;
      setAllProducts(products);
      setProducts(products);
      setColorFilters(extractColorsFromProducts(products));
    } finally {
      setLoading(false);
    }
  }, []);

  const onColorChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const { value } = target;
    setColor(value);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchProducts(signal);

    return () => {
      controller.abort();
    };
  }, [fetchProducts]);

  // Cart
  const addToCart = (product_id: number) => {
    setCart(modifyCart(cart, allProducts, product_id, "add"));
  };

  const removeFromCart = (product_id: number) => {
    setCart(modifyCart(cart, allProducts, product_id, "remove"));
  };

  const incrementProduct = (product_id: number) => {
    setCart(modifyCart(cart, allProducts, product_id, "increment"));
  };

  const decrementProduct = (product_id: number) => {
    setCart(modifyCart(cart, allProducts, product_id, "decrement"));
  };

  const productExistsInCart = (product_id: number) =>
    checkIfProductExistsInCart(cart, product_id);

  const getSingleProductFromCart = (product_id: number) =>
    getSingleProduct(cart, product_id);

  const getCartTotal = () => cartTotal(cart);

  useEffect(() => {
    if (color) {
      setProducts([...filterByColor(allProducts, color)]);
    } else {
      setProducts([...allProducts]);
    }
  }, [color, allProducts]);

  return {
    loading,
    allProducts,
    products,
    color,
    colorFilters,
    onColorChange,
    cart,
    addToCart,
    removeFromCart,
    incrementProduct,
    decrementProduct,
    productExistsInCart,
    getSingleProductFromCart,
    getCartTotal,
  };
};
