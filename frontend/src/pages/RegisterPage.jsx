import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { register } from '../services/authService';

export default function RegisterPage() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const res = await register(formData);
      loginUser(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Email is already registered. Please login instead.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: '480px', background: '#fcfcfc', border: '1px solid #f0f0f0', borderRadius: '24px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 500, color: '#222', marginBottom: '8px' }}>
            Create An Account
          </h1>
          <p style={{ fontSize: '13px', color: '#666' }}>Sign up to save wishlists and orders instantly</p>
        </div>

        {error && <div style={{ background: '#fff0f0', border: '1px solid #ffc1c1', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '13px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px' }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px' }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px' }}>Password (min 6 chars)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px' }}>Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{ width: '100%', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#666', marginBottom: '6px' }}>Default Delivery Address (Optional)</label>
            <textarea
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              style={{ width: '100%', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', outline: 'none', resize: 'none' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ background: '#222', color: 'white', border: 'none', borderRadius: '999px', padding: '14px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px' }}
          >
            <UserPlus size={16} /> {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#666', marginTop: '24px' }}>
          Already have an account? <Link to="/accounts/login" style={{ color: '#D4AF37', fontWeight: 600, textDecoration: 'none' }}>Log in here</Link>
        </p>
      </div>
    </div>
  );
}
