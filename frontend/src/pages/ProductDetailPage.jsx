import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Plus, Minus, ShieldCheck, RefreshCw } from 'lucide-react';
import { getProductBySlug, getProducts } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug)
      .then((res) => {
        setProduct(res.data);
        setQty(1);
        // Fetch related products
        getProducts({ category: res.data.category })
          .then((relRes) => {
            setRelated(relRes.data.filter((p) => p.slug !== slug).slice(0, 4));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.error(err);
        navigate('/products');
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>Loading product details...</div>;
  }

  if (!product) return null;

  const wishlisted = isWishlisted(product._id);

  const handleWishlist = async () => {
    if (!user) { navigate('/accounts/login'); return; }
    await toggle(product._id);
  };

  const handleAddToCart = async () => {
    if (!user) { navigate('/accounts/login'); return; }
    await addItem(product._id, qty);
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '80vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Main Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', marginBottom: '80px' }}>
          {/* Image Panel */}
          <div style={{ background: '#f9f9f9', borderRadius: '24px', overflow: 'hidden', aspectRatio: '1/1' }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Product Details Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#D4AF37', fontWeight: 700, marginBottom: '12px', display: 'block' }}>
              {product.category}
            </span>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: 500, color: '#222', lineHeight: '1.15', marginBottom: '16px' }}>
              {product.name}
            </h1>
            
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill={i < Math.round(product.rating || 5) ? '#D4AF37' : 'none'} color='#D4AF37' />
                ))}
              </div>
              <span style={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
                {(product.rating || 5.0).toFixed(1)} ({(product.numReviews || 0)} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#222', marginBottom: '24px' }}>
              AED {product.price?.toFixed(2)} <span style={{ fontSize: '13px', fontWeight: 500, color: '#888', marginLeft: '6px' }}>Inc. VAT</span>
            </div>

            {/* Description Preview */}
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>
              {product.description}
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e5e5', borderRadius: '999px', padding: '6px 12px' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#666' }}><Minus size={16} /></button>
                <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '40px', textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#666' }}><Plus size={16} /></button>
              </div>

              <button
                onClick={handleAddToCart}
                style={{ flexGrow: 1, background: '#222', color: 'white', border: 'none', borderRadius: '999px', padding: '16px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.background='#D4AF37'}
                onMouseLeave={e=>e.currentTarget.style.background='#222'}
              >
                <ShoppingBag size={16} /> Add To Shopping Bag
              </button>

              <button onClick={handleWishlist} style={{ background: wishlisted ? '#fff0f0' : 'none', border: '1px solid #e5e5e5', borderRadius: '50%', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: wishlisted ? '#ef4444' : '#222', transition: 'all 0.2s' }}>
                <Heart size={20} fill={wishlisted ? '#ef4444' : 'none'} />
              </button>
            </div>

            {/* Delivery/Returns trust indicators */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid #f4f4f5', paddingTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#666' }}>
                <ShieldCheck size={18} style={{ color: '#D4AF37' }} />
                <span>Same-day hand delivery available in Dubai & Abu Dhabi.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#666' }}>
                <RefreshCw size={18} style={{ color: '#D4AF37' }} />
                <span>Freshness guarantee: 100% fresh flowers hand-curated daily.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Informational Tabs */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #f4f4f5', gap: '32px', marginBottom: '24px' }}>
            {['description', 'shipping', 'care'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  paddingBottom: '12px',
                  fontFamily: 'inherit',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  color: activeTab === tab ? '#D4AF37' : '#999',
                  borderBottom: activeTab === tab ? '2px solid #D4AF37' : 'none',
                  marginBottom: '-1px'
                }}
              >
                {tab === 'care' ? 'Care Instructions' : tab === 'shipping' ? 'Delivery & Returns' : 'Product Info'}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '14px', lineHeight: '1.7', color: '#666' }}>
            {activeTab === 'description' && (
              <p>{product.description} Crafted with love using premium curated blossoms from sustainable local and international growers.</p>
            )}
            {activeTab === 'shipping' && (
              <p>We deliver same-day to Dubai, Abu Dhabi, Sharjah, and Ajman for orders placed before 7:00 PM GST. Free standard delivery is automatically applied to orders over AED 500. Due to the delicate nature of fresh flower curations, we cannot accept returns once flowers have left our boutique, but we offer immediate replacements if freshness is compromised upon receipt.</p>
            )}
            {activeTab === 'care' && (
              <p>Keep your blooms fresh longer by cutting stems at a 45-degree angle before placing in cold water. Refill water daily and place the arrangement in a cool area away from direct sunlight, heating vents, and ripening fruit. Add a packet of flower food to provide necessary nutrients.</p>
            )}
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 500, color: '#222', marginBottom: '32px' }}>You May Also Love</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
