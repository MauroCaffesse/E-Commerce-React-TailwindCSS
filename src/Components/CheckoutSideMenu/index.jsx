import { useContext } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import "./styles.css";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../utils";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id !== id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: "01.08.23",
      products: context.cartProducts,
      quantity: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };

    context.closeCheckoutSideMenu();
    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.setSearchByTitle(null);
  };

  return (
    <>
      {context.isCheckoutSideMenuOpen && (
        <aside className="checkout-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white ">
          <div className="flex justify-between items-center p-6">
            <h2 className="font-medium text-xl">My Order</h2>
            <div>
              <XMarkIcon
                className="h-6 w-6 text-black cursor-pointer"
                onClick={() => context.closeCheckoutSideMenu()}
              />
            </div>
          </div>
          <div className="flex-1 px-6 overflow-y-auto">
            {context.cartProducts?.map((product) => (
              <OrderCard
                key={product.id}
                id={product.id}
                title={product.title}
                imageUrl={product.images[0]}
                price={product.price}
                handleDelete={handleDelete}
              />
            ))}
          </div>
          <div className="mb-6 px-6">
            <p className="flex justify-between items-center mb-2">
              <span className="font-light">Total:</span>
              <span className="font-medium text-2xl">
                ${totalPrice(context.cartProducts)}
              </span>
            </p>
            <Link to={"/my-orders/last"}>
              <button
                className="w-full bg-black py-3 text-white rounded-lg"
                onClick={() => handleCheckout()}
              >
                Checkout
              </button>
            </Link>
          </div>
        </aside>
      )}
    </>
  );
};

export default CheckoutSideMenu;
