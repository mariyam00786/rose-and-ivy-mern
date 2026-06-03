import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', padding: '24px' }}>
        <Heart size={64} style={{ color: '#ccc', marginBottom: '24px' }} />
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', marginBottom: '12px' }}>Access Your Wishlist</h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Please log in to view items in your wishlist.</p>
        <Link to="/accounts/login" style={{ background: '#222', color: 'white', textDecoration: 'none', padding: '12px 32px', borderRadius: '999px', fontSize: '13px', fontWeight: 600 }}>Log In</Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#FFFFFF', minHeight: '80vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: 500, color: '#222', marginBottom: '40px' }}>
          Your Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed #e5e5e5', borderRadius: '16px' }}>
            <Heart size={48} style={{ color: '#ccc', margin: '0 auto 16px' }} />
            <p style={{ color: '#888', fontSize: '15px', marginBottom: '24px' }}>Your wishlist is currently empty.</p>
            <Link to="/products" style={{ background: '#222', color: 'white', textDecoration: 'none', padding: '12px 32px', borderRadius: '999px', fontSize: '13px', fontWeight: 600 }}>
              Discover Flowers
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
