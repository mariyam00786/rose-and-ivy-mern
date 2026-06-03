import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const freshHarvested = products.slice(0, 4);

  const collections = [
    { name: 'Bouquets', image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400', path: '/products?category=bouquets' },
    { name: 'Single Flowers', image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?w=400', path: '/products?category=single-flowers' },
    { name: 'Luxury Gifts', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400', path: '/products?category=gifts' },
    { name: 'Shop All', image: 'https://images.unsplash.com/photo-1530745342977-18046bc7a38b?w=400', path: '/products' },
  ];

  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* Hero Section */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '600px', background: '#F7E7CE33' }}>
        <div style={{ padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '11px', color: '#D4AF37', fontWeight: 700, marginBottom: '16px' }}>LUXURY FLORIST DUBAI</span>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '56px', fontWeight: 400, color: '#222', lineHeight: '1.15', marginBottom: '24px' }}>
            Bring Smiles to<br />Your Loved Ones
          </h1>
          <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6', marginBottom: '40px', maxWidth: '440px' }}>
            Discover luxury handcrafted bouquets and gifts designed by master florists. Hand-delivered across Dubai and Abu Dhabi with a 100% freshness guarantee.
          </p>
          <div>
            <Link to="/products" style={{ background: '#222', color: 'white', textDecoration: 'none', padding: '16px 36px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'background 0.2s', display: 'inline-flex', alignItems: 'center', gap: '8px' }} onMouseEnter={e=>e.target.style.background='#D4AF37'} onMouseLeave={e=>e.target.style.background='#222'}>
              Shop The Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=1000" alt="Hero bouquet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      {/* Shop By Collection */}
      <section style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', textAlign: 'center', marginBottom: '48px', fontWeight: 500 }}>Shop By Collection</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {collections.map((c) => (
            <Link key={c.name} to={c.path} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', marginBottom: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', border: '2px solid white', transition: 'transform 0.3s' }} onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
                <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#222', letterSpacing: '0.05em' }}>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ background: '#fcfcfc', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          {[
            { icon: Truck, title: 'Free Delivery', desc: 'On orders above AED 500' },
            { icon: Clock, title: 'Same-Day Delivery', desc: 'Order before 7:00 PM' },
            { icon: Sparkles, title: 'Freshness Promise', desc: 'Hand-picked blooms daily' },
            { icon: ShieldCheck, title: '100% Secure Checkout', desc: 'Secure SSL encrypted gateway' },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: '#F7E7CE', padding: '12px', borderRadius: '50%', color: '#D4AF37', display: 'flex' }}>
                <b.icon size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{b.title}</h4>
                <p style={{ fontSize: '12px', color: '#888' }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Curations */}
      <section style={{ padding: '80px 24px', maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', textAlign: 'center', marginBottom: '12px', fontWeight: 500 }}>Featured Curations</h2>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '14px', marginBottom: '48px' }}>Exquisite arrangements selected by our floral designers.</p>
        
        {loading ? (
          <p style={{ textAlign: 'center', color: '#999', fontSize: '15px' }}>Loading curations...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {featuredProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* Freshly Harvested */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', textAlign: 'center', marginBottom: '12px', fontWeight: 500 }}>Freshly Harvested</h2>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '14px', marginBottom: '48px' }}>Our latest creations, freshly put together today.</p>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#999', fontSize: '15px' }}>Loading flowers...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {freshHarvested.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
