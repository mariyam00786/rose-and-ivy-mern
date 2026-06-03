import { createContext, useContext, useState, useEffect } from 'react';
import { getWishlist, toggleWishlist } from '../services/wishlistService';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    if (!user) { setWishlist([]); return; }
    try {
      const res = await getWishlist();
      setWishlist(res.data?.products || []);
    } catch { setWishlist([]); }
  };

  useEffect(() => { fetchWishlist(); }, [user]);

  const toggle = async (productId) => {
    try {
      const res = await toggleWishlist(productId);
      setWishlist(res.data?.products || []);
    } catch {}
  };

  const isWishlisted = (productId) => wishlist.some(p => (p._id || p) === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggle, isWishlisted, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
