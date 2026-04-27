import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ArrowRight, Star, Coffee, MapPin, Mail, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const CoffeeOfferingEntity = base44.entities.CoffeeOffering;
const PressQuoteEntity = base44.entities.PressQuote;

// Utility for scroll reveals
const AnimatedElement = ({ children, className, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { 
        clearTimeout(fallback); 
        setTimeout(() => setIsVisible(true), delay); 
        observer.unobserve(el); 
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);

  const translateClass = direction === "up" ? "translate-y-12" : 
                         direction === "left" ? "translate-x-12" : 
                         direction === "right" ? "-translate-x-12" : "translate-y-8";

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${translateClass}`} ${className || ""}`}>
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <main className="bg-background selection:bg-foreground selection:text-background min-h-screen">
      {/* Required Keyframes Injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatA { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes floatB { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-2deg); } }
        @keyframes slowZoom { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
        @keyframes ticker-left { 0% { transform: translate(0); } 100% { transform: translate(-50%); } }
        .font-editorial { font-family: 'Cinzel', 'Playfair Display', serif; }
        .text-editorial { font-family: 'Cinzel', 'Playfair Display', serif; text-transform: lowercase; }
      `}} />

      <HeroSection />
      <TickerSection />
      <FeaturedOfferingSection />
      <SubscribeSection />
      <CafeExpressions />
      <SpringOfferingsSection />
      <BoxSetsSection />
      <AwardsSection />
      <CoffeeMenuSection />
      <BaristaSectionSection />
      <WholesaleAndClassesSection />
      <ComeVisitSection />
      <BCorp />
      <ShopGrid />
    </main>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-primary overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2000"
          alt="Coffee Roasting"
          className="w-full h-full object-cover opacity-60 mix-blend-overlay animate-[slowZoom_30s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/95" />
      </motion.div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" style={{ animation: "floatA 10s ease-in-out infinite" }} />
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-background/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" style={{ animation: "floatB 12s ease-in-out infinite reverse" }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-6 max-w-[1000px] mx-auto mt-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="w-16 h-16 sm:w-24 sm:h-24 border border-primary-foreground/20 rounded-full mx-auto mb-8 flex items-center justify-center backdrop-blur-sm"
        >
          <Coffee className="w-8 h-8 sm:w-12 sm:h-12 text-primary-foreground/80" strokeWidth={1} />
        </motion.div>

        <h1 className="text-6xl sm:text-[8rem] leading-[0.85] tracking-tight mb-8 text-primary-foreground font-editorial">
          never settle
          <br />
          <span className="italic font-light text-primary-foreground/80">for good enough</span>
        </h1>
        
        <p className="text-primary-foreground/80 text-sm sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide">
          Join us in seeking quality, truth and accountability in coffee. Together, we journey to find the finest and most unique coffees in the world.
        </p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-6 justify-center"
        >
          <Link to="/Menu">
            <Button className="group relative overflow-hidden bg-primary-foreground text-primary hover:bg-background px-10 py-7 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 rounded-none">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-background/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative z-10 flex items-center">
                Explore Offerings
                <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4"
      >
        <span className="text-primary-foreground/40 text-[10px] tracking-[0.3em] uppercase rotate-90 origin-bottom translate-y-8 absolute -left-6">Scroll</span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-primary-foreground/50 to-transparent overflow-hidden">
          <div className="w-full h-1/2 bg-primary-foreground animate-[translate-y-full_2s_infinite]" />
        </div>
      </motion.div>
    </section>
  );
}

function TickerSection() {
  const items = ["Morning Light Blend", "Harvest Select", "Pacific Ridge", "Elevation Espresso", "Cold Brew Reserve", "Ethiopian Natural", "Colombia Huila"];
  return (
    <section className="bg-foreground text-background py-4 overflow-hidden border-t border-background/10">
      <div className="flex w-[200%] animate-[ticker-left_30s_linear_infinite] items-center">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center justify-center w-max px-8">
            <span className="text-xs tracking-[0.2em] uppercase font-bold whitespace-nowrap opacity-80">
              {item}
            </span>
            <Star className="w-3 h-3 mx-8 opacity-30 fill-current" />
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedOfferingSection() {
  return (
    <section className="bg-background relative w-full overflow-hidden">
      <div className="flex flex-col md:flex-row w-full min-h-[80vh]">
        {/* Image Half */}
        <div className="w-full md:w-1/2 relative overflow-hidden group min-h-[50vh] md:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1200"
            alt="California Condor Ridge Caturra"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors duration-700" />
          {/* Badge Overlay */}
          <div className="absolute top-8 left-8 sm:top-12 sm:left-12 bg-background px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-bold text-foreground mix-blend-screen shadow-2xl">
            New Arrival
          </div>
        </div>
        
        {/* Text Half */}
        <div className="w-full md:w-1/2 bg-background flex flex-col justify-center px-8 py-20 sm:p-20 lg:p-32 relative">
          <AnimatedElement direction="up">
            <p className="text-foreground/50 text-xs tracking-[0.2em] uppercase mb-8 font-bold flex items-center gap-4">
              <span className="w-8 h-px bg-foreground/30"></span>
              Featured Offering
            </p>
            <h2 className="text-5xl sm:text-7xl leading-[0.9] tracking-tighter mb-8 text-editorial text-foreground">
              morning
              <br />
              light
              <br />
              <span className="italic text-foreground/70">blend</span>
            </h2>
            <div className="inline-block border border-foreground/20 px-4 py-2 mb-8">
              <p className="text-foreground font-bold text-xs tracking-[0.15em] uppercase">Jasmine · Blood Orange · Honey</p>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed mb-12 max-w-md">
              A radiant Ethiopian blend from Yirgacheffe, where volcanic soils and high altitude create an extraordinary floral cup that sings with citrus brightness. Grown with care, roasted with precision.
            </p>
            <Button className="bg-foreground text-background hover:bg-foreground/90 px-10 py-7 text-xs tracking-[0.2em] uppercase font-bold w-fit hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 rounded-none group">
              Explore Offering <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

function SubscribeSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=2000"
          alt="Coffee Beans Subscriptions"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-primary/40 mix-blend-multiply" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32">
        <AnimatedElement>
          <div className="w-12 h-12 border border-primary-foreground/30 rotate-45 mx-auto mb-10 flex items-center justify-center backdrop-blur-md">
            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
          </div>
          <h2 className="text-6xl sm:text-[7rem] text-primary-foreground leading-[0.85] tracking-tight mb-8 text-editorial">
            subscribe
            <br />
            <span className="italic text-primary-foreground/70">&amp; save</span>
          </h2>
          <p className="text-primary-foreground/80 text-sm sm:text-base max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            When coffees arrive at our roastery, we meticulously refine each roast profile with precision, ensuring every cup highlights the coffee's natural brilliance. Fresh roasted and delivered on your schedule.
          </p>
          <Button className="bg-background text-foreground hover:bg-background/90 px-12 py-8 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 rounded-none group">
            Explore Subscriptions
            <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </AnimatedElement>
      </div>
    </section>
  );
}

function CafeExpressions() {
  return (
    <section className="bg-background relative w-full overflow-hidden border-t border-border/50">
      <div className="flex flex-col md:flex-row w-full min-h-[70vh]">
        
        {/* Text Half (Left) */}
        <div className="w-full md:w-1/2 bg-background flex flex-col justify-center px-8 py-20 sm:p-20 lg:p-32 relative order-2 md:order-1">
          <div className="absolute top-0 right-0 w-64 h-64 bg-foreground/5 rounded-full blur-[100px] pointer-events-none" />
          <AnimatedElement direction="up">
            <h2 className="text-5xl sm:text-7xl leading-[0.9] tracking-tighter mb-8 text-editorial text-foreground">
              cafe
              <br />
              <span className="italic text-foreground/70">expressions</span>
            </h2>
            <p className="text-foreground/70 text-sm leading-relaxed mb-6 max-w-md font-medium">
              For the last five years, we've been developing a curated line of finished beverages crafted with the same care, precision, and standards that define Chelvies' award-winning cafes.
            </p>
            <p className="text-foreground/50 text-sm leading-relaxed mb-10 max-w-md">
              Experience our signature drinks in a new format. Learn more about the new program by clicking the link below.
            </p>
            <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background px-10 py-6 text-xs tracking-[0.2em] uppercase font-bold w-fit transition-all duration-500 rounded-none group">
              Learn More
            </Button>
          </AnimatedElement>
        </div>

        {/* Image Half (Right) */}
        <div className="w-full md:w-1/2 relative overflow-hidden group min-h-[50vh] md:min-h-full order-1 md:order-2">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200"
            alt="Cafe Expressions Beverage"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
        
      </div>
    </section>
  );
}

function SpringOfferingsSection() {
  const origins = [
    { name: "Peru", img: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=800", desc: "Offers some of the best offerings for us to enjoy. Known for care and craftsmanship." },
    { name: "Honduras", img: "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&q=80&w=800", desc: "Known for its smooth, balanced profile thanks to diverse microclimates." },
    { name: "Colombia", img: "https://images.unsplash.com/photo-1600860363294-8ab37ccda2ba?auto=format&fit=crop&q=80&w=800", desc: "Known for innovation and resilience, dating back to the early 19th century." },
  ];

  return (
    <section className="bg-foreground text-background py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-background/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6">
        <AnimatedElement className="text-center mb-24">
          <h2 className="text-6xl sm:text-[7rem] leading-[0.85] tracking-tight mb-8 text-editorial">
            spring
            <br />
            <span className="italic text-background/70">offerings</span>
          </h2>
          <p className="text-background/60 text-sm max-w-xl mx-auto tracking-wide">
            See our latest offerings from around the world, brought straight to you. Keep up to date with new coffee launches by signing up for our weekly release newsletter.
          </p>
          <div className="mt-10">
             <Button variant="outline" className="border-background/30 text-background hover:bg-background hover:text-foreground px-8 py-6 text-xs tracking-[0.2em] uppercase rounded-none transition-all duration-300">
               Learn More
             </Button>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
          {origins.map((o, i) => (
            <AnimatedElement key={o.name} delay={i * 150} direction="up">
              <a href="#" className="group block text-center">
                <div className="relative overflow-hidden aspect-[3/4] rounded-t-[12rem] mb-8 bg-background/5">
                  <img src={o.img} alt={o.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-60" />
                </div>
                <h3 className="text-2xl font-bold tracking-[0.1em] uppercase mb-4">{o.name}</h3>
                <p className="text-background/60 text-xs leading-relaxed max-w-[250px] mx-auto mb-6">{o.desc}</p>
                <span className="text-xs tracking-[0.2em] uppercase font-bold relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[1px] after:bg-background group-hover:after:w-full after:transition-all duration-300 inline-block pb-1">
                  View Coffees
                </span>
              </a>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function BoxSetsSection() {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Box Sets */}
        <div className="relative group min-h-[60vh] overflow-hidden cursor-pointer">
          <img src="https://images.unsplash.com/photo-1587049352851-8d4e89134b15?auto=format&fit=crop&q=80&w=1200" alt="Box Sets" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-colors duration-500 mix-blend-multiply" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
            <AnimatedElement>
              <h2 className="text-4xl sm:text-5xl text-primary-foreground mb-4 text-editorial">box sets</h2>
              <p className="text-primary-foreground/80 text-sm max-w-sm mx-auto mb-8 font-light">Want to try more than just one offering from us? Explore our box sets for smaller sample packs or a collection of our beloved blends!</p>
              <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-5 rounded-none text-xs tracking-widest uppercase">
                See Box Sets
              </Button>
            </AnimatedElement>
          </div>
        </div>
        
        {/* Terroir / Subscriptions */}
        <div className="relative group min-h-[60vh] overflow-hidden cursor-pointer">
          <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200" alt="Terroir" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/60 transition-colors duration-500 mix-blend-multiply" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
            <AnimatedElement delay={100}>
              <h2 className="text-4xl sm:text-5xl text-primary-foreground mb-4 text-editorial">terroir</h2>
              <p className="text-primary-foreground/80 text-sm max-w-sm mx-auto mb-8 font-light">Enjoy the world of specialty sourced chocolate. We have something for everyone and can't wait to share our favorite goods with you.</p>
              <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-5 rounded-none text-xs tracking-widest uppercase">
                Explore Chocolate
              </Button>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}

function AwardsSection() {
  const awards = [
    { year: "2024", title: "US Brewer's Cup Championship", subtitle: "2nd Place, Weihong Zhang" },
    { year: "2024", title: "US Cup Tasters Championship", subtitle: "Finalist, Team Chelvies" },
    { year: "2023", title: "The Webby Awards", subtitle: "Best Food & Drink Website" },
    { year: "2023", title: "Good Food Awards", subtitle: "Winner, Ethiopia Natural" },
  ];

  return (
    <section className="bg-foreground text-background relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1522012117564-c68997bd0cc9?auto=format&fit=crop&q=80&w=2000" alt="Awards Background" className="w-full h-full object-cover opacity-20 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <AnimatedElement>
          <div className="flex items-center gap-6 mb-16">
             <div className="w-16 h-px bg-background/30"></div>
             <h2 className="text-3xl sm:text-5xl text-editorial tracking-tight">most awarded <span className="italic text-background/60">coffee roaster</span></h2>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
          {awards.map((award, idx) => (
            <AnimatedElement key={idx} delay={idx * 150} direction="up" className="border-l border-background/20 pl-6 relative hover:border-background transition-colors duration-500">
              <span className="absolute -top-4 -left-3 text-6xl font-black text-background/5 select-none">{idx + 1}</span>
              <p className="text-xs tracking-[0.2em] uppercase font-bold text-background/50 mb-3">{award.year}</p>
              <h3 className="text-lg font-bold leading-tight mb-2 pr-4">{award.title}</h3>
              <p className="text-sm text-background/70 font-light">{award.subtitle}</p>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoffeeMenuSection() {
  const staticFallback = [
    { name: "Morning Light", origin: "Ethiopia", tasting_notes: "Jasmine · Blood Orange · Honey", price: "$22", roast: "Light", badge: "New", image_url: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600" },
    { name: "Harvest Select", origin: "Colombia", tasting_notes: "Dark Chocolate · Caramel · Walnut", price: "$20", roast: "Medium", badge: "Fan Favorite", image_url: "https://images.unsplash.com/photo-1587049352851-8d4e89134b15?auto=format&fit=crop&q=80&w=600" },
    { name: "Elevation", origin: "Guatemala", tasting_notes: "Brown Sugar · Dried Cherry · Almond", price: "$19", roast: "Medium-Dark", badge: "", image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600" },
    { name: "Pacific Ridge", origin: "Peru", tasting_notes: "Peach · Raw Sugar · Oolong", price: "$21", roast: "Light", badge: "Limited", image_url: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=600" },
  ];

  return (
    <section className="bg-background py-32 border-t border-border/40">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
          <AnimatedElement>
            <p className="text-foreground/50 text-xs tracking-[0.2em] uppercase mb-4 font-bold flex items-center gap-4">
              <span className="w-8 h-px bg-foreground/30"></span>
              Fresh Roasts
            </p>
            <h2 className="text-5xl sm:text-6xl text-editorial tracking-tighter">current <span className="italic text-foreground/60">coffees</span></h2>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <Link to="/Menu">
              <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background text-xs tracking-[0.2em] uppercase px-8 py-6 rounded-none transition-all duration-300">
                Shop All Coffee
              </Button>
            </Link>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {staticFallback.map((item, index) => (
            <AnimatedElement key={index} delay={index * 100} direction="up">
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-6">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 mix-blend-multiply" />
                  {item.badge && (
                    <div className="absolute top-4 left-4 bg-background text-foreground px-3 py-1 text-[9px] tracking-[0.2em] uppercase font-bold shadow-md">
                      {item.badge}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-background/20 backdrop-blur-sm">
                    <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-none text-xs tracking-widest uppercase px-6 py-4 shadow-xl">
                      Quick Add
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold tracking-tight text-foreground">{item.name}</h3>
                    <span className="text-sm font-medium text-foreground/80">{item.price}</span>
                  </div>
                  <p className="text-foreground/50 text-[10px] tracking-[0.2em] uppercase font-bold mb-3">{item.origin} · {item.roast}</p>
                  <p className="text-sm text-foreground/70">{item.tasting_notes}</p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function BaristaSectionSection() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=2000" alt="Barista Pouring" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/40 mix-blend-multiply" />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full text-center py-20">
        <AnimatedElement>
          <h2 className="text-6xl sm:text-[8rem] text-primary-foreground leading-[0.85] tracking-tight mb-8 text-editorial">
            barista
            <br />
            <span className="italic text-primary-foreground/70">provisions</span>
          </h2>
          <p className="text-primary-foreground/80 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            We've spent years refining ingredients, perfecting recipes, and testing in our cafes to create drinks that are both delicious and unforgettable. Now, we're sharing the best of what we discovered with you.
          </p>
          <Button className="bg-primary-foreground text-primary hover:bg-background px-10 py-6 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500 hover:shadow-2xl rounded-none group">
            Explore Now
          </Button>
        </AnimatedElement>
      </div>
    </section>
  );
}

function WholesaleAndClassesSection() {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Classes */}
        <div className="relative group min-h-[60vh] overflow-hidden cursor-pointer">
          <img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=1200" alt="Classes" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-primary/60 group-hover:bg-primary/70 transition-colors duration-500 mix-blend-multiply" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-10 text-center">
            <AnimatedElement>
              <h2 className="text-4xl text-primary-foreground mb-4 font-bold tracking-wider uppercase">Classes</h2>
              <p className="text-primary-foreground/80 text-sm max-w-sm mx-auto mb-8 font-light">Let our head barista guide you through a variety of skills and knowledge surrounding all aspects of coffee. We host classes in our HQ lab.</p>
              <Button variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-5 rounded-none text-xs tracking-widest uppercase">
                See Classes
              </Button>
            </AnimatedElement>
          </div>
        </div>
        
        {/* Wholesale */}
        <div className="relative group min-h-[60vh] overflow-hidden cursor-pointer">
          <img src="https://images.unsplash.com/photo-1495474472207-464a8d4ce7c8?auto=format&fit=crop&q=80&w=1200" alt="Spring Menu" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/60 transition-colors duration-500 mix-blend-multiply" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-10 text-center">
            <AnimatedElement delay={100}>
              <h2 className="text-4xl text-primary-foreground mb-4 font-bold tracking-wider uppercase">Spring Menu</h2>
              <p className="text-primary-foreground/80 text-sm max-w-sm mx-auto mb-8 font-light">Spring is here and our new menu is turning heads. Come join us in the cafes and try your new favorite drink today.</p>
              <Button variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-5 rounded-none text-xs tracking-widest uppercase">
                See Our Cafes
              </Button>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComeVisitSection() {
  return (
    <section className="bg-background relative w-full overflow-hidden border-t border-border/50">
      <div className="flex flex-col md:flex-row w-full min-h-[70vh]">
        
        {/* Text Half */}
        <div className="w-full md:w-1/2 bg-background flex flex-col justify-center px-8 py-20 sm:p-20 lg:p-32 relative">
          <AnimatedElement direction="up">
            <h2 className="text-5xl sm:text-7xl leading-[0.9] tracking-tighter mb-8 text-editorial text-foreground">
              come
              <br />
              <span className="italic text-foreground/70">visit us</span>
            </h2>
            <p className="text-foreground/70 text-sm leading-relaxed mb-10 max-w-md">
              Our community is at the heart of what we do. You can learn more about each of our unique cafes across the Northwest region as well as our roastery HQ. See cafe hours, explore the menu, and make plans to come see us any day of the week!
            </p>
            <Link to="/Locations">
              <Button className="bg-foreground text-background hover:bg-foreground/90 px-10 py-6 text-xs tracking-[0.2em] uppercase font-bold w-fit transition-all duration-500 rounded-none">
                Our Locations
              </Button>
            </Link>
          </AnimatedElement>
        </div>

        {/* Image Half */}
        <div className="w-full md:w-1/2 relative overflow-hidden group min-h-[50vh] md:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=1200"
            alt="Pouring Coffee"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
        
      </div>
    </section>
  );
}

function BCorp() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=2000" alt="Coffee Farm" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 mix-blend-multiply" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
        <AnimatedElement>
          <h2 className="text-5xl sm:text-[6rem] text-primary-foreground leading-[0.85] tracking-tight mb-8 text-editorial">
            we are a
            <br />
            certified
            <br />
            <span className="italic text-primary-foreground/70">b-corp</span>
          </h2>
          <p className="text-primary-foreground/80 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            This certification is more than a symbol — it's a statement of who we are and how we work. B Corps™ are businesses that meet the highest verified standards of social and environmental performance.
          </p>
          <Button variant="outline" className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary px-10 py-6 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500 rounded-none">
            See Our Certification
          </Button>
        </AnimatedElement>
      </div>
    </section>
  );
}

function ShopGrid() {
  const categories = [
    { name: "Coffee", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600" },
    { name: "Tea", img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600" },
    { name: "Chocolate", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600" },
    { name: "Merch", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600" },
  ];
  return (
    <section className="bg-foreground flex flex-col md:flex-row w-full h-[50vh] sm:h-[40vh]">
      {categories.map((c, i) => (
        <a key={c.name} href="#" className="relative group w-full md:w-1/4 h-full overflow-hidden block border-r border-background/10 last:border-r-0">
          <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-40 mix-blend-luminosity group-hover:mix-blend-normal" />
          <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
            <h3 className="text-background text-2xl font-bold tracking-[0.15em] uppercase mb-4 opacity-90 group-hover:translate-y-0 transition-transform duration-500">{c.name}</h3>
            <span className="text-background/80 text-xs tracking-[0.2em] border border-background/40 px-6 py-2 uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-background hover:text-foreground">
              Shop
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}