import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, Tag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const { cart, removeItem, updateItem, total, loading } = useCart();
  const { user } = useAuth();
  const [coupon, setCoupon] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (coupon.trim().toUpperCase() === 'FIRST10') {
      setDiscountPercent(10);
      setCouponSuccess('Promo code FIRST10 applied successfully! (10% discount)');
    } else {
      setDiscountPercent(0);
      setCouponError('Invalid promo code. Try FIRST10');
    }
  };

  const discountAmount = total * (discountPercent / 100);
  const shippingCost = total >= 500 ? 0 : 50;
  const finalTotal = total - discountAmount + shippingCost;

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', padding: '24px' }}>
        <ShoppingBag size={64} style={{ color: '#ccc', marginBottom: '24px' }} />
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', marginBottom: '12px' }}>Access Your Shopping Bag</h1>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>Please log in to view or edit items in your bag.</p>
        <Link to="/accounts/login" style={{ background: '#222', color: 'white', textDecoration: 'none', padding: '12px 32px', borderRadius: '999px', fontSize: '13px', fontWeight: 600 }}>Log In</Link>
      </div>
    );
  }

  if (loading && cart.items?.length === 0) {
    return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>Loading your shopping bag...</div>;
  }

  return (
    <div style={{ background: '#FFFFFF', minHeight: '80vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: 500, color: '#222', marginBottom: '40px' }}>
          Your Shopping Bag
        </h1>

        {cart.items?.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed #e5e5e5', borderRadius: '16px' }}>
            <ShoppingBag size={48} style={{ color: '#ccc', margin: '0 auto 16px' }} />
            <p style={{ color: '#888', fontSize: '15px', marginBottom: '24px' }}>Your shopping bag is currently empty.</p>
            <Link to="/products" style={{ background: '#222', color: 'white', textDecoration: 'none', padding: '12px 32px', borderRadius: '999px', fontSize: '13px', fontWeight: 600 }}>
              Discover Our Flowers
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '48px', alignItems: 'start' }}>
            {/* Items Column */}
            <div>
              <div style={{ borderBottom: '1px solid #f4f4f5', paddingBottom: '16px', marginBottom: '24px', display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888' }}>
                <span>Product Curations</span>
                <span style={{ textAlign: 'center' }}>Price</span>
                <span style={{ textAlign: 'center' }}>Quantity</span>
                <span style={{ textAlign: 'right' }}>Total</span>
              </div>

              {cart.items.map((item) => (
                <div key={item.product?._id} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr', alignItems: 'center', paddingBottom: '24px', marginBottom: '24px', borderBottom: '1px solid #f9f9f9' }}>
                  {/* Info */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <img src={item.product?.imageUrl} alt={item.product?.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px' }} />
                    <div>
                      <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#222', marginBottom: '4px' }}>
                        <Link to={`/products/${item.product?.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{item.product?.name}</Link>
                      </h4>
                      <p style={{ fontSize: '11px', color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.product?.category}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#222' }}>
                    AED {item.product?.price?.toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div style={{ display: 'flex', justifySelf: 'center', alignItems: 'center', border: '1px solid #e5e5e5', borderRadius: '999px', padding: '4px 10px' }}>
                    <button onClick={() => item.quantity > 1 ? updateItem(item.product._id, item.quantity - 1) : removeItem(item.product._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#666' }}><Minus size={12} /></button>
                    <span style={{ fontSize: '13px', fontWeight: 600, minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateItem(item.product._id, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#666' }}><Plus size={12} /></button>
                  </div>

                  {/* Total */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#222' }}>
                      AED {((item.product?.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </span>
                    <button onClick={() => removeItem(item.product._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', display: 'flex' }} onMouseEnter={e=>e.currentTarget.style.color='#ef4444'} onMouseLeave={e=>e.currentTarget.style.color='#ccc'}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}

              {/* Coupon Code Section */}
              <div style={{ background: '#fcfcfc', border: '1px solid #f4f4f5', borderRadius: '16px', padding: '24px', marginTop: '40px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#222', marginBottom: '16px' }}>Have a Promo Code?</h3>
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Enter code (e.g. FIRST10)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    style={{ flexGrow: 1, border: '1px solid #e5e5e5', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', outline: 'none' }}
                  />
                  <button type="submit" style={{ background: '#222', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Tag size={16} /> Apply
                  </button>
                </form>
                {couponError && <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '8px' }}>{couponError}</p>}
                {couponSuccess && <p style={{ fontSize: '12px', color: '#22c55e', marginTop: '8px' }}>{couponSuccess}</p>}
              </div>
            </div>

            {/* Summary Column */}
            <aside style={{ background: '#fcfcfc', border: '1px solid #f4f4f5', borderRadius: '24px', padding: '32px' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 600, color: '#222', marginBottom: '24px' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666' }}>
                  <span>Bag Subtotal</span>
                  <span style={{ fontWeight: 600, color: '#222' }}>AED {total.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#22c55e' }}>
                    <span>Promo Discount (10%)</span>
                    <span>-AED {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666' }}>
                  <span>Estimated Shipping</span>
                  <span style={{ fontWeight: 600, color: '#222' }}>{shippingCost === 0 ? 'FREE' : `AED ${shippingCost.toFixed(2)}`}</span>
                </div>
                {shippingCost > 0 && (
                  <p style={{ fontSize: '10px', color: '#aaa', marginTop: '-8px' }}>Add AED {(500 - total).toFixed(2)} more for free same-day shipping!</p>
                )}
              </div>

              <div style={{ borderTop: '1px solid #f4f4f5', paddingTop: '20px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#222' }}>Estimated Total</span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#222' }}>AED {finalTotal.toFixed(2)} Inc. VAT</span>
              </div>

              <Link
                to={`/orders/checkout?coupon=${discountPercent > 0 ? 'FIRST10' : ''}`}
                style={{ display: 'block', textAlign: 'center', background: '#222', color: 'white', textDecoration: 'none', padding: '16px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'background 0.2s', marginBottom: '16px' }}
                onMouseEnter={e=>e.currentTarget.style.background='#D4AF37'}
                onMouseLeave={e=>e.currentTarget.style.background='#222'}
              >
                Proceed To Checkout
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <ShieldCheck size={14} /> 100% SECURE SSL TEST CHECKOUT
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
