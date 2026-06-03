import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const { itemCount, setIsOpen } = useCart();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header style={{position:'sticky',top:0,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',zIndex:40,borderBottom:'1px solid #f4f4f5',transition:'all 0.2s'}}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px',height:80,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        {/* Logo */}
        <Link to="/" style={{fontFamily:'Cormorant Garamond,serif',fontSize:28,fontWeight:500,letterSpacing:'0.05em',color:'#222',textDecoration:'none',transition:'color 0.2s'}} onMouseEnter={e=>e.target.style.color='#D4AF37'} onMouseLeave={e=>e.target.style.color='#222'}>
          Rose &amp; Ivy
        </Link>

        {/* Center nav */}
        <nav style={{display:'flex',alignItems:'center',gap:32,fontWeight:500,fontSize:12,letterSpacing:'0.15em',textTransform:'uppercase',color:'#222'}}>
          {/* Occasions */}
          <div style={{position:'relative'}} className="group">
            <button style={{display:'flex',alignItems:'center',gap:4,background:'none',border:'none',cursor:'pointer',color:'inherit',fontWeight:'inherit',fontSize:'inherit',letterSpacing:'inherit',textTransform:'inherit'}} className="nav-hover-line">
              Occasions <ChevronDown size={14} style={{opacity:0.6}} />
            </button>
            <div style={{position:'absolute',top:'100%',left:'50%',transform:'translateX(-50%)',width:192,background:'white',border:'1px solid #f4f4f5',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',opacity:0,pointerEvents:'none',transition:'all 0.2s',zIndex:50,padding:'8px 0'}} className="dropdown-menu">
              {[['Anniversary','/products?q=Anniversary'],['Birthday','/products?q=Birthday'],['Ramadan','/products?q=Ramadan']].map(([label,href])=> (
                <Link key={label} to={href} style={{display:'block',padding:'8px 16px',color:'#222',textDecoration:'none',fontSize:12,fontWeight:500,transition:'all 0.15s'}} onMouseEnter={e=>{e.target.style.background='#f9f9f9';e.target.style.color='#D4AF37'}} onMouseLeave={e=>{e.target.style.background='';e.target.style.color='#222'}}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Shop By Flower */}
          <div style={{position:'relative'}} className="group">
            <button style={{display:'flex',alignItems:'center',gap:4,background:'none',border:'none',cursor:'pointer',color:'inherit',fontWeight:'inherit',fontSize:'inherit',letterSpacing:'inherit',textTransform:'inherit'}} className="nav-hover-line">
              Shop By Flower <ChevronDown size={14} style={{opacity:0.6}} />
            </button>
            <div style={{position:'absolute',top:'100%',left:'50%',transform:'translateX(-50%)',width:208,background:'white',border:'1px solid #f4f4f5',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',opacity:0,pointerEvents:'none',transition:'all 0.2s',zIndex:50,padding:'8px 0'} } className="dropdown-menu">
              {[['Bouquets','/products?category=bouquets'],['Single Flowers','/products?category=single-flowers'],['Flower Boxes','/products?q=box']].map(([label,href])=>(
                <Link key={label} to={href} style={{display:'block',padding:'8px 16px',color:'#222',textDecoration:'none',fontSize:12,fontWeight:500,transition:'all 0.15s'}} onMouseEnter={e=>{e.target.style.background='#f9f9f9';e.target.style.color='#D4AF37'}} onMouseLeave={e=>{e.target.style.background='';e.target.style.color='#222'}}>{label}</Link>
              ))}
            </div>
          </div>

          <Link to="/products" style={{color:'#222',textDecoration:'none',transition:'color 0.2s'}} className="nav-hover-line" onMouseEnter={e=>e.target.style.color='#D4AF37'} onMouseLeave={e=>e.target.style.color='#222'}>Same-Day Delivery</Link>
        </nav>

        {/* Right utilities */}
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          {/* Search */}
          <form onSubmit={handleSearch} style={{position:'relative',display:'flex',alignItems:'center'}}>
            <input
              type="search" placeholder="Search curations..." value={search} onChange={e=>setSearch(e.target.value)}
              style={{width:200,background:'#f9f9f9',border:'1px solid #e5e5e5',borderRadius:999,padding:'6px 36px 6px 16px',fontSize:12,color:'#222',outline:'none',transition:'all 0.2s'}}
              onFocus={e=>{e.target.style.borderColor='#D4AF37';e.target.style.background='white'}}
              onBlur={e=>{e.target.style.borderColor='#e5e5e5';e.target.style.background='#f9f9f9'}}
            />
            <button type="submit" style={{position:'absolute',right:12,background:'none',border:'none',cursor:'pointer',color:'#aaa',display:'flex'}}><Search size={16} /></button>
          </form>

          {/* Wishlist */}
          <Link to="/wishlist" style={{color:'#222',display:'flex',padding:6,transition:'color 0.2s',textDecoration:'none'}} onMouseEnter={e=>e.currentTarget.style.color='#D4AF37'} onMouseLeave={e=>e.currentTarget.style.color='#222'}>
            <Heart size={20} />
          </Link>

          {/* Cart */}
          <button onClick={()=>setIsOpen(true)} style={{position:'relative',background:'none',border:'none',cursor:'pointer',color:'#222',display:'flex',padding:6,transition:'color 0.2s'}} onMouseEnter={e=>e.currentTarget.style.color='#D4AF37'} onMouseLeave={e=>e.currentTarget.style.color='#222'}>
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span style={{position:'absolute',top:-4,right:-4,background:'#222',color:'white',fontSize:9,fontWeight:700,borderRadius:'50%',width:16,height:16,display:'flex',alignItems:'center',justifyContent:'center',border:'1.5px solid white'}}>{itemCount}</span>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <Link to="/orders" style={{display:'flex',alignItems:'center',gap:4,color:'#222',textDecoration:'none',fontSize:12,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase'}} onMouseEnter={e=>e.currentTarget.style.color='#D4AF37'} onMouseLeave={e=>e.currentTarget.style.color='#222'}>
                <User size={16} /> {user.name?.split(' ')[0]}
              </Link>
              <button onClick={logoutUser} style={{display:'flex',alignItems:'center',gap:4,background:'none',border:'none',cursor:'pointer',color:'#999',fontSize:11}} onMouseEnter={e=>e.currentTarget.style.color='#D4AF37'} onMouseLeave={e=>e.currentTarget.style.color='#999'}>
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div style={{display:'flex',alignItems:'center',gap:8,fontSize:12,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase'}}>
              <Link to="/accounts/login" style={{color:'#222',textDecoration:'none',padding:'4px 8px'}} onMouseEnter={e=>e.target.style.color='#D4AF37'} onMouseLeave={e=>e.target.style.color='#222'}>Login</Link>
              <Link to="/accounts/register" style={{background:'#222',color:'white',textDecoration:'none',padding:'6px 16px',borderRadius:999,transition:'background 0.2s'}} onMouseEnter={e=>e.target.style.background='#D4AF37'} onMouseLeave={e=>e.target.style.background='#222'}>Register</Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .group:hover .dropdown-menu { opacity: 1 !important; pointer-events: all !important; transform: translateX(-50%) translateY(0) !important; }
        .dropdown-menu { transform: translateX(-50%) translateY(8px) !important; }
        .group:hover .dropdown-menu { transform: translateX(-50%) translateY(0) !important; }
      `}</style>
    </header>
  );
}
