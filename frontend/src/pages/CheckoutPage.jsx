import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import api from '../services/api';

export default function CheckoutPage() {
  const { cart, total, emptyCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hasCoupon = searchParams.get('coupon') === 'FIRST10';

  const [address, setAddress] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: 'Dubai',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/accounts/login');
    } else if (cart.items?.length === 0) {
      navigate('/cart');
    }
  }, [user, cart, navigate]);

  const discountAmount = hasCoupon ? total * 0.1 : 0;
  const shippingCost = total >= 500 ? 0 : 50;
  const finalTotal = total - discountAmount + shippingCost;

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!address.name || !address.email || !address.phone || !address.address) {
      setError('Please fill in all shipping details.');
      setLoading(false);
      return;
    }

    try {
      const orderPayload = {
        items: cart.items.map((i) => ({
          product: i.product._id,
          qty: i.quantity,
          price: i.product.price,
        })),
        total: finalTotal,
        deliveryAddress: address,
        paymentMethod,
      };

      if (paymentMethod === 'COD') {
        // Post to payments/cod
        const res = await api.post('/payments/cod', orderPayload);
        await emptyCart();
        navigate(`/orders?success=true&orderId=${res.data._id}`);
      } else if (paymentMethod === 'Stripe') {
        // Simulate Stripe checkout redirect or call mock
        const stripeRes = await api.post('/payments/stripe/create-session', {
          amount: finalTotal,
          successUrl: `${window.location.origin}/orders`,
        });
        // Create the actual order
        const res = await createOrder({
          ...orderPayload,
          paymentStatus: 'Paid',
          paymentMethod: 'Stripe',
        });
        await emptyCart();
        // Redirect to success URL
        window.location.href = `${stripeRes.data.url}&success=true&orderId=${res.data._id}`;
      } else if (paymentMethod === 'Razorpay') {
        // Simulate Razorpay order checkout
        const razorRes = await api.post('/payments/razorpay/create-order', {
          amount: finalTotal,
        });
        alert(`Razorpay checkout opened! Order ID: ${razorRes.data.id}. Simulating successful signature verification.`);
        const res = await createOrder({
          ...orderPayload,
          paymentStatus: 'Paid',
          paymentMethod: 'Razorpay',
        });
        await emptyCart();
        navigate(`/orders?success=true&orderId=${res.data._id}`);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while processing your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '80vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <button onClick={() => navigate('/cart')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#666' }}>
            <ArrowLeft size={16} /> Back to Shopping Bag
          </button>
        </div>

        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: 500, color: '#222', marginBottom: '40px' }}>
          Delivery &amp; Checkout
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '64px', alignItems: 'start' }}>
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#222', marginBottom: '24px', paddingBottom: '8px', borderBottom: '1px solid #f4f4f5' }}>
              Shipping Details
            </h2>

            {error && <div style={{ background: '#fff0f0', border: '1px solid #ffc1c1', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '13px' }}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px' }}>Full Name</label>
                <input type="text" name="name" value={address.name} onChange={handleChange} required style={{ width: '100%', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px' }}>Email Address</label>
                <input type="email" name="email" value={address.email} onChange={handleChange} required style={{ width: '100%', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px' }}>Phone Number (Mobile)</label>
                <input type="tel" name="phone" value={address.phone} onChange={handleChange} required style={{ width: '100%', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px' }}>City (UAE)</label>
                <select name="city" value={address.city} onChange={handleChange} style={{ width: '100%', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none', background: 'white' }}>
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px' }}>Street Address / Apartment / Villa No.</label>
              <textarea name="address" rows="3" value={address.address} onChange={handleChange} required style={{ width: '100%', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none', resize: 'none' }} />
            </div>

            <h2 style={{ fontSize: '16px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#222', marginBottom: '24px', paddingBottom: '8px', borderBottom: '1px solid #f4f4f5' }}>
              Payment Method
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {[
                { id: 'COD', label: 'Cash On Delivery (COD)', desc: 'Pay with cash upon delivery of flowers.', icon: Truck },
                { id: 'Stripe', label: 'Stripe Card Payment', desc: 'Secure debit/credit card processing.', icon: CreditCard },
                { id: 'Razorpay', label: 'Razorpay UPI & Netbanking', desc: 'Pay instantly via UPI or Net Banking.', icon: CreditCard },
              ].map((method) => (
                <label key={method.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', border: paymentMethod === method.id ? '2px solid #D4AF37' : '1px solid #e5e5e5', background: paymentMethod === method.id ? '#fffdf5' : 'white', padding: '16px 20px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <input type="radio" name="payment" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} style={{ accentColor: '#D4AF37' }} />
                  <div style={{ background: '#f4f4f5', padding: '10px', borderRadius: '50%', color: '#222', display: 'flex' }}><method.icon size={20} /></div>
                  <div>
                    <span style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#222' }}>{method.label}</span>
                    <span style={{ display: 'block', fontSize: '12px', color: '#888', marginTop: '2px' }}>{method.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: '#222', color: 'white', border: 'none', borderRadius: '999px', padding: '16px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.background='#D4AF37'}
              onMouseLeave={e=>e.currentTarget.style.background='#222'}
            >
              {loading ? 'Processing Order...' : 'Confirm and Place Order'}
            </button>
          </form>

          {/* Sidebar summary */}
          <aside style={{ background: '#fcfcfc', border: '1px solid #f4f4f5', borderRadius: '24px', padding: '32px' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 600, color: '#222', marginBottom: '24px' }}>Items Summary</h3>

            {cart.items?.map((item) => (
              <div key={item.product?._id} style={{ display: 'flex', gap: '12px', paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid #f4f4f5' }}>
                <img src={item.product?.imageUrl} alt={item.product?.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#222', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product?.name}</p>
                  <p style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>Qty: {item.quantity} &times; AED {item.product?.price?.toFixed(2)}</p>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#222' }}>AED {((item.product?.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
              </div>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '24px 0', borderBottom: '1px solid #f4f4f5', paddingBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: '#222' }}>AED {total.toFixed(2)}</span>
              </div>
              {hasCoupon && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#22c55e' }}>
                  <span>Promo (FIRST10 - 10%)</span>
                  <span>-AED {discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#666' }}>
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `AED ${shippingCost.toFixed(2)}`}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#222' }}>Grand Total</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#222' }}>AED {finalTotal.toFixed(2)} Inc. VAT</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <ShieldCheck size={14} /> 100% SECURE SSL TEST CHECKOUT
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
