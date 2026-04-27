import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, ArrowRight, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className || ""}`}>
      {children}
    </div>
  );
};

const locations = [
  {
    name: "Downtown Flagship",
    address: "142 Main Street, Suite 101",
    city: "Your City, ST 00000",
    hours: "Mon–Fri: 6:30am – 7:00pm\nSat–Sun: 7:00am – 6:00pm",
    phone: "(555) 000-1234",
    description: "Our original flagship location — a warm, inviting space built for the craft of coffee. Featuring a full espresso bar, rotating single origins, and a curated food menu.",
    image: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/adae611ae_generated_066dabd6.png",
    tag: "Flagship",
  },
  {
    name: "Eastside Studio",
    address: "78 Eastside Boulevard",
    city: "Your City, ST 00000",
    hours: "Mon–Fri: 7:00am – 6:00pm\nSat: 8:00am – 5:00pm\nSun: Closed",
    phone: "(555) 000-5678",
    description: "Our cozy neighborhood studio, built for morning rituals and midday escapes. Minimally designed, maximally focused on the cup in your hand.",
    image: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/9ccf2568a_generated_f37a4ca1.png",
    tag: "Studio",
  },
  {
    name: "Roastery & Lab",
    address: "305 Industrial Way",
    city: "Your City, ST 00000",
    hours: "Tue–Sat: 8:00am – 4:00pm\nSun–Mon: Closed",
    phone: "(555) 000-9012",
    description: "Where the magic happens. Visit our working roastery for a behind-the-scenes experience, on-site cupping classes, and access to limited roastery exclusives.",
    image: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/24a153b51_generated_486190bc.png",
    tag: "Roastery",
  },
];

export default function Locations() {
  const [activeLocation, setActiveLocation] = useState(0);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary" style={{ minHeight: "45vh" }}>
        <div className="absolute inset-0">
          <img src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/adae611ae_generated_066dabd6.png" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 left-8 pointer-events-none" style={{ animation: "floatA 8s ease-in-out infinite" }}>
          <div className="w-3 h-3 rounded-full bg-accent/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center"
          style={{ minHeight: "45vh" }}
        >
          <p className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-4">Find Us</p>
          <h1
            className="text-6xl sm:text-8xl font-bold text-primary-foreground leading-[0.85] tracking-tighter mb-6"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Our
            <br />
            <span className="bg-gradient-to-r from-accent via-primary-foreground to-accent bg-clip-text text-transparent animate-gradient-x">Locations</span>
          </h1>
          <p className="text-primary-foreground/60 text-sm max-w-lg leading-relaxed">
            Our community is at the heart of what we do. Come see us any day of the week.
          </p>
        </motion.div>
      </section>

      {/* Location Tabs */}
      <AnimatedElement>
        <section className="bg-muted border-b border-border/30 py-4">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 overflow-x-auto">
            {locations.map((loc, i) => (
              <button
                key={i}
                onClick={() => setActiveLocation(i)}
                className={`text-xs tracking-widest uppercase font-bold px-5 py-2 rounded-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  activeLocation === i
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </section>
      </AnimatedElement>

      {/* Featured Location */}
      <AnimatedElement>
        <section className="py-0">
          {locations.map((loc, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${activeLocation === i ? "block" : "hidden"}`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="relative overflow-hidden" style={{ minHeight: "480px" }}>
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" style={{ minHeight: "480px" }} />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-accent text-accent-foreground text-xs tracking-widest uppercase font-bold px-3 py-1">{loc.tag}</span>
                  </div>
                </div>
                <div className="bg-background flex flex-col justify-center px-10 py-16 relative">
                  <div className="absolute top-8 right-8 w-56 h-56 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
                  <h2
                    className="text-4xl font-bold text-foreground tracking-tighter mb-2 relative z-10"
                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                  >
                    {loc.name}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6 relative z-10">{loc.description}</p>
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-foreground text-sm font-medium">{loc.address}</p>
                        <p className="text-muted-foreground text-sm">{loc.city}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        {loc.hours.split("\n").map((h, hi) => (
                          <p key={hi} className="text-foreground text-sm">{h}</p>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                      <p className="text-foreground text-sm font-medium">{loc.phone}</p>
                    </div>
                  </div>
                  <div className="mt-8 flex gap-3 relative z-10">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-6 py-4 text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        Get Directions <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </AnimatedElement>

      {/* All Locations Grid */}
      <AnimatedElement>
        <section className="bg-muted py-20">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-muted-foreground text-xs tracking-widest uppercase mb-4">All Locations</p>
            <h2
              className="text-4xl font-bold text-foreground tracking-tighter mb-12"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Visit Us Anytime
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {locations.map((loc, i) => (
                <AnimatedElement key={i} delay={i * 80}>
                  <div
                    className="bg-card rounded-sm overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)] transition-all duration-500 group"
                    onClick={() => setActiveLocation(i)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={loc.image} alt={loc.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="bg-accent text-accent-foreground text-xs tracking-wider uppercase font-bold px-2 py-1">{loc.tag}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-card-foreground text-lg font-bold tracking-tight mb-2">{loc.name}</h3>
                      <p className="text-card-foreground/50 text-xs mb-3">{loc.address}, {loc.city}</p>
                      <div className="flex items-center gap-2 text-accent text-xs font-bold tracking-widest uppercase group-hover:gap-3 transition-all duration-300">
                        <MapPin className="h-3 w-3" /> View Details
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Private Events */}
      <AnimatedElement>
        <section className="relative overflow-hidden bg-primary py-20">
          <div className="absolute inset-0">
            <img src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/9ccf2568a_generated_f37a4ca1.png" alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-primary/85" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <Coffee className="h-8 w-8 text-accent mx-auto mb-6" />
            <p className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-4">Special Occasions</p>
            <h2
              className="text-5xl font-bold text-primary-foreground leading-[0.85] tracking-tighter mb-6"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Private Events
              <br />
              <span className="text-accent">&amp; Catering</span>
            </h2>
            <p className="text-primary-foreground/70 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
              Planning a private event? We'd love to be part of it. From intimate gatherings to corporate events, our team creates unforgettable coffee experiences.
            </p>
            <a href="mailto:hello@chelviescoffee.com">
              <Button className="relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-sm tracking-widest uppercase font-bold hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>
      </AnimatedElement>
    </div>
  );
}