import { Link } from 'react-router-dom';

const Instagram = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{background:'#222',color:'white',padding:'48px 24px 24px'}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:48,marginBottom:40}}>
          <div>
            <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:28,fontWeight:500,marginBottom:12,color:'white'}}>Rose &amp; Ivy</h3>
            <p style={{color:'#999',fontSize:13,lineHeight:1.7,maxWidth:300}}>Luxury floral boutique delivering premium handcrafted bouquets across Dubai & Abu Dhabi. Same-day delivery available.</p>
            <div style={{display:'flex',gap:16,marginTop:20}}>
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" style={{color:'#666',transition:'color 0.2s',display:'flex'}} onMouseEnter={e=>e.currentTarget.style.color='#D4AF37'} onMouseLeave={e=>e.currentTarget.style.color='#666'}><Icon size={20} /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{fontSize:11,fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'#D4AF37',marginBottom:16}}>Shop</h4>
            {[
              ['Bouquets', '/products?category=bouquets'],
              ['Single Flowers', '/products?category=single-flowers'],
              ['Gifts', '/products?category=gifts'],
              ['All Products', '/products']
            ].map(([label,href])=>(
              <Link key={label} to={href} style={{display:'block',color:'#999',textDecoration:'none',fontSize:13,marginBottom:8,transition:'color 0.2s'}} onMouseEnter={e=>e.target.style.color='#D4AF37'} onMouseLeave={e=>e.target.style.color='#999'}>{label}</Link>
            ))}
          </div>
          <div>
            <h4 style={{fontSize:11,fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',color:'#D4AF37',marginBottom:16}}>Account</h4>
            {[
              ['Login', '/accounts/login'],
              ['Register', '/accounts/register'],
              ['My Orders', '/orders'],
              ['Wishlist', '/wishlist']
            ].map(([label,href])=>(
              <Link key={label} to={href} style={{display:'block',color:'#999',textDecoration:'none',fontSize:13,marginBottom:8,transition:'color 0.2s'}} onMouseEnter={e=>e.target.style.color='#D4AF37'} onMouseLeave={e=>e.target.style.color='#999'}>{label}</Link>
            ))}
          </div>
        </div>
        <div style={{borderTop:'1px solid #333',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <p style={{color:'#666',fontSize:11,letterSpacing:'0.1em'}}>&copy; 2025 Rose &amp; Ivy. All rights reserved.</p>
          <p style={{color:'#555',fontSize:11}}>Dubai &amp; Abu Dhabi, UAE</p>
        </div>
      </div>
    </footer>
  );
}
