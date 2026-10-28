import { jsPDF } from "jspdf";
import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, Menu, X, Sparkles, CalendarDays, Clock3, MapPin, Phone, Instagram, ChevronDown, Check, ShieldCheck, Heart, Gift, LayoutDashboard, UserRound, Plus, Trash2, LogOut, MessageCircle, Star } from 'lucide-react';
import './styles.css';
import logo from './assets/logo.png';

// Existing service photos in src/assets
import makeupPhoto from './assets/makeup.jpg';
import nailsPhoto from './assets/nails.jpg';
import womensBraidsPhoto from './assets/womens-braids.jpg';
import mensBraidsPhoto from './assets/mens-braids.jpg';
import wigsPhoto from './assets/wigs.jpg';
import kidsHaircutsPhoto from './assets/kids-haircuts.jpg';
import silkPressPhoto from './assets/silk-press.jpg';
import skincarePhoto from './assets/skincare.jpg';
import teethWhiteningPhoto from './assets/teeth-whitening.jpg';

// Add these three image files to src/assets using these exact filenames.
// To change a photo later, replace the file while keeping its filename.
import mensHaircutPhoto from './assets/mens-haircut.jpg';
import spaTreatmentPhoto from './assets/spa-treatment.jpg';
import wigInstallationPhoto from './assets/wig-installation.jpg';

// Existing local gallery photos
import gallery1 from './assets/gallerya.jpeg';
import gallery2 from './assets/galleryb.jpeg';
import gallery3 from './assets/galleryc.jpeg';
import gallery4 from './assets/galleryd.jpeg';

const WA_NUMBER = '2202289291';

// Illustrative starting prices in Gambian dalasi (D). Confirm prices and durations with Mirrored before publishing.
const services = [
  { name: 'Makeup', category: 'Aesthetics', duration: '60 min', price: 1500, desc: 'Professional makeup for everyday beauty and special occasions.', image: makeupPhoto },
  { name: 'Nails', category: 'Nails', duration: '60 min', price: 800, desc: 'Manicures, pedicures and nail art with a polished finish.', image: nailsPhoto },
  { name: "Women's Braids", category: 'Hair', duration: '180 min', price: 1500, desc: 'Protective braiding styles tailored to your personal look.', image: womensBraidsPhoto },
  { name: "Men's Braids", category: 'Hair', duration: '90 min', price: 800, desc: 'Neat, stylish braids designed for a fresh finish.', image: mensBraidsPhoto },
  { name: 'Wigs', category: 'Hair', duration: '90 min', price: 1200, desc: 'Wig styling and finishing services.', image: wigsPhoto },
  { name: 'Wig Installation', category: 'Hair', duration: '90 min', price: 1200, desc: 'Professional wig installation and styling for a seamless finish.', image: wigInstallationPhoto },
  { name: "Men's Haircuts", category: 'Hair', duration: '30 min', price: 500, desc: 'Clean, stylish haircuts tailored to your look.', image: mensHaircutPhoto },
  { name: "Kids' Haircuts", category: 'Hair', duration: '30 min', price: 300, desc: 'Comfortable haircuts and neat styles for children.', image: kidsHaircutsPhoto },
  { name: 'Silk Press', category: 'Hair', duration: '120 min', price: 1000, desc: 'A smooth, silky finish for natural hair.', image: silkPressPhoto },
  { name: 'Skincare Treatments', category: 'Spa & Wellness', duration: '60 min', price: 1200, desc: 'Facial and skincare treatments for a refreshed glow.', image: skincarePhoto },
  { name: 'Spa Treatments', category: 'Spa & Wellness', duration: '60 min', price: 1500, desc: 'Relaxing spa experiences designed to help you unwind.', image: spaTreatmentPhoto },
  { name: 'Teeth Whitening', category: 'Aesthetics', duration: '60 min', price: 1500, desc: 'Ask the team about available cosmetic teeth-whitening options.', image: teethWhiteningPhoto },
];

const mirroredGifts = [
  {
    id: 'reset',
    name: 'The Reset',
    subtitle: 'Your moment of calm.',
    price: 2500,
    category: 'SELF-CARE',
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=85',
    description:
      'Step away from the noise and give yourself permission to slow down. A thoughtful wellness escape.',
    includes: [
      'Signature facial',
      'Relaxation massage',
      'A peaceful moment to unwind'
    ],
    perfectFor: 'Self-care, appreciation and thoughtful surprises'
  },
  {
    id: 'golden-hour',
    name: 'The Golden Hour',
    subtitle: 'A little extra luxury.',
    price: 3200,
    category: 'THE BEAUTY EDIT',
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85',
    description:
      'A beautiful beauty ritual designed to make an ordinary day feel like a special occasion.',
    includes: [
      'Luxury manicure',
      'Luxury pedicure',
      'Refreshment'
    ],
    perfectFor: 'Birthdays, celebrations and best-friend gifts'
  },
  {
    id: 'mirrored-experience',
    name: 'The Mirrored Experience',
    subtitle: 'The art of being spoiled.',
    price: 4500,
    category: 'THE SIGNATURE GIFT',
    image:
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1000&q=85',
    description:
      'Our proposed signature gift experience for someone who deserves something truly memorable.',
    includes: [
      'Signature facial',
      'Relaxation massage',
      'Luxury manicure'
    ],
    perfectFor: 'Anniversaries, milestone birthdays and special occasions'
  }
];

export function MirroredGiftCollection() {
  const [selectedGift, setSelectedGift] = useState(null);

  const enquire = (gift) => {
    const message = [
      'Hello Mirrored!',
      `I'm interested in the ${gift.name} gift experience.`,
      ...(gift.price > 0 ? [`Displayed price: D${gift.price.toLocaleString()}.`] : []),
      'Please confirm the package details and how I can purchase a gift voucher.'
    ].join('\n');

    window.open(
      `https://wa.me/2202289291?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };
  return (
    <section className="mirrored-gifts" id="gift-collection">
      <div className="mg-heading">
        <span className="mg-eyebrow">THE ART OF GIVING</span>
        <h2>
          Give them
          <br />
          <em>something beautiful.</em>
        </h2>
        <p>
          Thoughtful gifts. Beautiful rituals. Unforgettable moments.
          Discover an experience worth giving.
        </p>
      </div>

      <div className="mg-grid">
        {mirroredGifts.map((gift, index) => (
          <article className="mg-card" key={gift.id}>
            <button
              className="mg-image-button"
              onClick={() => setSelectedGift(gift)}
              aria-label={`Explore ${gift.name}`}
            >
              <img src={gift.image} alt={gift.name} loading="lazy" />
              <span className="mg-number">0{index + 1}</span>
              <span className="mg-image-cta">DISCOVER THE GIFT ↗</span>
            </button>

            <div className="mg-card-content">
              <span className="mg-category">{gift.category}</span>
              <h3>{gift.name}</h3>
              <p className="mg-subtitle">{gift.subtitle}</p>

              <div className="mg-card-bottom">
                <span className="mg-price">
                  D{gift.price.toLocaleString()}
                </span>

                <button
                  className="mg-explore"
                  onClick={() => setSelectedGift(gift)}
                >
                  Explore <span>↗</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mg-footer">
        <div>
          <span className="mg-eyebrow">A GIFT, MADE PERSONAL</span>
          <h3>Make their moment unforgettable.</h3>
          <p>
            Have a special occasion in mind? Let's find the right
            experience for someone you love.
          </p>
        </div>

        <button
          className="mg-custom-button"
          onClick={() => enquire({
            name: 'Personalised Gift Experience',
            price: 0
          })}
        >
          CREATE A SPECIAL GIFT ↗
        </button>
      </div>

      {selectedGift && (
        <div
          className="mg-overlay"
          onClick={() => setSelectedGift(null)}
        >
          <div
            className="mg-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedGift.name}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="mg-close"
              onClick={() => setSelectedGift(null)}
              aria-label="Close gift details"
            >
              ×
            </button>

            <div className="mg-modal-image">
              <img src={selectedGift.image} alt={selectedGift.name} />
            </div>

            <div className="mg-modal-content">
              <span className="mg-eyebrow">
                {selectedGift.category}
              </span>

              <h2>{selectedGift.name}</h2>
              <p className="mg-modal-subtitle">
                {selectedGift.subtitle}
              </p>

              <p className="mg-modal-description">
                {selectedGift.description}
              </p>

              <span className="mg-includes-heading">
                INSIDE YOUR EXPERIENCE
              </span>

              <ul className="mg-includes">
                {selectedGift.includes.map((item) => (
                  <li key={item}>
                    <span>✳</span> {item}
                  </li>
                ))}
              </ul>

              <p className="mg-perfect">
                <strong>Perfect for</strong>
                <br />
                {selectedGift.perfectFor}
              </p>

              <div className="mg-modal-bottom">
                <div>
                  <span className="mg-modal-price">
                    D{selectedGift.price.toLocaleString()}
                  </span>
                  <span className="mg-price-note">
                    DISPLAYED PACKAGE PRICE
                  </span>
                </div>

                <button
                  className="mg-custom-button"
                  onClick={() => enquire(selectedGift)}
                >
                  ENQUIRE TO GIFT ↗
                </button>
              </div>

              <p className="mg-disclaimer">
                Package details, price and availability must be
                confirmed by Mirrored before purchase.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

 
const photos = [
  ['Spa sanctuary', gallery1],
  ['A moment of care', gallery2],
  ['Beauty details', gallery3],
  ['The finishing touch', gallery4]
];
const img = (id,w=900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

function App(){
  const [menuOpen,setMenuOpen] = useState(false);
  const [bookingOpen,setBookingOpen] = useState(false);
  const [accountOpen,setAccountOpen] = useState(false);
  const [adminOpen,setAdminOpen] = useState(false);
  const [activeCategory,setActiveCategory] = useState('All');
  const [bookings,setBookings] = useState(()=>JSON.parse(localStorage.getItem('mirroredBookings')||'[]'));
  const [customer,setCustomer] = useState(()=>JSON.parse(localStorage.getItem('mirroredCustomer')||'null'));
  const [toast,setToast] = useState('');
  const [receipt,setReceipt] = useState(null);
  const [booking,setBooking] = useState({service:'Makeup',date:'',time:'10:00',name:'',phone:'',email:'',notes:''});
  const [accountForm,setAccountForm] = useState({name:'',email:''});
  const [adminMode,setAdminMode] = useState(false);
  const [heroTilt,setHeroTilt] = useState({x:0,y:0});
  const moveHero = (e) => { const r=e.currentTarget.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5; setHeroTilt({x:x*8,y:y*-6}); };
  const resetHero = () => setHeroTilt({x:0,y:0});
  useEffect(()=>localStorage.setItem('mirroredBookings',JSON.stringify(bookings)),[bookings]);
  useEffect(()=>localStorage.setItem('mirroredCustomer',JSON.stringify(customer)),[customer]);
  useEffect(()=>{ if(toast){const t=setTimeout(()=>setToast(''),3500);return()=>clearTimeout(t)}},[toast]);
  const filtered = useMemo(()=>activeCategory==='All'?services:services.filter(s=>s.category===activeCategory),[activeCategory]);
  const wa = (text='Hello Mirrored, I would like to make an appointment.') => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  const openBook = (service) => {setBooking(b=>({...b,service:service||b.service}));setBookingOpen(true);setMenuOpen(false);};

const submitBooking = (e) => {
    e.preventDefault();

    if (!booking.date) {
      setToast('Please choose a date for your appointment.');
      return;
    }

    // Mirrored is closed on Mondays.
    const selectedDate = new Date(`${booking.date}T12:00:00`);
    if (selectedDate.getDay() === 1) {
      setToast('We are closed on Mondays. Please choose another date.');
      return;
    }

    const selectedService = services.find((service) => service.name === booking.service);
    const item = {
      ...booking,
      id: Date.now(),
      receiptNo: `MRD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      servicePrice: selectedService?.price ?? null,
      serviceDuration: selectedService?.duration ?? 'To be confirmed',
    };

    // Save locally in this browser. WhatsApp is used to request confirmation.
    setBookings((old) => [item, ...old]);
    setBookingOpen(false);
    setReceipt(item);

    const message = [
      'Hello Mirrored! I would like to request an appointment.',
      '',
      `Receipt reference: ${item.receiptNo}`,
      `Treatment: ${item.service}`,
      `Preferred date: ${item.date}`,
      `Preferred time: ${item.time}`,
      `Name: ${item.name}`,
      `Phone: ${item.phone}`,
      ...(item.email ? [`Email: ${item.email}`] : []),
      ...(item.notes ? [`Notes: ${item.notes}`] : []),
      '',
      'Please confirm availability and the final price.',
      'This is an appointment request, not a payment receipt.',
    ].join('\n');

    setToast('Appointment request created. Please send your WhatsApp message.');
    window.open(wa(message), '_blank', 'noopener,noreferrer');
  };
  const saveAccount = (e)=>{e.preventDefault();setCustomer(accountForm);setAccountOpen(false);setToast('Demo customer profile saved on this device.');};
  const scrollTo = (id)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenuOpen(false);};
  const changeStatus = (id,status)=>setBookings(old=>old.map(b=>b.id===id?{...b,status}:b));
  const removeBooking = (id)=>setBookings(old=>old.filter(b=>b.id!==id));

  return <div className="site-shell">
    <div className="topline"><span>THE GAMBIA · BRUSUBI</span><span className="topline-mid">THE ART OF FEELING LIKE YOURSELF</span><a href={wa('Hello Mirrored, I have an enquiry.')} target="_blank" rel="noreferrer">WHATSAPP US <ArrowRight size={12}/></a></div>
    <header className="header">
      <button className="mobile-menu icon-btn" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen?<X/>:<Menu/>}</button>
      <a href="#home" className="brand" onClick={()=>scrollTo('home')} style={{display:'flex',alignItems:'center',flexShrink:0}}><img src={logo} alt="Mirrored Salon" style={{display:'block',width:'150px',height:'60px',objectFit:'contain',objectPosition:'left center'}} /></a>
      <nav className={menuOpen?'nav nav-open':'nav'}>
        <button onClick={()=>scrollTo('services')}>Treatments</button><button onClick={()=>scrollTo('experience')}>Our story</button><button onClick={()=>scrollTo('gallery')}>The space</button><button onClick={()=>scrollTo('gift-collection')}>Gift Collection</button><button onClick={()=>scrollTo('visit')}>Find us</button>
        <button className="mobile-book" onClick={()=>openBook()}>BOOK AN APPOINTMENT <ArrowRight size={14}/></button>
      </nav>
      <div className="header-actions"><button className="account-link" onClick={()=>setAccountOpen(true)} aria-label="Customer account"><UserRound size={17}/></button><button className="button button-dark header-book" onClick={()=>openBook()}>BOOK A VISIT <ArrowRight size={14}/></button></div>
    </header>

    <main>
      <section className="hero" id="home" onMouseMove={moveHero} onMouseLeave={resetHero}>
        <div className="hero-image" style={{backgroundImage:`linear-gradient(90deg,rgba(8,8,8,.84) 0%,rgba(8,8,8,.52) 48%,rgba(8,8,8,.18) 100%),url(${img('photo-1600334129128-685c5582fd35',1800)})`,transform:`scale(1.08) translate3d(${heroTilt.x*-0.45}px,${heroTilt.y*-0.45}px,0)`}}/>
        <div className="hero-vignette"/>
        <div className="gold-orb orb-one" style={{transform:`translate3d(${heroTilt.x*1.5}px,${heroTilt.y*1.5}px,0)`}}/>
        <div className="gold-orb orb-two" style={{transform:`translate3d(${heroTilt.x*-1.2}px,${heroTilt.y*-1.2}px,0)`}}/>
        <div className="hero-ring ring-one" style={{transform:`translate3d(${heroTilt.x}px,${heroTilt.y}px,0) rotateX(66deg) rotateZ(-20deg)`}}/>
        <div className="hero-ring ring-two" style={{transform:`translate3d(${heroTilt.x*-0.7}px,${heroTilt.y*-0.7}px,0) rotateX(66deg) rotateZ(32deg)`}}/>
        <div className="hero-glint glint-one"/>
        <div className="hero-glint glint-two"/>
        <div className="hero-content">
          <div className="eyebrow light"><span className="eyebrow-line"/>THE ART OF BEAUTY, REIMAGINED</div>
          <h1>More than beauty.<br/><em>It’s a lifestyle.</em></h1>
          <p className="hero-copy">Discover a world of premium beauty, aesthetics, spa and wellness — thoughtfully designed to help you look good, feel better, and live your best life.</p>
          <div className="hero-buttons"><button className="button button-gold" onClick={()=>openBook()}>BOOK YOUR EXPERIENCE <ArrowRight size={15}/></button><button className="text-link light-link" onClick={()=>scrollTo('services')}>EXPLORE TREATMENTS <ArrowDownRight size={16}/></button></div>
          <div className="hero-foot"><span><Sparkles size={15}/> BEAUTY · AESTHETICS · WELLNESS</span><span>BRUSUBI, THE GAMBIA</span></div>
        </div>
        <div className="hero-side-note">A SPACE TO REFLECT. A MOMENT TO RESET.</div><button className="scroll-cue" onClick={()=>scrollTo('services')}><span>SCROLL TO DISCOVER</span><i/></button>
      </section>

      <section className="intro section-pad" id="experience">
        <div className="intro-label"><span className="eyebrow"><span className="eyebrow-line"/>WELCOME TO MIRRORED</span><span className="section-index">01 / THE EXPERIENCE</span></div>
        <div className="intro-grid"><h2>More than a treatment.<br/><em>A feeling.</em></h2><div className="intro-text"><p>We believe self-care should feel personal, considered and beautifully uncomplicated. From your first hello to the final touch, every detail is an invitation to slow down and reconnect with yourself.</p><p>Discover beauty and wellness under one roof, delivered with care and a commitment to helping you feel your best.</p><button className="text-link" onClick={()=>scrollTo('visit')}>COME FIND YOUR SPACE <ArrowRight size={15}/></button></div></div>
        <div className="values"><div><span className="value-num">01</span><h3>Thoughtful care</h3><p>Every experience begins with you and what you need.</p></div><div><span className="value-num">02</span><h3>Beauty, your way</h3><p>Services designed to complement your individuality.</p></div><div><span className="value-num">03</span><h3>Room to reset</h3><p>A welcoming space to pause, recharge and feel renewed.</p></div></div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="section-heading"><div><span className="eyebrow"><span className="eyebrow-line"/>THE TREATMENT MENU</span><h2>Your time.<br/><em>Your ritual.</em></h2></div><p>From a little refresh to a full reset, explore experiences created to help you feel beautifully looked after.</p></div>
        <div className="filters">{['All','Aesthetics','Spa & Wellness','Nails','Hair'].map(c=><button key={c} className={activeCategory===c?'filter active':'filter'} onClick={()=>setActiveCategory(c)}>{c}</button>)}</div>
        <div className="service-grid">{filtered.map((s,i)=><article className="service-card" key={s.name}><div className="service-photo"><img src={s.image} alt={s.name} loading="lazy"/><span className="service-number">0{i+1}</span><button className="round-arrow" onClick={()=>openBook(s.name)} aria-label={`Book ${s.name}`}><ArrowRight size={17}/></button></div><div className="service-meta"><span>{s.category}</span><span><Clock3 size={13}/>{s.duration}</span></div><div className="service-title-row"><h3>{s.name}</h3><span className="price">From D{s.price.toLocaleString()}</span></div><p>{s.desc}</p><button className="text-link" onClick={()=>openBook(s.name)}>ENQUIRE & BOOK <ArrowRight size={14}/></button></article>)}</div>
        <p className="price-note">Prices shown are illustrative starting prices for this website concept. Please confirm Mirrored's current treatment menu and pricing before publishing.</p>
      </section>

      <section className="statement"><div className="statement-bg" style={{backgroundImage:`linear-gradient(rgba(15,15,15,.55),rgba(15,15,15,.7)),url(${img('photo-1515377905703-c4788e51af15',1600)})`}}/><div className="statement-content"><span className="eyebrow light"><span className="eyebrow-line"/>YOUR MOMENT, REIMAGINED</span><h2>Make room for<br/><em>yourself.</em></h2><p>Come as you are. Leave feeling a little more like you.</p><button className="button button-gold" onClick={()=>openBook()}>RESERVE YOUR MOMENT <ArrowRight size={15}/></button></div><span className="statement-mark">M.</span></section>

      
<MirroredGiftCollection />

      <section className="gallery-section section-pad" id="gallery"><div className="gallery-heading"><div><span className="eyebrow"><span className="eyebrow-line"/>A GLIMPSE INSIDE</span><h2>The beauty is<br/><em>in the details.</em></h2></div><a className="text-link" href="https://www.instagram.com/mirrored.gm/" target="_blank" rel="noreferrer"><Instagram size={15}/> FOLLOW OUR JOURNEY <ArrowRight size={14}/></a></div><div className="gallery-grid">{photos.map((p,i)=><a className={`gallery-item gallery-${i+1}`} href="https://www.instagram.com/mirrored.gm/" target="_blank" rel="noreferrer" key={p[0]}><img src={p[1]} alt={p[0]} loading="lazy"/><span>{p[0]} <ArrowUpRightFallback/></span></a>)}</div><p className="gallery-note">Gallery imagery is illustrative. Replace with approved photographs from Mirrored's actual premises and treatments.</p></section>

      <section className="testimonial"><span className="eyebrow light"><span className="eyebrow-line"/>THE MIRRORED FEELING</span><div className="quote-stars">{[1,2,3,4,5].map(n=><Star key={n} size={14} fill="currentColor"/>)}</div><blockquote>“Your time here should feel like a little reminder that you deserve care, too.”</blockquote><p>THE MIRRORED PHILOSOPHY</p><span className="testimonial-disclaimer">Brand statement — not a customer testimonial.</span></section>

      <section className="visit section-pad" id="visit"><div className="visit-left"><span className="eyebrow"><span className="eyebrow-line"/>YOUR NEXT MOMENT STARTS HERE</span><h2>We’ll save<br/><em>a space for you.</em></h2><p>Whether you know exactly what you want or would love a little guidance, our team is ready to help you find the right experience.</p><button className="button button-dark" onClick={()=>openBook()}>REQUEST AN APPOINTMENT <ArrowRight size={15}/></button></div><div className="visit-card"><div className="visit-card-head"><img src={logo} alt="Mirrored Salon logo" style={{width:130,height:48,objectFit:'contain',objectPosition:'left center'}}/><span className="visit-open"><span/> CONTACT & LOCATION</span></div><div className="contact-row"><MapPin/><div><span>VISIT US</span><p>Brusubi, near the Turn Table<br/>The Gambia</p></div></div><div className="contact-row"><Phone/><div><span>CALL OR WHATSAPP</span><p>+220 228 9291</p><a href={wa()} target="_blank" rel="noreferrer">Start a conversation <ArrowRight size={13}/></a></div></div><div className="contact-row"><Clock3/><div><span>OPENING HOURS</span><p>Please contact the team to confirm today's hours.</p></div></div><a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Mirrored+Brusubi+The+Gambia" target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowRight size={15}/></a></div></section>
    </main>

    <footer className="footer"><div className="footer-main"><div><a href="#home" className="brand footer-brand"><img src={logo} alt="Mirrored Salon logo" style={{width:180,height:70,objectFit:'contain',objectPosition:'left center'}}/><span className="brand-sub">THE HOUSE OF AESTHETICS & WELLNESS</span></a><p>A space to reflect. A moment to reset.</p></div><div className="footer-links"><span>EXPLORE</span><button onClick={()=>scrollTo('services')}>Treatments</button><button onClick={()=>scrollTo('gift-collection')}>Packages & gifts</button><button onClick={()=>scrollTo('gallery')}>The space</button></div><div className="footer-links"><span>CONNECT</span><a href="https://www.instagram.com/mirrored.gm/" target="_blank" rel="noreferrer">Instagram <ArrowUpRightFallback/></a><a href={wa()} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRightFallback/></a><a href="https://mirroredgm.com/" target="_blank" rel="noreferrer">Current website <ArrowUpRightFallback/></a></div><div className="footer-admin"><button onClick={()=>setAdminOpen(true)}><LayoutDashboard size={15}/> Admin demo</button><button onClick={()=>setAccountOpen(true)}><UserRound size={15}/> Customer account</button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MIRRORED. ALL RIGHTS RESERVED.</span><span>BEAUTY · AESTHETICS · WELLNESS</span><button onClick={()=>scrollTo('home')}>BACK TO TOP ↑</button></div></footer>

    {receipt && <div className="receipt-backdrop"><section className="receipt-paper receipt-print-area" role="dialog" aria-modal="true" aria-label="Appointment request receipt">
      <div className="receipt-top"><img src={logo} alt="Mirrored Salon logo" className="receipt-logo"/><p className="receipt-tagline">BEAUTY · STYLE · SELF-CARE</p><h2>APPOINTMENT REQUEST RECEIPT</h2><span className="receipt-status">PENDING CONFIRMATION</span></div>
      <div className="receipt-reference"><span>Receipt reference</span><strong>{receipt.receiptNo}</strong></div>
      <div className="receipt-section"><h3>Customer Details</h3><div className="receipt-line"><span>Full name</span><strong>{receipt.name}</strong></div><div className="receipt-line"><span>Phone</span><strong>{receipt.phone}</strong></div>{receipt.email && <div className="receipt-line"><span>Email</span><strong>{receipt.email}</strong></div>}</div>
      <div className="receipt-section"><h3>Appointment Details</h3><div className="receipt-line"><span>Service</span><strong>{receipt.service}</strong></div><div className="receipt-line"><span>Preferred date</span><strong>{receipt.date}</strong></div><div className="receipt-line"><span>Preferred time</span><strong>{receipt.time}</strong></div><div className="receipt-line"><span>Duration</span><strong>{receipt.serviceDuration}</strong></div><div className="receipt-line receipt-total"><span>Estimated service price</span><strong>{receipt.servicePrice != null ? `D${receipt.servicePrice.toLocaleString()}` : 'To be confirmed'}</strong></div></div>
      {receipt.notes && <div className="receipt-section"><h3>Additional Notes</h3><p className="receipt-notes">{receipt.notes}</p></div>}
      <div className="receipt-notice"><strong>Please note:</strong> This receipt confirms that your appointment request was created. It is not a confirmed booking or proof of payment. Mirrored will confirm availability and the final price with you.</div>
      <div className="receipt-footer"><p>Thank you for choosing Mirrored.</p><small>Generated {new Date(receipt.createdAt).toLocaleString()}</small></div>
      <div className="receipt-actions"><button type="button" className="receipt-print-btn" onClick={() => window.print()}>Print / Save as PDF</button><button type="button" className="receipt-close-btn" onClick={() => setReceipt(null)}>Close Receipt</button></div>
    </section></div>}

    {toast&&<div className="toast"><Check size={16}/>{toast}</div>}
    {bookingOpen&&<div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setBookingOpen(false)}><section className="modal"><button className="modal-close" onClick={()=>setBookingOpen(false)}><X/></button><span className="eyebrow"><span className="eyebrow-line"/>YOUR MIRRORED MOMENT</span><h2>Request an<br/><em>appointment.</em></h2><p className="modal-copy">Send us your preferred time and we'll help confirm availability on WhatsApp.</p><form onSubmit={submitBooking} className="modal-form"><label>Choose a treatment<select required value={booking.service} onChange={e=>setBooking({...booking,service:e.target.value})}>{services.map(s=><option key={s.name}>{s.name}</option>)}{!services.some(s=>s.name===booking.service)&&<option>{booking.service}</option>}</select></label><div className="form-row"><label>Preferred date<input type="date" required min={new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10)} value={booking.date} onChange={e=>{const date=e.target.value;if(date&&new Date(`${date}T12:00:00`).getDay()===1){setToast('We are closed on Mondays. Please choose another date.');setBooking({...booking,date:''});return;}setBooking({...booking,date});}}/></label><label>Preferred time<select value={booking.time} onChange={e=>setBooking({...booking,time:e.target.value})}>{['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'].map(t=><option key={t}>{t}</option>)}</select></label></div><label>Your name<input required value={booking.name} onChange={e=>setBooking({...booking,name:e.target.value})} placeholder="Full name"/></label><div className="form-row"><label>Phone / WhatsApp<input required value={booking.phone} onChange={e=>setBooking({...booking,phone:e.target.value})} placeholder="+220 ..."/></label><label>Email (optional)<input type="email" value={booking.email} onChange={e=>setBooking({...booking,email:e.target.value})} placeholder="you@email.com"/></label></div><label>Anything we should know? <textarea rows="2" value={booking.notes} onChange={e=>setBooking({...booking,notes:e.target.value})} placeholder="Optional notes or preferences"/></label><button className="button button-dark form-submit" type="submit">SAVE REQUEST & CONTINUE TO WHATSAPP <ArrowRight size={15}/></button><small>Demo note: your request is saved in this browser only. WhatsApp is used to request confirmation; no appointment is confirmed automatically.</small></form></section></div>}

    {accountOpen&&<div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setAccountOpen(false)}><section className="modal small-modal"><button className="modal-close" onClick={()=>setAccountOpen(false)}><X/></button><span className="eyebrow"><span className="eyebrow-line"/>YOUR MIRRORED PROFILE</span><h2>A little space<br/><em>for you.</em></h2>{customer?<><div className="profile-card"><div className="profile-avatar">{customer.name?.charAt(0)?.toUpperCase()||'M'}</div><div><h3>{customer.name}</h3><p>{customer.email}</p></div></div><h3 className="subhead">Your requests ({bookings.filter(b=>b.email===customer.email).length})</h3>{bookings.filter(b=>b.email===customer.email).map(b=><div className="mini-booking" key={b.id}><strong>{b.service}</strong><span>{b.date} · {b.time}</span><small>{b.status}</small></div>)}<button className="button button-outline full" onClick={()=>{setCustomer(null);setAccountForm({name:'',email:''})}}><LogOut size={14}/> SIGN OUT OF DEMO PROFILE</button></>:<><p className="modal-copy">Create a simple local demo profile to view your appointment requests on this device.</p><form className="modal-form" onSubmit={saveAccount}><label>Your name<input required value={accountForm.name} onChange={e=>setAccountForm({...accountForm,name:e.target.value})} placeholder="Full name"/></label><label>Email address<input required type="email" value={accountForm.email} onChange={e=>setAccountForm({...accountForm,email:e.target.value})} placeholder="you@email.com"/></label><button className="button button-dark form-submit">CREATE DEMO PROFILE <ArrowRight size={15}/></button><small>This is not secure authentication. Do not use a password or sensitive personal information in this prototype.</small></form></>}</section></div>}

    {adminOpen&&<div className="modal-backdrop admin-backdrop" onMouseDown={e=>e.target===e.currentTarget&&setAdminOpen(false)}><section className="modal admin-modal"><button className="modal-close" onClick={()=>setAdminOpen(false)}><X/></button><span className="eyebrow"><span className="eyebrow-line"/>MIRRORED OPERATIONS</span><h2>Booking <em>overview.</em></h2><p className="modal-copy">Local prototype dashboard. Booking requests made in this browser appear below.</p><div className="admin-stats"><div><span>TOTAL REQUESTS</span><strong>{bookings.length}</strong></div><div><span>PENDING</span><strong>{bookings.filter(b=>b.status==='Pending').length}</strong></div><div><span>CONFIRMED</span><strong>{bookings.filter(b=>b.status==='Confirmed').length}</strong></div></div>{bookings.length===0?<div className="empty-state"><CalendarDays size={30}/><h3>No booking requests yet</h3><p>When someone submits the booking form on this browser, their request will appear here.</p></div>:<div className="booking-list">{bookings.map(b=><article className="booking-row" key={b.id}><div className="booking-row-top"><div><h3>{b.service}</h3><p>{b.name} · {b.phone}</p></div><span className={`status status-${b.status.toLowerCase()}`}>{b.status}</span></div><div className="booking-info"><span><CalendarDays size={14}/>{b.date}</span><span><Clock3 size={14}/>{b.time}</span>{b.email&&<span>{b.email}</span>}</div>{b.notes&&<p className="booking-notes">{b.notes}</p>}<div className="booking-actions"><button onClick={()=>changeStatus(b.id,'Confirmed')}><Check size={13}/> Confirm</button><button onClick={()=>changeStatus(b.id,'Cancelled')}>Cancel</button><button className="delete-btn" onClick={()=>removeBooking(b.id)}><Trash2 size={13}/> Delete</button></div></article>)}</div>}<button className="button button-outline full" onClick={()=>{setAdminOpen(false);openBook()}}><Plus size={14}/> ADD TEST BOOKING</button><p className="security-note"><ShieldCheck size={14}/> Production requirement: protect admin routes with staff authentication, role permissions, server-side validation and a shared database.</p></section></div>}
  </div>
}
function ArrowUpRightFallback(){return <ArrowRight size={13} className="arrow-tilt"/>}
createRoot(document.getElementById('root')).render(<App/>);