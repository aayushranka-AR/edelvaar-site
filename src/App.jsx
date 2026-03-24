import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import miniLogo from './assets/mini-logo.png';
import { motion } from 'framer-motion';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};





// ---------------- HERO ----------------
const GlobalGlow = ({ children }) => {
  // Ambient luxury lighting: no cursor tracking, slow drifting layers
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">

      {/* LAYER 1: soft central wash */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{ x: [0, 20, -10, 0], y: [0, -10, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(193,167,94,0.10), transparent 65%)'
        }}
      />

      {/* LAYER 2: wide ambient fill */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{ x: [0, -30, 15, 0], y: [0, 15, -15, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 60% 60%, rgba(193,167,94,0.06), transparent 75%)'
        }}
      />

      {/* LAYER 3: subtle edge warmth */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{ x: [0, 10, -10, 0], y: [0, 10, -5, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(193,167,94,0.05), transparent 80%)'
        }}
      />

      {/* VIGNETTE: cinematic frame (lighter so glow stays visible) */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.85))]" />

      {/* ✨ SUBTLE CURSOR GLOW (luxury micro-interaction) */}
      {typeof window !== 'undefined' && <CursorGlow />}

      {/* ✨ LUXURY CUSTOM CURSOR */}
      {typeof window !== 'undefined' && <LuxuryCursor />}

      {/* MICRO NOISE (removes flat digital feel) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>")'
        }}
      />

      <div className="relative z-10 md:cursor-none">
        {children}
      </div>
    </div>
  );
};

// ---------------- CURSOR GLOW ----------------
const CursorGlow = () => {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;
    const move = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setPos({ x, y });
    };

    const magnetic = (e) => {
      const targets = document.querySelectorAll('button, a');
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.sqrt(x * x + y * y);

        if (dist < 120) {
          el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        } else {
          el.style.transform = 'translate(0px, 0px)';
        }
      });
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', magnetic);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', magnetic);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(193,167,94,0.06), transparent 60px)`
      }}
    />
  );
};

// ---------------- LUXURY CURSOR ----------------
const LuxuryCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e) => {
      if (e.target.closest('button, a')) setHover(true);
      else setHover(false);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          left: pos.x,
          top: pos.y,
          width: hover ? '8px' : '6px',
          height: hover ? '8px' : '6px',
          background: '#c1a75e',
          transform: 'translate(-50%, -50%)'
        }}
      />

      <div
        className="fixed pointer-events-none z-[9998] rounded-full border"
        style={{
          left: pos.x,
          top: pos.y,
          width: hover ? '40px' : '26px',
          height: hover ? '40px' : '26px',
          borderColor: hover ? 'rgba(193,167,94,0.7)' : 'rgba(193,167,94,0.35)',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
};

// ---------------- HERO ----------------
const Hero = () => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
  };

  return (
  <section
    onMouseMove={handleMove}
    className="relative min-h-screen flex flex-col justify-center items-center text-center bg-transparent text-white px-4 sm:px-6 overflow-hidden"
  >

    {/* cinematic vignette */}
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85))]"></div>

    

    {/* floating logo */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mb-12"
    >
      <div className="absolute inset-0 blur-3xl bg-[#c1a75e]/10 rounded-full scale-150"></div>

      <motion.img
        src={logo}
        style={{ filter: 'grayscale(20%) contrast(110%) brightness(105%)' }}
        alt="Edelvaar logo"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.95, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-32 md:w-40 opacity-90 mix-blend-lighten"
      />
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-4xl sm:text-5xl md:text-7xl font-light mb-6 tracking-wide text-[#c1a75e]"
    >
      Authority, Quietly Built.
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 1 }}
      className="max-w-2xl text-lg text-gray-400 mb-6"
    >
      We shape digital identities for individuals whose presence should match their power.
    </motion.p>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 1 }}
      className="text-sm text-gray-600 mb-10 tracking-wide"
    >
      Not louder. Just undeniable.
    </motion.p>

    <Link
      to="/request?plan=Presence%20Plan"
      state={{ plan: 'Presence Plan', locked: false }}
      className="border border-[#c1a75e] px-8 py-3 text-sm tracking-widest hover:bg-[#c1a75e] hover:text-black transition-all duration-500 ease-out"
    >
      Request Invitation
    </Link>
  </section>
  );
};

// ---------------- ABOUT ----------------
const AboutEdelvaar = () => (
  <section className="bg-transparent text-white py-28 px-8 text-center">
    <h2 className="text-3xl mb-6 font-light tracking-wide text-[#c1a75e]">About Edelvaar</h2>

    <p className="italic text-gray-500 mb-12">Not louder. Just undeniable.</p>

    <div className="max-w-2xl mx-auto space-y-6 text-gray-400 text-lg leading-relaxed">
      <p>
        Edelvaar operates at the intersection of influence and restraint — where reputation is built without noise.
      </p>
      <p>
        We work with individuals whose real-world credibility deserves a digital presence that reflects it.
      </p>
      <p>
        No trends. No volume. No exposure for the sake of attention.
      </p>
      <p className="text-[#c1a75e] pt-4">Only precision. Only positioning. Only presence.</p>
    </div>
  </section>
);

// ---------------- PLANS ----------------
const Plans = () => {
  const [active, setActive] = useState('presence');

  const getCardClass = (key) => {
    const isActive = active === key;
    return `p-10 rounded-2xl border transition-all duration-500 ease-out min-h-[320px] flex flex-col justify-between transform ${
      isActive
        ? 'border-[#c1a75e] bg-transparent backdrop-blur-sm shadow-[0_0_25px_rgba(193,167,94,0.2)] scale-105'
        : 'border-gray-800 bg-transparent backdrop-blur-sm hover:border-[#c1a75e] hover:shadow-[0_0_25px_rgba(193,167,94,0.2)] hover:-translate-y-2'
    }`;
  };

  return (
  <section className="bg-transparent text-white py-28 px-8 text-center">
    <h2 className="text-3xl mb-16 font-light tracking-wide text-[#c1a75e]">Engagements</h2>

    <div
      onMouseLeave={() => setActive('presence')}
      className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto items-stretch"
    >
      {/* PROFILE AUDIT */}
      <div
        onMouseEnter={() => setActive('audit')}
        className={getCardClass('audit')}
      >
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-light">Profile Audit</h3>
            <span className="text-gray-400 block mt-1">€57 / one-time</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">Precision audit to uncover positioning gaps and elevate your LinkedIn authority.</p>
        </div>
        <Link to="/revamp" className="text-[#c1a75e] text-sm tracking-widest hover:underline">Explore</Link>
      </div>

      {/* PRESENCE PLAN */}
      <div
        onMouseEnter={() => setActive('presence')}
        className={getCardClass('presence')}
      >
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-light">Presence Plan</h3>
            <span className="text-gray-300 block mt-1">€247/mo</span>
          </div>
          <p className="text-sm text-gray-400 mb-6">Consistent, high signal content and positioning that builds authority and compounds visibility over time.</p>
        </div>
        <Link to="/presence" className="text-[#c1a75e] text-sm tracking-widest hover:underline">Explore</Link>
      </div>

      {/* PRIVATE */}
      <div
        onMouseEnter={() => setActive('private')}
        className={getCardClass('private')}
      >
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-light">Private Concierge</h3>
            <span className="text-gray-400 block mt-1">€777/mo</span>
          </div>
          <p className="text-sm text-gray-500 mb-6">A discreet, fully-managed personal brand system designed to elevate perception and unlock high-level opportunities.</p>
        </div>
        <Link to="/private" className="text-[#c1a75e] text-sm tracking-widest hover:underline">Explore</Link>
      </div>
    </div>
  </section>
  );
};

// ---------------- CASE STUDIES ----------------
const CaseStudies = () => (
  <section className="bg-transparent text-white py-28 px-8 text-center">
    <h2 className="text-3xl mb-16 font-light tracking-wide text-[#c1a75e]">Selected Work</h2>

    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {[
        {
          title: 'Founder → Industry Voice',
          desc: 'Scaled a founder’s LinkedIn from passive presence to consistent inbound opportunities through strategic positioning and content.',
          metric: '+3 inbound deals/month'
        },
        {
          title: 'Consultant → Authority Figure',
          desc: 'Refined messaging and visibility, resulting in higher-quality clients and premium positioning in niche market.',
          metric: '2x profile views'
        },
        {
          title: 'Academic → Recognised Expert',
          desc: 'Built a quiet but powerful presence that led to speaking invites and partnership opportunities.',
          metric: 'Featured in 3 podcasts'
        }
      ].map((c, i) => (
        <div key={i} className="p-8 rounded-2xl border border-gray-800 bg-transparent backdrop-blur-sm hover:border-[#c1a75e] transition-all">
          <h3 className="mb-4 text-lg font-light">{c.title}</h3>
          <p className="text-gray-500 text-sm mb-3">{c.desc}</p>
          <p className="text-[#c1a75e] text-xs tracking-wide">{c.metric}</p>
        </div>
      ))}
    </div>
  </section>
);

// ---------------- CONTACT ----------------
const Contact = () => (
  <section className="bg-transparent text-white py-28 text-center px-8">
    <h2 className="text-3xl mb-6 font-light tracking-wide text-[#c1a75e]">Private Access</h2>

    <p className="max-w-2xl mx-auto text-gray-500 mb-10">
      Access is limited. Each engagement is selectively accepted.
    </p>

    <Link to="/request?plan=Presence%20Plan" state={{ plan: 'Presence Plan', locked: false }} className="bg-[#c1a75e] text-black px-10 py-3 rounded-full text-sm tracking-widest hover:opacity-90 transition-all">
      Request Invitation
    </Link>
  </section>
);

// ---------------- NAV ----------------
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={miniLogo} alt="logo" className="w-5 opacity-80" />
          <span className="hidden md:block text-[#c1a75e] tracking-widest text-sm">EDELVAAR</span>
        </Link>

        {/* desktop nav */}
        <div className="hidden md:flex gap-10 text-sm tracking-wide absolute left-1/2 transform -translate-x-1/2">
          <Link to="/revamp">Audit</Link>
          <Link to="/presence">Presence</Link>
          <Link to="/private">Private</Link>
        </div>

        {/* mobile button */}
        <button
          className="md:hidden text-[#c1a75e] text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* mobile dropdown */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-t border-gray-800 flex flex-col items-center py-8 space-y-8 md:hidden">
          
          <Link className="text-lg tracking-wide" onClick={() => setOpen(false)} to="/revamp">Audit</Link>
          <Link className="text-lg tracking-wide" onClick={() => setOpen(false)} to="/presence">Presence</Link>
          <Link className="text-lg tracking-wide" onClick={() => setOpen(false)} to="/private">Private</Link>
        </div>
      )}
    </nav>
  );
};

// ---------------- HOME ----------------
const Home = () => (
  <div className="min-h-screen bg-transparent">
    <Navbar />
    <div className="pt-20">
      <Hero />
      <AboutEdelvaar />
      <Plans />
      <CaseStudies />
      <Contact />
    </div>

    <footer className="bg-transparent text-gray-600 text-center py-12 text-xs border-t border-gray-900">
      <img src={miniLogo} alt="logo" className="mx-auto w-8 mb-4 opacity-70" />
      <span className="text-[#c1a75e]">Edelvaar 2026</span><br />
      From Estonia <span style={{display:'inline-flex',verticalAlign:'middle'}}>
        <svg width="14" height="9" viewBox="0 0 18 12" xmlns="http://www.w3.org/2000/svg">
          <rect width="18" height="4" fill="#0072CE"/>
          <rect y="4" width="18" height="4" fill="#000000"/>
          <rect y="8" width="18" height="4" fill="#FFFFFF"/>
        </svg>
      </span> — Crafted with precision and intent.<br />
      Refined. Discreet. Exceptional.
    </footer>
  </div>
);

// ---------------- APPLICATION FORM ----------------
const ApplicationForm = ({ selectedPlan }) => {
  const location = useLocation();
  const { search, state } = location;
  const params = new URLSearchParams(search);
  const queryPlan = params.get('plan');
  const locked = state?.locked || false;

  const initialPlan = selectedPlan || state?.plan || queryPlan || 'Profile Audit';

  const [plan, setPlan] = useState(initialPlan);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const isValid = plan && name && email && role && reason;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!plan || !name || !email || !role || !reason) {
      setError('All fields are required to proceed.');
      return;
    }

    setError('');

    const subject = `Application - ${plan}`;
    const body = `Plan: ${plan}
Name: ${name}
Email: ${email}
Role: ${role}

Why:
${reason}`;

    window.location.href = `mailto:aayushranka@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="bg-transparent text-white px-8 py-28 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl text-[#c1a75e] mb-6">Application Received</h1>
        <p className="text-gray-400">If selected, you’ll hear back within 24–48 hours.</p>
      </section>
    );
  }

  return (
    <section className="bg-transparent text-white px-8 py-28 max-w-3xl mx-auto">
      <div className="flex flex-col items-center mb-10">
        <img src={logo} className="w-20 opacity-80 mb-4 mix-blend-lighten" />
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#c1a75e] to-transparent opacity-60"></div>
      </div>
      <h1 className="text-4xl mb-6 text-[#c1a75e] font-light">Application</h1>
      <p className="text-gray-400 mb-4">Each application is reviewed carefully. We accept a limited number of clients.</p>
      <p className="text-gray-500 text-sm mb-8">We may not be able to accept every application.</p>

      <div className="space-y-6">
        {locked && (
          <p className="text-xs text-gray-600 mb-2">Selected engagement (curated)</p>
        )}
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          disabled={locked}
          className={`w-full bg-transparent backdrop-blur-sm border border-gray-800 p-3 text-sm ${locked ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <option>Profile Audit</option>
          <option>Presence Plan</option>
          <option>Private Concierge</option>
          <option>Other</option>
        </select>

        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full Name" className="w-full bg-transparent backdrop-blur-sm border border-gray-800 p-3 text-sm" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full bg-transparent backdrop-blur-sm border border-gray-800 p-3 text-sm" />
        <input value={role} onChange={(e)=>setRole(e.target.value)} placeholder="Current Role / Position" className="w-full bg-transparent backdrop-blur-sm border border-gray-800 p-3 text-sm" />

        <textarea value={reason} onChange={(e)=>setReason(e.target.value)}
          placeholder={
            plan === 'Profile Audit'
              ? "What’s your current LinkedIn goal?"
              : plan === 'Presence Plan'
              ? "Are you currently creating content?"
              : plan === 'Private Concierge'
              ? "What level of visibility are you aiming for?"
              : "Why do you want to elevate your personal brand?"
          }
          rows={4}
          className="w-full bg-transparent backdrop-blur-sm border border-gray-800 p-3 text-sm"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <p className="text-xs text-gray-600">You’ll hear back within 24–48 hours if selected.</p>

        <button disabled={!isValid} onClick={handleSubmit} className={`border border-[#c1a75e] px-8 py-3 text-sm tracking-widest transition-all ${isValid ? 'hover:bg-[#c1a75e] hover:text-black' : 'opacity-40 cursor-not-allowed'}`}>
          Submit Application
        </button>
      </div>
    </section>
  );
};

// ---------------- ENGAGEMENT DETAIL PAGE ----------------
const EngagementPage = ({ title, description }) => {
  const getDetails = () => {
    switch (title) {
      case 'Profile Audit':
        return {
          deliverables: [
            'Profile revamp (headline, bio, positioning)',
            'Authority positioning strategy',
            'Content direction recommendations'
          ]
        };

      case 'Presence Plan':
        return {
          deliverables: [
            'Management of one platform (LinkedIn or Instagram)',
            '4 bespoke posts per month — written in your authentic tone',
            'Visual identity curation & consistent styling',
            'Monthly visual direction (style, tone, imagery)',
            'Continuous profile & bio refinement',
            '1 monthly outreach to podcast/blog/magazine (organic)',
            'Monthly strategic advice on engagement & positioning',
            'Quarterly analytics snapshot (reach, engagement, audience quality)'
          ]
        };

      case 'Private Concierge':
        return {
          deliverables: [
            'Full management of LinkedIn + Instagram',
            '8 bespoke posts per month (concept, copy, visuals)',
            'Visual identity curation & consistent styling',
            'Monthly visual direction',
            'Continuous profile & bio refinement',
            '2 targeted monthly outreach opportunities',
            'Weekly strategic advisory',
            'Quarterly analytics & performance reporting',
            'Confidential reporting & insights',
            'Full NDA & discretion guarantee',
            'Priority access to Edelvaar network',
            'Crisis communication & reputation support',
          ]
        };

      default:
        return { deliverables: [] };
    }
  };

  const { deliverables } = getDetails();

  return (
    <section className="bg-transparent text-white px-8 py-28 max-w-3xl mx-auto">
      <div className="flex flex-col items-center mb-10">
        <img src={logo} className="w-20 opacity-80 mb-4 mix-blend-lighten" />
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#c1a75e] to-transparent opacity-60"></div>
      </div>

      <h1 className="text-4xl mb-6 text-[#c1a75e] font-light">{title}</h1>

      <p className="text-gray-400 mb-10 leading-relaxed">
        {description}
      </p>

      <div className="mb-12">
        <h3 className="text-[#c1a75e] mb-4 text-sm tracking-widest">DELIVERABLES</h3>
        <div className="grid gap-4">
          {deliverables.map((d, i) => (
            <div
              key={i}
              className="border border-gray-800 rounded-xl p-4 text-sm text-gray-300 backdrop-blur-sm hover:border-[#c1a75e] hover:shadow-[0_0_20px_rgba(193,167,94,0.15)] transition-all duration-300"
            >
              {d}
            </div>
          ))}
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-10">
        This engagement is designed for individuals who value positioning over noise, and authority over attention.
      </p>

      <Link
        to={`/request?plan=${encodeURIComponent(title)}`}
        state={{ plan: title, locked: true }}
        className="border border-[#c1a75e] px-8 py-3 text-sm tracking-widest hover:bg-[#c1a75e] hover:text-black transition-all duration-500"
      >
        Apply Now
      </Link>
    </section>
  );
};


// ---------------- APP ----------------
const App = () => (
  <GlobalGlow>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<div className="min-h-screen w-screen bg-transparent overflow-x-hidden"><Home /></div>} />

        <Route path="/presence" element={<div className="min-h-screen w-screen bg-transparent overflow-x-hidden"><EngagementPage title="Presence Plan" description="A structured system to build consistent authority through high-signal content, positioning, and strategic visibility." /></div>} />

        <Route path="/private" element={<div className="min-h-screen w-screen bg-transparent overflow-x-hidden"><EngagementPage title="Private Concierge" description="A fully managed, discreet personal brand system designed for high-level individuals who require precision, control, and exclusivity." /></div>} />

        <Route path="/revamp" element={<div className="min-h-screen w-screen bg-transparent overflow-x-hidden"><EngagementPage title="Profile Audit" description="A precision audit of your current presence to identify gaps, misalignment, and opportunities for authority positioning." /></div>} />

        <Route path="/request" element={<div className="min-h-screen w-screen bg-transparent overflow-x-hidden"><ApplicationForm /></div>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </GlobalGlow>
);

export default App;
