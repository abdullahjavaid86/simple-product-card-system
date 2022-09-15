import { CartTotal } from "../../components/product/cart-total";
import { ColorFilter } from "../../components/product/color-filter";
import { Container } from "react-bootstrap";
import { ProductCard } from "../../components/product/card";
import { useProduct } from "../../hooks/useProduct";

const ProductsView = () => {
  const {
    loading,
    products,
    colorFilters,
    color,
    onColorChange,
    addToCart,
    removeFromCart,
    incrementProduct,
    decrementProduct,
    productExistsInCart,
    getSingleProductFromCart,
    getCartTotal,
  } = useProduct();

  return (
    <Container>
      {loading ? "Loading...." : null}
      {!loading && !products.length ? "No Product(s) found" : null}
      {!loading && products.length ? (
        <>
          <ColorFilter
            color={color}
            colors={colorFilters}
            onChange={onColorChange}
          />
          {products.map((item) => (
            <ProductCard
              product={item}
              key={item.id}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              incrementProduct={incrementProduct}
              decrementProduct={decrementProduct}
              existsInCart={productExistsInCart}
              getCartItemDetails={getSingleProductFromCart}
            />
          ))}
          <CartTotal cartTotal={getCartTotal()} />
        </>
      ) : null}
    </Container>
  );
};

export default ProductsView;
