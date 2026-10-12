
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext(undefined);

function getStoredData(key) {
  try {
    const data = localStorage.getItem(key);
    const parsedData = data ? JSON.parse(data) : [];
    return Array.isArray(parsedData) ? parsedData : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => getStoredData("vora-cart"));
  const [wishlist, setWishlist] = useState(() =>
    getStoredData("vora-wishlist")
  );

  useEffect(() => {
    localStorage.setItem("vora-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("vora-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function addToCart(product, quantity = 1) {
    if (!product || quantity < 1) return;

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  item.stock ?? Infinity
                ),
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: Math.min(quantity, product.stock ?? Infinity),
        },
      ];
    });
  }

  function removeFromCart(productId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }

  function updateQuantity(productId, quantity) {
    if (!Number.isFinite(quantity) || quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.min(
                Math.floor(quantity),
                item.stock ?? Infinity
              ),
            }
          : item
      )
    );
  }

  function toggleWishlist(product) {
    if (!product) return;

    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === product.id
      );

      return exists
        ? currentWishlist.filter((item) => item.id !== product.id)
        : [...currentWishlist, product];
    });
  }

  function removeFromWishlist(productId) {
    setWishlist((currentWishlist) =>
      currentWishlist.filter((item) => item.id !== productId)
    );
  }

  function isInWishlist(productId) {
    return wishlist.some((item) => item.id === productId);
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cart,
    wishlist,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
