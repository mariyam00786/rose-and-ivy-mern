import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AnnouncementBar />
      <Navbar />
      <div style={{ flexGrow: 1 }}>{children}</div>
      <CartDrawer />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                
                {/* Product routes */}
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                
                {/* Cart routes */}
                <Route path="/cart" element={<CartPage />} />
                <Route path="/cart/" element={<CartPage />} />
                
                {/* Checkout & Orders */}
                <Route path="/orders/checkout" element={<CheckoutPage />} />
                <Route path="/orders/checkout/" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/" element={<OrdersPage />} />
                
                {/* Wishlist */}
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/wishlist/" element={<WishlistPage />} />
                
                {/* Accounts */}
                <Route path="/accounts/login" element={<LoginPage />} />
                <Route path="/accounts/login/" element={<LoginPage />} />
                <Route path="/accounts/register" element={<RegisterPage />} />
                <Route path="/accounts/register/" element={<RegisterPage />} />
              </Routes>
            </Layout>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
