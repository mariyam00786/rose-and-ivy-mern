import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart, updateCartItem, clearCart } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) { setCart({ items: [] }); return; }
    try {
      const res = await getCart();
      setCart(res.data || { items: [] });
    } catch { setCart({ items: [] }); }
  };

  useEffect(() => { fetchCart(); }, [user]);

  const addItem = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      await addToCart(productId, quantity);
      await fetchCart();
      setIsOpen(true);
    } finally { setLoading(false); }
  };

  const removeItem = async (productId) => {
    await removeFromCart(productId);
    await fetchCart();
  };

  const updateItem = async (productId, quantity) => {
    await updateCartItem(productId, quantity);
    await fetchCart();
  };

  const emptyCart = async () => {
    await clearCart();
    setCart({ items: [] });
  };

  const itemCount = cart.items?.reduce((s, i) => s + (i.quantity || 0), 0) || 0;
  const total = cart.items?.reduce((s, i) => s + (i.product?.price || 0) * (i.quantity || 0), 0) || 0;

  return (
    <CartContext.Provider value={{ cart, isOpen, setIsOpen, addItem, removeItem, updateItem, emptyCart, itemCount, total, loading, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
