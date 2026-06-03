import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const UPSELLS = [
  { name: 'Rose Water Spray', price: 35, slug: 'rose-water-spray' },
  { name: 'Gift Ribbon & Card', price: 25, slug: 'gift-ribbon-card' },
  { name: 'Flower Food Sachet', price: 15, slug: 'flower-food-sachet' },
];

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeItem, updateItem, total, loading } = useCart();
  const { user } = useAuth();

  return (
    <>
      <div className={`cart-overlay${isOpen?' open':''}`} onClick={()=>setIsOpen(false)} />
      <div className={`cart-drawer${isOpen?' open':''}`}>
        {/* Header */}
        <div style={{padding:'20px 24px',borderBottom:'1px solid #f4f4f5',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:22,fontWeight:600,color:'#222'}}>Shopping Cart</h2>
            {cart.items?.length>0 && <p style={{fontSize:11,color:'#999',marginTop:2}}>{cart.items.length} item{cart.items.length!==1?'s':''}</p>}
          </div>
          <button onClick={()=>setIsOpen(false)} style={{background:'none',border:'none',cursor:'pointer',color:'#aaa',display:'flex',padding:4}} onMouseEnter={e=>e.currentTarget.style.color='#222'} onMouseLeave={e=>e.currentTarget.style.color='#aaa'}><X size={22} /></button>
        </div>

        {/* Items */}
        <div style={{flex:1,overflowY:'auto',padding:'16px 24px'}}>
          {!user ? (
            <div style={{textAlign:'center',padding:'48px 0',color:'#aaa'}}>
              <ShoppingBag size={40} style={{margin:'0 auto 12px',opacity:0.3}} />
              <p style={{fontSize:13,marginBottom:12}}>Please login to view your cart</p>
              <Link to="/accounts/login" onClick={()=>setIsOpen(false)} style={{background:'#222',color:'white',textDecoration:'none',padding:'8px 24px',borderRadius:999,fontSize:12,fontWeight:600}}>Login</Link>
            </div>
          ) : loading ? (
            <p style={{textAlign:'center',color:'#aaa',padding:'32px 0',fontSize:13}}>Loading your items...</p>
          ) : cart.items?.length===0 ? (
            <div style={{textAlign:'center',padding:'48px 0',color:'#aaa'}}>
              <ShoppingBag size={40} style={{margin:'0 auto 12px',opacity:0.3}} />
              <p style={{fontSize:13,marginBottom:12}}>Your cart is empty</p>
              <Link to="/products" onClick={()=>setIsOpen(false)} style={{background:'#222',color:'white',textDecoration:'none',padding:'8px 24px',borderRadius:999,fontSize:12,fontWeight:600}}>Shop Now</Link>
            </div>
          ) : (
            cart.items.map(item => (
              <div key={item.product?._id} style={{display:'flex',gap:12,marginBottom:16,paddingBottom:16,borderBottom:'1px solid #f9f9f9'}}>
                <img src={item.product?.imageUrl} alt={item.product?.name} style={{width:64,height:64,objectFit:'cover',borderRadius:8,flexShrink:0}} />
                <div style={{flex:1,minWidth:0}}>
                  <p style={{fontSize:12,fontWeight:600,color:'#222',marginBottom:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.product?.name}</p>
                  <p style={{fontSize:11,color:'#D4AF37',marginBottom:8}}>AED {item.product?.price?.toFixed(2)}</p>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <button onClick={()=>item.quantity>1?updateItem(item.product._id,item.quantity-1):removeItem(item.product._id)} style={{width:24,height:24,borderRadius:'50%',border:'1px solid #e5e5e5',background:'white',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#222'}}><Minus size={12} /></button>
                    <span style={{fontSize:13,fontWeight:600,minWidth:20,textAlign:'center'}}>{item.quantity}</span>
                    <button onClick={()=>updateItem(item.product._id,item.quantity+1)} style={{width:24,height:24,borderRadius:'50%',border:'1px solid #e5e5e5',background:'white',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#222'}}><Plus size={12} /></button>
                    <button onClick={()=>removeItem(item.product._id)} style={{marginLeft:'auto',background:'none',border:'none',cursor:'pointer',color:'#ccc',display:'flex'}} onMouseEnter={e=>e.currentTarget.style.color='#ef4444'} onMouseLeave={e=>e.currentTarget.style.color='#ccc'}><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Upsells */}
          {cart.items?.length>0 && (
            <div style={{background:'#fffbf0',border:'1px solid #f0e8c8',borderRadius:12,padding:16,marginTop:8}}>
              <p style={{fontSize:10,fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'#D4AF37',marginBottom:12}}>Add Luxury Touches</p>
              {UPSELLS.map(u=>(
                <div key={u.slug} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <span style={{fontSize:12,color:'#222'}}>{u.name}</span>
                  <span style={{fontSize:12,fontWeight:600,color:'#D4AF37'}}>+AED {u.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items?.length>0 && (
          <div style={{padding:'16px 24px',borderTop:'1px solid #f4f4f5'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:16}}>
              <span style={{fontSize:13,color:'#666'}}>Estimated Total</span>
              <span style={{fontSize:15,fontWeight:700,color:'#222'}}>AED {total.toFixed(2)} Inc. VAT</span>
            </div>
            <Link to="/cart" onClick={()=>setIsOpen(false)} style={{display:'block',textAlign:'center',border:'1px solid #222',color:'#222',textDecoration:'none',padding:'10px',borderRadius:999,fontSize:12,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:8,transition:'all 0.2s'}} onMouseEnter={e=>{e.target.style.background='#222';e.target.style.color='white'}} onMouseLeave={e=>{e.target.style.background='';e.target.style.color='#222'}}>View Cart</Link>
            <Link to="/orders/checkout" onClick={()=>setIsOpen(false)} style={{display:'block',textAlign:'center',background:'#222',color:'white',textDecoration:'none',padding:'10px',borderRadius:999,fontSize:12,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:12,transition:'background 0.2s'}} onMouseEnter={e=>e.target.style.background='#D4AF37'} onMouseLeave={e=>e.target.style.background='#222'}>Checkout</Link>
            <p style={{textAlign:'center',fontSize:9,color:'#aaa',letterSpacing:'0.1em',textTransform:'uppercase'}}>100% SECURE SSL TEST CHECKOUT</p>
          </div>
        )}
      </div>
    </>
  );
}
