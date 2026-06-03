import React from 'react';

export default function AnnouncementBar() {
  return (
    <div style={{background:'#222222',color:'white',fontSize:'10px',letterSpacing:'0.15em',fontWeight:500,padding:'10px 16px',textAlign:'center',textTransform:'uppercase',borderBottom:'1px solid rgba(255,255,255,0.05)',userSelect:'none'}}>
      GET 10% OFF, CODE: <span style={{color:'#D4AF37',fontWeight:700}}>FIRST10</span> | FREE SAME-DAY SHIPPING ON ORDERS OVER AED 500
    </div>
  );
}
