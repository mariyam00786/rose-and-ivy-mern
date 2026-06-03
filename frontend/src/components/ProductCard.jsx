import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const wishlisted = isWishlisted(product._id);

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/accounts/login'); return; }
    await toggle(product._id);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/accounts/login'); return; }
    await addItem(product._id, 1);
  };

  return (
    <div style={{background:'white',borderRadius:16,overflow:'hidden',border:'1px solid #f4f4f5',boxShadow:'0 1px 4px rgba(0,0,0,0.04)',transition:'box-shadow 0.2s',display:'flex',flexDirection:'column'}} onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.09)'} onMouseLeave={e=>e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.04)'}>
      {/* Image */}
      <div style={{position:'relative',aspectRatio:'1/1',background:'#f9f9f9',overflow:'hidden'}}>
        <Link to={`/products/${product.slug}`}>
          <img src={product.imageUrl} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.5s ease'}} onMouseEnter={e=>e.target.style.transform='scale(1.05)'} onMouseLeave={e=>e.target.style.transform='scale(1)'} />
        </Link>
        <button onClick={handleWishlist} style={{position:'absolute',top:12,right:12,background:'rgba(255,255,255,0.92)',backdropFilter:'blur(4px)',border:'1px solid #f0f0f0',borderRadius:'50%',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',transition:'all 0.2s',color:wishlisted?'#ef4444':'#222',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}} onMouseEnter={e=>e.currentTarget.style.background='#fff0f0'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.92)'}>
          <Heart size={16} fill={wishlisted?'#ef4444':'none'} />
        </button>
      </div>
      {/* Content */}
      <div style={{padding:'16px 20px',flexGrow:1,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div style={{marginBottom:12}}>
          <span style={{fontSize:9,textTransform:'uppercase',letterSpacing:'0.2em',color:'#D4AF37',fontWeight:700,display:'block',marginBottom:4}}>{product.category}</span>
          <h4 style={{fontFamily:'Cormorant Garamond,serif',fontSize:15,fontWeight:600,color:'#222',marginBottom:6,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
            <Link to={`/products/${product.slug}`} style={{color:'inherit',textDecoration:'none',transition:'color 0.2s'}} onMouseEnter={e=>e.target.style.color='#D4AF37'} onMouseLeave={e=>e.target.style.color='#222'}>{product.name}</Link>
          </h4>
          <div style={{display:'flex',alignItems:'center',gap:4}}>
            <Star size={13} fill='#D4AF37' color='#D4AF37' />
            <span style={{fontSize:10,color:'#aaa',fontWeight:600}}>({(product.rating||0).toFixed(1)})</span>
          </div>
        </div>
        <div style={{borderTop:'1px solid #f9f9f9',paddingTop:12,display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
          <span style={{fontWeight:700,fontSize:13,color:'#222'}}>AED {product.price?.toFixed(2)} Inc. VAT</span>
          <button onClick={handleAdd} style={{background:'#222',color:'white',border:'none',borderRadius:999,padding:'7px 16px',fontSize:10,fontWeight:600,letterSpacing:'0.15em',textTransform:'uppercase',cursor:'pointer',display:'flex',alignItems:'center',gap:6,transition:'background 0.2s'}} onMouseEnter={e=>e.currentTarget.style.background='#D4AF37'} onMouseLeave={e=>e.currentTarget.style.background='#222'}>
            <ShoppingBag size={13} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
