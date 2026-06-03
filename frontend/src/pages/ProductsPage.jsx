import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { id: '', label: 'All Products' },
  { id: 'bouquets', label: 'Bouquets' },
  { id: 'single-flowers', label: 'Single Flowers' },
  { id: 'gifts', label: 'Gifts & Accessories' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get('category') || '';
  const searchQ = searchParams.get('q') || '';

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category) params.category = category;
    if (searchQ) params.q = searchQ;

    getProducts(params)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category, searchQ]);

  const handleCategoryChange = (catId) => {
    const newParams = {};
    if (catId) newParams.category = catId;
    if (searchQ) newParams.q = searchQ;
    setSearchParams(newParams);
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '80vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '40px' }}>
        
        {/* Sidebar Filters */}
        <aside>
          <h3 style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#222', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #f4f4f5' }}>
            Collections
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => handleCategoryChange(c.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'inherit',
                    fontSize: '13px',
                    fontWeight: category === c.id ? 700 : 500,
                    color: category === c.id ? '#D4AF37' : '#666',
                    cursor: 'pointer',
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={e=>e.target.style.color='#D4AF37'}
                  onMouseLeave={e=>{if(category !== c.id) e.target.style.color='#666'}}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Catalog List */}
        <main>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 500, color: '#222' }}>
                {CATEGORIES.find((c) => c.id === category)?.label || 'Our Collection'}
              </h1>
              {searchQ && (
                <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                  Search results for &ldquo;<span style={{ fontWeight: 600, color: '#222' }}>{searchQ}</span>&rdquo;
                </p>
              )}
            </div>
            <p style={{ fontSize: '13px', color: '#999' }}>{products.length} curations found</p>
          </div>

          {loading ? (
            <p style={{ color: '#aaa', textAlign: 'center', padding: '80px 0' }}>Loading products...</p>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed #e5e5e5', borderRadius: '16px' }}>
              <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>No products found matching your filter criteria.</p>
              <button onClick={() => setSearchParams({})} style={{ background: '#222', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
