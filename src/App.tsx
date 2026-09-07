import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  MapPin,
  Phone,
  Smartphone,
  Mail,
  Clock,
  Award,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Globe,
  CheckCircle2,
  ChevronDown,
  Instagram,
  Facebook,
  ExternalLink,
  Info
} from 'lucide-react';
import sempertexLogo from './assets/sempertexlogo.png';

const heroBg = "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1600&q=80";

interface FloatingBalloonProps {
  id: number;
  type: 'gold' | 'purple' | 'pink' | 'sand' | 'rose-gold' | 'teal' | 'pearl';
  size: number;
  left?: string;
  right?: string;
  top: string;
  delay: number;
  parallaxSpeed: number;
  swayDuration: number;
  className?: string;
  key?: React.Key;
}

function getBalloonGradients(type: string, id: number) {
  const gradientId = `bg-grad-${type}-${id}`;
  let stops;
  switch (type) {
    case 'gold':
      stops = (
        <>
          <stop offset="0%" stopColor="#FFF3C3" />
          <stop offset="45%" stopColor="#D4AF37" />
          <stop offset="85%" stopColor="#AA7C11" />
          <stop offset="100%" stopColor="#5E450A" />
        </>
      );
      break;
    case 'purple':
      stops = (
        <>
          <stop offset="0%" stopColor="#F5EDFF" />
          <stop offset="45%" stopColor="#8F37EB" />
          <stop offset="85%" stopColor="#6719C2" />
          <stop offset="100%" stopColor="#3F0D7B" />
        </>
      );
      break;
    case 'pink':
      stops = (
        <>
          <stop offset="0%" stopColor="#FFF1F2" />
          <stop offset="45%" stopColor="#FB7185" />
          <stop offset="85%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#880825" />
        </>
      );
      break;
    case 'sand':
      stops = (
        <>
          <stop offset="0%" stopColor="#FDF8F5" />
          <stop offset="45%" stopColor="#D2B48C" />
          <stop offset="85%" stopColor="#B38B6D" />
          <stop offset="100%" stopColor="#5F422C" />
        </>
      );
      break;
    case 'rose-gold':
      stops = (
        <>
          <stop offset="0%" stopColor="#FFF3F0" />
          <stop offset="45%" stopColor="#CB8E7E" />
          <stop offset="85%" stopColor="#A86252" />
          <stop offset="100%" stopColor="#603126" />
        </>
      );
      break;
    case 'teal':
      stops = (
        <>
          <stop offset="0%" stopColor="#E6FFFA" />
          <stop offset="45%" stopColor="#0D9488" />
          <stop offset="85%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#115E59" />
        </>
      );
      break;
    case 'pearl':
    default:
      stops = (
        <>
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F1F5F9" />
          <stop offset="85%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </>
      );
      break;
  }
  return { gradientId, stops };
}

function BalloonSVG({ type, id }: { type: string; id: number }) {
  const { gradientId, stops } = getBalloonGradients(type, id);
  return (
    <svg viewBox="0 0 100 180" className="w-full h-full drop-shadow-xl overflow-visible">
      <defs>
        <radialGradient id={gradientId} cx="35%" cy="30%" r="65%">
          {stops}
        </radialGradient>
        <radialGradient id={`gloss-${id}`} cx="35%" cy="30%" r="35%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Balloon String */}
      <path 
        d="M50 112 C45 130, 55 145, 48 165 C43 180, 52 195, 50 215" 
        stroke="#94A3B8" 
        strokeWidth="1.2" 
        fill="none" 
        opacity="0.65" 
      />
      
      {/* Balloon knot */}
      <polygon points="45,114 55,114 50,105" fill={`url(#${gradientId})`} />
      
      {/* Balloon main organic egg body */}
      <ellipse cx="50" cy="62" rx="38" ry="48" fill={`url(#${gradientId})`} />
      
      {/* Glossy shine highlight */}
      <ellipse cx="36" cy="42" rx="12" ry="16" fill={`url(#gloss-${id})`} transform="rotate(-15 36 42)" />
    </svg>
  );
}

function FloatingBalloon({
  id,
  type,
  size,
  left,
  right,
  top,
  delay,
  parallaxSpeed,
  swayDuration,
  className = ""
}: FloatingBalloonProps) {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, parallaxSpeed]);

  return (
    <motion.div
      initial={{ y: "110vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 40, 
        damping: 14, 
        delay: delay 
      }}
      className={className}
      style={{
        position: 'absolute',
        left,
        right,
        top,
        width: `${size}px`,
        height: `${size * 1.8}px`,
        zIndex: 5,
        pointerEvents: 'none'
      }}
    >
      <motion.div style={{ y: yParallax, width: '100%', height: '100%' }}>
        <motion.div
          animate={{
            x: [-8, 8, -8],
            rotate: [-5, 5, -5]
          }}
          transition={{
            repeat: Infinity,
            duration: swayDuration,
            ease: "easeInOut"
          }}
          className="w-full h-full"
        >
          <BalloonSVG type={type} id={id} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}


export default function App() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Bento gallery images showing Sempertex decorations and installations formatted for masonry layout
  const bentoImages = [
    {
      id: 1,
      title: "Reflex™ Chrome Luxury",
      subtitle: "Mirrored High-Shine Series",
      category: "Reflex Chrome",
      src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-[380px]",
    },
    {
      id: 2,
      title: "Macaron Pastel Dreams",
      subtitle: "Soft Matte Party Aesthetics",
      category: "Pastel Matte",
      src: "https://images.unsplash.com/photo-1478812954026-9c750f0e89fc?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-[220px]",
    },
    {
      id: 3,
      title: "Organic Installation Craft",
      subtitle: "Bespoke Arch Styling",
      category: "Fashion Solids",
      src: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-[320px]",
    },
    {
      id: 4,
      title: "Golden Reflex Radiance",
      subtitle: "VIP Metallic Accents",
      category: "Luxury Metallic",
      src: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-[280px]",
    },
    {
      id: 5,
      title: "Fashion Matte & Sand Tones",
      subtitle: "Elegant Chalky Textures",
      category: "Dune Sand",
      src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-[180px]",
    },
    {
      id: 6,
      title: "Celestial Celebration",
      subtitle: "Pastel Warm Tones",
      category: "Celebration",
      src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80",
      heightClass: "h-[420px]",
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans relative text-[#1A1A1A]">
      
      {/* STICKY HEADER */}
      <header className="bg-[#FAF9F6]/90 backdrop-blur-md sticky top-0 border-b border-gray-200/60 z-40 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 min-h-20 sm:min-h-24 flex items-center justify-between">
          
          {/* Logo, Brand & Slogan */}
          <div className="flex flex-col items-start gap-1 justify-center">
            <div className="flex items-center gap-2">
              <img 
                src={sempertexLogo} 
                alt="Sempertex Logo" 
                className="h-8 sm:h-10 w-auto object-contain" 
              />
              <span className="bg-[#4F2683] text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">AE</span>
            </div>
            <span className="text-[8px] sm:text-[9px] text-gray-500 block font-black uppercase tracking-[0.2em] leading-none">
              ALQADAH AUTHORIZED DISTRIBUTOR
            </span>
          </div>

          {/* Quick Informational Action Button */}
          <button
            onClick={() => scrollToSection(contactSectionRef)}
            className="px-5 py-2.5 bg-[#4F2683] hover:bg-[#3D1D66] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-widest transition-all rounded-none shadow-md shadow-[#4F2683]/10 flex items-center gap-2"
            id="btn-header-contact"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact Distributor</span>
          </button>
        </div>
      </header>

      {/* HERO HERO SECTION */}
      <section className="relative overflow-hidden bg-[#FAF9F6] text-[#1A1A1A] flex items-center justify-center min-h-[500px] md:min-h-[600px] py-20 px-4">
        {/* Real-world luxury balloon decoration background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Sempertex Premium Balloon Architecture" 
            className="w-full h-full object-cover brightness-[0.95] opacity-25 scale-105 transition-transform duration-[10000ms] ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-[#FAF9F6]/80 pointer-events-none" />
        </div>

        {/* Ambient radial lighting overlays */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#4F2683] rounded-full blur-[120px] opacity-10 pointer-events-none z-0" />
        <div className="absolute right-10 bottom-10 w-80 h-80 bg-[#4F2683]/5 rounded-full blur-[120px] opacity-10 pointer-events-none z-0" />

        {/* Interactive Floating Balloons (Fly-in on load, sway naturally, scroll parallax) */}
        {[
          { id: 1, type: 'gold' as const, size: 85, left: '5%', top: '10%', delay: 0.1, parallaxSpeed: -140, swayDuration: 6.2, className: 'hidden md:block' },
          { id: 2, type: 'purple' as const, size: 75, left: '16%', top: '35%', delay: 0.4, parallaxSpeed: -210, swayDuration: 5.4, className: 'hidden lg:block' },
          { id: 3, type: 'rose-gold' as const, size: 100, left: '2%', top: '55%', delay: 0.2, parallaxSpeed: -80, swayDuration: 7.1, className: 'block' },
          { id: 4, type: 'sand' as const, size: 70, left: '12%', top: '68%', delay: 0.6, parallaxSpeed: -260, swayDuration: 4.8, className: 'hidden md:block' },
          { id: 5, type: 'purple' as const, size: 90, right: '5%', top: '12%', delay: 0.3, parallaxSpeed: -160, swayDuration: 6.5, className: 'hidden md:block' },
          { id: 6, type: 'gold' as const, size: 80, right: '15%', top: '38%', delay: 0.5, parallaxSpeed: -230, swayDuration: 5.1, className: 'hidden lg:block' },
          { id: 7, type: 'pearl' as const, size: 105, right: '2%', top: '58%', delay: 0.25, parallaxSpeed: -100, swayDuration: 6.8, className: 'block' },
          { id: 8, type: 'teal' as const, size: 75, right: '13%', top: '70%', delay: 0.7, parallaxSpeed: -270, swayDuration: 4.5, className: 'hidden md:block' },
        ].map((balloon: any) => (
          <FloatingBalloon
            key={balloon.id}
            id={balloon.id}
            type={balloon.type}
            size={balloon.size}
            left={balloon.left}
            right={balloon.right}
            top={balloon.top}
            delay={balloon.delay}
            parallaxSpeed={balloon.parallaxSpeed}
            swayDuration={balloon.swayDuration}
            className={balloon.className}
          />
        ))}

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#4F2683]/10 border border-[#4F2683]/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-[#4F2683] font-display"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4F2683]" /> Premier Latex • UAE Official Channel
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] font-display text-[#1A1A1A]">
              <span className="text-[#4F2683] italic font-semibold">SEMPERTEX</span> UAE <br />
              <span className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-[0.25em] text-[#1A1A1A] block mt-4 font-sans">
                ALQADAH TRADING
              </span>
            </h1>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium font-aerial">
              Bringing premium 100% biodegradable natural latex balloons to GCC wedding designers, event agencies, and master balloon artists since 1989.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection(aboutSectionRef)}
              className="bg-[#4F2683] hover:bg-[#3D1D66] text-white font-bold uppercase tracking-widest text-xs px-8 py-4 transition-all flex items-center gap-2 rounded-none shadow-lg shadow-[#4F2683]/30 border border-transparent"
              id="btn-hero-explore"
            >
              Learn About Us <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection(gallerySectionRef)}
              className="bg-transparent border-2 border-[#1A1A1A]/40 hover:border-[#1A1A1A] hover:bg-[#1A1A1A]/5 text-[#1A1A1A] font-bold uppercase tracking-widest text-xs px-8 py-4 transition-all rounded-none"
              id="btn-hero-gallery"
            >
              View Image
            </button>
          </motion.div>

          {/* Floating animated scroll down cue */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="pt-12 cursor-pointer inline-block"
            onClick={() => scrollToSection(aboutSectionRef)}
          >
            <ChevronDown className="w-6 h-6 text-gray-500 hover:text-[#4F2683] transition-colors mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section 
        ref={aboutSectionRef}
        className="py-24 bg-[#FAF7FF] border-b border-gray-200/60 relative overflow-hidden"
        id="about-us-section"
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#4F2683]/5 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute left-[-10%] bottom-0 w-80 h-80 bg-[#FEF08A]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-1.5 text-[#4F2683] text-xs font-black uppercase tracking-[0.2em] font-display">
                  <span className="w-6 h-0.5 bg-[#4F2683]" /> ESTABLISHED 1989 DUBAI
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A] font-display leading-tight">
                  About Us
                </h2>
              </motion.div>

              {/* Precise Requested Paragraph with animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 text-[#1A1A1A] text-sm sm:text-base leading-relaxed font-medium"
              >
                <p className="bg-white p-6 sm:p-8 border-l-4 border-[#4F2683] shadow-md shadow-gray-100 rounded-r-2xl leading-loose text-gray-700 font-aerial">
                  Alqadah is an authorized Sempertex balloon distributor in the United Arab Emirates since 1989. We provide high-quality balloons in a variety of shapes, sizes, and colors for all types of occasions. We believe in offering our customers the best possible value for their money and guarantee quality products with a 100% satisfaction guarantee. We are committed to providing our customers with a wide range of balloons for any occasion, from birthday parties to corporate events. We invite you to explore our selection of balloons and find the perfect one for your event.
                </p>
              </motion.div>
            </div>

            {/* Right Decorative Feature Column */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {/* Badge 1 */}
                <div className="bg-[#F2F2F2] p-6 rounded-2xl border-2 border-transparent hover:border-[#4F2683] transition-all group shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4F2683] border-2 border-[#1A1A1A] shadow-xs mb-4 group-hover:bg-[#4F2683] group-hover:text-white transition-colors">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-black uppercase tracking-wider text-xs text-[#1A1A1A] mb-1.5">Authorized Partner</h4>
                  <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wide">Since 1989</p>
                  <p className="text-[11px] text-gray-600 mt-2 font-medium leading-normal font-aerial">
                    More than 35 years representing Sempertex in the United Arab Emirates.
                  </p>
                </div>

                {/* Badge 2 */}
                <div className="bg-[#F2F2F2] p-6 rounded-2xl border-2 border-transparent hover:border-[#4F2683] transition-all group shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4F2683] border-2 border-[#1A1A1A] shadow-xs mb-4 group-hover:bg-[#4F2683] group-hover:text-white transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-black uppercase tracking-wider text-xs text-[#1A1A1A] mb-1.5">100% Quality</h4>
                  <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wide">Guaranteed Satisfaction</p>
                  <p className="text-[11px] text-gray-600 mt-2 font-medium leading-normal font-aerial">
                    Unrivaled gas retention, elastic strength, and long typing necks.
                  </p>
                </div>

                {/* Badge 3 */}
                <div className="bg-[#F2F2F2] p-6 rounded-2xl border-2 border-transparent hover:border-[#4F2683] transition-all group shadow-xs sm:col-span-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#FEF08A] border-2 border-[#1A1A1A] shrink-0">
                      <Sparkles className="w-6 h-6 text-[#4F2683]" />
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-wider text-xs text-[#1A1A1A] mb-1">Incredible Variety</h4>
                      <p className="text-[11px] text-gray-600 font-semibold leading-relaxed font-aerial">
                        Endless configurations of sizes (5&quot;, 9&quot;, 12&quot;, 18&quot;, 24&quot;, 36&quot;) and collections like Reflex™ and Pastel Matte.
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* IMAGE BENTO GRID SECTION */}
      <section 
        ref={gallerySectionRef}
        className="py-24 bg-[#EBF1F5] border-b border-gray-200/60"
        id="gallery-bento-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <span className="text-[10px] font-black text-white bg-[#4F2683] px-3 py-1.5 uppercase tracking-[0.2em] rounded-none inline-block leading-none font-display">
              Inspirational Gallery
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1A1A] font-display">
              Sempertex Showpieces
            </h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest font-aerial">
              Live installations & decor setups featured on Sempertex.ae
            </p>
          </motion.div>

          {/* Masonry Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              {[bentoImages[0], bentoImages[1]].map((img, idx) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className={`relative group overflow-hidden rounded-3xl border-2 border-[#1A1A1A] shadow-lg ${img.heightClass}`}
                >
                  <img 
                    src={img.src} 
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />
                  <span className="absolute top-4 left-4 bg-[#BA99FF] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 leading-none rounded-none font-aerial">
                    {img.category}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                    <span className="text-[9px] font-semibold tracking-widest text-[#BA99FF] uppercase block font-aerial">
                      {img.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-none font-sans">
                      {img.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              {[bentoImages[2], bentoImages[3]].map((img, idx) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (idx + 2) * 0.1 }}
                  className={`relative group overflow-hidden rounded-3xl border-2 border-[#1A1A1A] shadow-lg ${img.heightClass}`}
                >
                  <img 
                    src={img.src} 
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />
                  <span className="absolute top-4 left-4 bg-[#BA99FF] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 leading-none rounded-none font-aerial">
                    {img.category}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                    <span className="text-[9px] font-semibold tracking-widest text-[#BA99FF] uppercase block font-aerial">
                      {img.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-none font-sans">
                      {img.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6">
              {[bentoImages[4], bentoImages[5]].map((img, idx) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (idx + 4) * 0.1 }}
                  className={`relative group overflow-hidden rounded-3xl border-2 border-[#1A1A1A] shadow-lg ${img.heightClass}`}
                >
                  <img 
                    src={img.src} 
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />
                  <span className="absolute top-4 left-4 bg-[#BA99FF] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 leading-none rounded-none font-aerial">
                    {img.category}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                    <span className="text-[9px] font-semibold tracking-widest text-[#BA99FF] uppercase block font-aerial">
                      {img.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-none font-sans">
                      {img.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE SEMPERTEX ACCORDION/BENEFITS */}
      <section className="py-24 bg-[#FAF6EC] border-b border-gray-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 mb-16"
          >
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] font-display">
              Why Professionals Choose Sempertex
            </h3>
            <p className="text-xs text-gray-800 font-extrabold uppercase tracking-widest font-aerial">
              Engineered for balloon decorators and major events
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* Benefit 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 border-2 border-[#1A1A1A] rounded-2xl flex items-start gap-4 shadow-xs hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[#4F2683]/10 text-[#4F2683] flex items-center justify-center shrink-0 border border-[#4F2683]/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black tracking-wide text-base text-[#1A1A1A] font-aerial">100% Biodegradable Pure Natural Latex</h4>
                <p className="text-sm text-gray-700 leading-relaxed font-bold font-aerial">
                  Sempertex balloons are manufactured with premier 100% natural organic rubber harvested from sustainably-managed Hevea brasiliensis plantations. They contain absolutely no fillers, plasticizers, or synthetic rubber compounds.
                </p>
              </div>
            </motion.div>

            {/* Benefit 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 border-2 border-[#1A1A1A] rounded-2xl flex items-start gap-4 shadow-xs hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[#4F2683]/10 text-[#4F2683] flex items-center justify-center shrink-0 border border-[#4F2683]/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black tracking-wide text-base text-[#1A1A1A] font-aerial">Engineered Long Tying Necks</h4>
                <p className="text-sm text-gray-700 leading-relaxed font-bold font-aerial">
                  Highly acclaimed by elite decorators for having flexible, long, and soft necks that make tying quick and painless. Perfect for high-volume jobs, organic garlands, and complex twisting configurations.
                </p>
              </div>
            </motion.div>

            {/* Benefit 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 border-2 border-[#1A1A1A] rounded-2xl flex items-start gap-4 shadow-xs hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[#4F2683]/10 text-[#4F2683] flex items-center justify-center shrink-0 border border-[#4F2683]/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black tracking-wide text-base text-[#1A1A1A] font-aerial">Vibrant Gas Retention & High-Float Compatibility</h4>
                <p className="text-sm text-gray-700 leading-relaxed font-bold font-aerial">
                  Sempertex latex boasts superior molecular density, offering outstanding gas retention properties for helium fills as well as standard air. They are fully compatible with High-Float treatment to prolong exhibition life in air-conditioned environments.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* INFORMATIONAL UAE LOCAL CLIMATE BUFFER TIPS */}
      <section className="py-20 bg-[#FDF2EB] text-[#1A1A1A] relative overflow-hidden border-b border-gray-200/60">
        {/* Glow */}
        <div className="absolute right-[-10%] bottom-[-10%] w-96 h-96 bg-[#4F2683]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-[10px] font-black text-[#4F2683] uppercase tracking-[0.2em] block font-aerial">
                GCC Climate Care Recommendations
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight font-display leading-tight text-[#1A1A1A]">
                Desert Storage & Decoration Protocols
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-medium font-aerial">
                UAE outdoor climates require strict handling protocols to protect natural latex balloons from high heat and dust. We recommend these Sempertex guidelines for GCC locations:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-5 rounded-xl border border-gray-200 hover:border-[#4F2683] shadow-xs hover:shadow-md transition-all">
                  <div className="font-bold text-[#4F2683] uppercase tracking-wider mb-1 font-aerial">
                    Heat Expansion Buffer
                  </div>
                  <p className="text-gray-600 font-medium font-aerial">
                    Always inflate outdoor balloons to 85% to 90% of their maximum capacity to provide a expansion volume buffer when temperatures rise.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-200 hover:border-[#4F2683] shadow-xs hover:shadow-md transition-all">
                  <div className="font-bold text-[#4F2683] uppercase tracking-wider mb-1 font-aerial">
                    Ideal Storage Temp
                  </div>
                  <p className="text-gray-600 font-medium font-aerial">
                    Store uninflated packages in cool, dark rooms between 18°C and 23°C. Keep completely sealed until immediate deployment.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-5 bg-white border-2 border-[#1A1A1A] p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <h4 className="font-black uppercase tracking-wider text-[#4F2683] text-sm mb-4 font-aerial">Official UAE Guidelines</h4>
              <div className="space-y-4 text-xs leading-relaxed font-medium text-gray-700 font-aerial">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#4F2683] text-white flex items-center justify-center font-black text-[10px] shrink-0 font-sans">1</span>
                  <p>In hot desert conditions, prioritize Matte/Fashion or Reflex series balloons over crystal colors, as they are significantly more resistant to direct solar oxidation.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#4F2683] text-white flex items-center justify-center font-black text-[10px] shrink-0 font-sans">2</span>
                  <p>Pre-stretch double-stuffed layers using a dual-action manual pump before attaching onto frame mounts to prevent stress micro-tears.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#4F2683] text-white flex items-center justify-center font-black text-[10px] shrink-0 font-sans">3</span>
                  <p>Apply specialized high-float sealant strictly as directed for helium-filled configurations to achieve stable multi-day floatation performance.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FOOTER & CONTACT SECTION WITH MAP PIN */}
      <footer 
        ref={contactSectionRef}
        className="bg-[#F4F3EF] text-gray-700 pt-20 pb-12 border-t-4 border-[#4F2683] font-aerial"
        id="footer-contact"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Main Footer Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Info Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={sempertexLogo} 
                    alt="Sempertex Logo" 
                    className="h-8 w-auto object-contain" 
                  />
                  <span className="bg-[#4F2683] text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">AE</span>
                  <div className="h-4 w-px bg-gray-300 mx-1"></div>
                  <span className="text-[10px] text-[#4F2683] uppercase tracking-widest font-bold font-sans">Alqadah Distributor</span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed font-medium">
                  Alqadah is the sole authorized distributor for premier Sempertex natural rubber latex balloons in Dubai and the wider UAE region since 1989.
                </p>
              </div>
 
              {/* UAE Contact Details */}
              <div className="space-y-4 text-xs font-medium">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4.5 h-4.5 text-[#4F2683] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#1A1A1A] font-bold uppercase tracking-wider block mb-1 font-sans">Location</span>
                    <p className="text-[#1A1A1A] font-bold leading-normal">Al Qadah Trading LLC.</p>
                    <p className="text-gray-600 leading-relaxed mt-0.5">
                      Opposite-Al khail Mall<br />
                      Behind Green Gift centre<br />
                      Street No:24A.<br />
                      Latifa binth hamdan street.
                    </p>
                    <p className="text-gray-500 font-bold uppercase mt-1">Post Box-13561-Alquoz-Dubai</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Smartphone className="w-4.5 h-4.5 text-[#4F2683] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#1A1A1A] font-bold uppercase tracking-wider block font-sans">Mobile</span>
                    <a href="tel:+971505189925" className="text-gray-700 hover:text-[#4F2683] font-semibold transition-colors">
                      +971-505189925
                    </a>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <Phone className="w-4.5 h-4.5 text-[#4F2683] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#1A1A1A] font-bold uppercase tracking-wider block font-sans">Tel</span>
                    <a href="tel:+97143386877" className="text-gray-700 hover:text-[#4F2683] font-semibold transition-colors">
                      +971-43386877
                    </a>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <Mail className="w-4.5 h-4.5 text-[#4F2683] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#1A1A1A] font-bold uppercase tracking-wider block font-sans">Email Inquiries</span>
                    <div className="flex flex-col gap-1 mt-0.5">
                      <a href="mailto:sempertex@qadah.ae" className="text-gray-700 hover:text-[#4F2683] font-medium transition-colors">
                        sempertex@qadah.ae
                      </a>
                      <a href="mailto:sales@qadah.ae" className="text-gray-700 hover:text-[#4F2683] font-medium transition-colors">
                        sales@qadah.ae
                      </a>
                    </div>
                  </div>
                </div>
 
                <div className="flex items-start gap-3">
                  <Clock className="w-4.5 h-4.5 text-[#4F2683] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#1A1A1A] font-bold uppercase tracking-wider block mb-1 font-sans">Business Showroom Hours</span>
                    <p className="text-gray-600 leading-normal">
                      Monday – Saturday: 9:00 AM – 9:00 PM <br />
                      Sunday: Closed (Weekend Holiday)
                    </p>
                  </div>
                </div>
              </div>
 
              {/* Social links */}
              <div className="pt-4 flex gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-[#4F2683] hover:text-white flex items-center justify-center transition-all shadow-xs"
                  title="Follow us on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-[#4F2683] hover:text-white flex items-center justify-center transition-all shadow-xs"
                  title="Follow us on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
 
            {/* Right Map Pin Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 space-y-4"
            >
              <div className="flex justify-between items-center text-[#1A1A1A] border-b border-gray-200 pb-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#4F2683] flex items-center gap-1.5 font-sans">
                  <MapPin className="w-4 h-4" /> Official Location Pin
                </span>
                <a 
                  href="https://maps.google.com/maps?q=Al%20Khail%20Mall,%20Latifa%20Bint%20Hamdan%20Street,%20Al%20Quoz,%20Dubai,%20UAE" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[10px] text-gray-500 hover:text-[#4F2683] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors font-sans"
                >
                  Open in Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
 
              {/* Google Maps Iframe pointing to Al Khail Mall / Latifa Bint Hamdan Street Al Quoz Dubai */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg relative h-[320px] bg-white">
                <iframe 
                  src="https://maps.google.com/maps?q=Al%20Khail%20Mall,%20Latifa%20Bint%20Hamdan%20Street,%20Al%20Quoz,%20Dubai&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Al Qadah Trading LLC Al Quoz Dubai Location"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
 
          </div>
 
          {/* Bottom Copyright Row */}
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <p>© 2026 Sempertex AE. All Rights Reserved. Distributed by Al Qadah Trading LLC.</p>
            <div className="flex gap-4">
              <span>Made of 100% Biodegradable Latex</span>
              <span>•</span>
              <span>Premier Latex Quality</span>
            </div>
          </div>
 
        </div>
      </footer>

    </div>
  );
}
