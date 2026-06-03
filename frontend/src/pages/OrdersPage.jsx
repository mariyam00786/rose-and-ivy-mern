import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { getOrders } from '../services/orderService';
import { useAuth } from '../context/AuthContext';

export default function OrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success') === 'true';
  const orderId = searchParams.get('orderId') || '';

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/accounts/login');
      return;
    }

    getOrders()
      .then((res) => {
        setOrders(res.data);
        if (res.data.length > 0) {
          // auto expand first order
          setExpandedOrderId(res.data[0]._id);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const toggleExpand = (id) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return { bg: '#e8f5e9', text: '#2e7d32' };
      case 'shipped':
        return { bg: '#e3f2fd', text: '#1565c0' };
      case 'cancelled':
        return { bg: '#ffebee', text: '#c62828' };
      default:
        return { bg: '#fff3e0', text: '#ef6c00' }; // processing
    }
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '80vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Checkout Success Banner */}
        {success && (
          <div style={{ background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: '16px', padding: '24px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <CheckCircle2 size={40} style={{ color: '#2e7d32' }} />
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#2e7d32' }}>Thank you for your purchase!</h2>
              <p style={{ fontSize: '14px', color: '#388e3c', marginTop: '4px' }}>
                Your order has been successfully placed. Order ID: <span style={{ fontWeight: 700 }}>#{orderId}</span>
              </p>
            </div>
          </div>
        )}

        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: 500, color: '#222', marginBottom: '32px' }}>
          Your Order History
        </h1>

        {loading ? (
          <div style={{ color: '#888', textAlign: 'center', padding: '40px 0' }}>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', border: '1px dashed #e5e5e5', borderRadius: '16px' }}>
            <p style={{ color: '#888', fontSize: '15px', marginBottom: '20px' }}>You haven&apos;t placed any orders yet.</p>
            <Link to="/products" style={{ background: '#222', color: 'white', textDecoration: 'none', padding: '12px 32px', borderRadius: '999px', fontSize: '13px', fontWeight: 600 }}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.map((order) => {
              const statusStyle = getStatusColor(order.orderStatus);
              const isExpanded = expandedOrderId === order._id;

              return (
                <div key={order._id} style={{ border: '1px solid #f0f0f0', borderRadius: '16px', overflow: 'hidden' }}>
                  {/* Order Header Card */}
                  <div
                    onClick={() => toggleExpand(order._id)}
                    style={{ background: '#fcfcfc', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
                  >
                    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                      <div>
                        <span style={{ display: 'block', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order Date</span>
                        <span style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#222', marginTop: '2px' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order ID</span>
                        <span style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#222', marginTop: '2px' }}>#{order._id}</span>
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Amount</span>
                        <span style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginTop: '2px' }}>AED {order.total?.toFixed(2)}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: statusStyle.bg, color: statusStyle.text, padding: '4px 12px', borderRadius: '999px' }}>
                        {order.orderStatus}
                      </span>
                      {isExpanded ? <ChevronUp size={20} style={{ color: '#aaa' }} /> : <ChevronDown size={20} style={{ color: '#aaa' }} />}
                    </div>
                  </div>

                  {/* Order Details Panel */}
                  {isExpanded && (
                    <div style={{ padding: '24px', borderTop: '1px solid #f4f4f5', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
                      {/* Products */}
                      <div>
                        <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#222', marginBottom: '16px' }}>Ordered Items</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {order.items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                              <img src={item.product?.imageUrl} alt={item.product?.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }} />
                              <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>{item.product?.name}</p>
                                <p style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>AED {item.price?.toFixed(2)} &times; {item.qty}</p>
                              </div>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: '#222' }}>AED {(item.price * item.qty).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping/Payment info */}
                      <div style={{ background: '#fcfcfc', border: '1px solid #f4f4f5', borderRadius: '16px', padding: '20px' }}>
                        <div style={{ marginBottom: '20px' }}>
                          <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                            <MapPin size={14} /> Shipping Location
                          </h4>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>{order.deliveryAddress.name}</p>
                          <p style={{ fontSize: '12px', color: '#666', marginTop: '2px', lineHeight: '1.4' }}>
                            {order.deliveryAddress.address}, {order.deliveryAddress.city}
                          </p>
                        </div>

                        <div>
                          <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                            <CreditCard size={14} /> Payment Details
                          </h4>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: '#222' }}>
                            {order.paymentMethod}
                          </p>
                          <p style={{ fontSize: '12px', color: '#666', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            Status: <span style={{ fontWeight: 600, color: order.paymentStatus === 'Paid' ? '#2e7d32' : '#c62828' }}>{order.paymentStatus}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
