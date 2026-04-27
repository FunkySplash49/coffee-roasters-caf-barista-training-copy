import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ArrowRight, Star, Coffee, MapPin, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const CoffeeOfferingEntity = base44.entities.CoffeeOffering;
const PressQuoteEntity = base44.entities.PressQuote;

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

function HeroSection() {
  const [email, setEmail] = useState("");
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/9ccf2568a_generated_f37a4ca1.png"
          alt="Chelvies Coffee"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/90" />
      </div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/30 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-primary-foreground/60 text-xs tracking-[0.3em] uppercase mb-6"
        >
          Chelvies Coffee Company
        </motion.p>
        <h1
          className="text-6xl sm:text-8xl font-bold text-primary-foreground leading-[0.9] tracking-tighter mb-8"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          <span className="block bg-gradient-to-r from-primary-foreground via-accent-foreground to-primary-foreground bg-clip-text text-transparent animate-gradient-x">
            Never Settle
          </span>
          <span className="block text-primary-foreground/90">for Good Enough</span>
        </h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Join us in seeking quality, truth and accountability in coffee. Together, we journey to find the finest and most unique coffees in the world.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <Link to="/Menu">
            <Button className="relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-sm tracking-widest uppercase font-bold transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-1">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              Explore Offerings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/Locations">
            <Button variant="outline" className="border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 px-8 py-6 text-sm tracking-widest uppercase font-bold">
              Find A Cafe
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-primary-foreground/40 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary-foreground/40 to-transparent" />
      </motion.div>

      <div className="absolute top-1/3 left-8 pointer-events-none" style={{ animation: "floatA 8s ease-in-out infinite" }}>
        <div className="w-3 h-3 rounded-full bg-accent/60" />
      </div>
      <div className="absolute top-2/3 right-12 pointer-events-none" style={{ animation: "floatB 6s ease-in-out 2s infinite" }}>
        <div className="w-2 h-2 rounded-full bg-primary-foreground/30" />
      </div>
    </section>
  );
}

function TickerSection() {
  const items = ["Morning Light Blend", "Harvest Select", "Pacific Ridge", "Elevation Espresso", "Cold Brew Reserve", "Ethiopian Natural", "Colombia Huila", "Peru Cajamarca"];
  return (
    <section className="bg-accent overflow-hidden py-3">
      <div className="flex items-center gap-8 ticker-scroll">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="text-accent-foreground text-xs tracking-widest uppercase whitespace-nowrap font-bold flex items-center gap-4">
            {item}
            <span className="w-1 h-1 rounded-full bg-accent-foreground/50 flex-shrink-0" />
          </span>
        ))}
      </div>
    </section>
  );
}

function FeaturedOfferingSection() {
  return (
    <AnimatedElement>
      <section className="bg-background py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative overflow-hidden" style={{ minHeight: "500px" }}>
            <img
              src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/0a0efdfbe_generated_eaccb73c.png"
              alt="California Condor Ridge Caturra"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              style={{ minHeight: "500px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
          </div>
          <div className="bg-background flex flex-col justify-center px-10 py-16 relative">
            <div className="absolute top-8 right-8 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <p className="text-muted-foreground text-xs tracking-widest uppercase mb-4">Featured Offering</p>
            <h2
              className="text-5xl sm:text-6xl font-bold text-foreground leading-[0.9] tracking-tighter mb-6"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Morning
              <br />
              Light
              <br />
              <span className="bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">Blend</span>
            </h2>
            <p className="text-accent font-bold text-sm tracking-wider mb-4">Jasmine · Blood Orange · Honey</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
              A radiant Ethiopian blend from Yirgacheffe, where volcanic soils and high altitude create an extraordinary floral cup that sings with citrus brightness. Grown with care, roasted with precision.
            </p>
            <a href="#">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-5 text-xs tracking-widest uppercase font-bold w-fit hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                Explore This Offering <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}

function SubscribeSection() {
  return (
    <AnimatedElement>
      <section className="relative overflow-hidden bg-primary py-0">
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/24a153b51_generated_486190bc.png"
            alt="Subscribe"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          <p className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-6">Never miss a release</p>
          <h2
            className="text-6xl sm:text-8xl font-bold text-primary-foreground leading-[0.85] tracking-tighter mb-8"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            SUBSCRIBE
            <br />
            <span className="text-accent">&amp; SAVE</span>
          </h2>
          <p className="text-primary-foreground/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            When coffees arrive at our roastery, we meticulously refine each roast profile with precision, ensuring every cup highlights the coffee's natural brilliance. Each roast is meticulously tracked, cupped, and published.
          </p>
          <a href="#">
            <Button className="relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-sm tracking-widest uppercase font-bold hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-1">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              Explore Coffee Subscriptions
            </Button>
          </a>
        </div>
      </section>
    </AnimatedElement>
  );
}

function SpringOfferingsSection() {
  const origins = [
    {
      name: "Peru",
      img: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/b6e93fdf9_generated_9acd3bb9.png",
      desc: "Peru offers some of the best offerings for us to enjoy. Known for care and craftsmanship, these offerings are sure to be enjoyed.",
    },
    {
      name: "Honduras",
      img: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/24a153b51_generated_486190bc.png",
      desc: "Honduran coffee is known for its smooth, balanced profile, thanks to the country's diverse microclimates and high-altitude growing regions.",
    },
    {
      name: "Colombia",
      img: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/97c275c38_generated_7d8c3497.png",
      desc: "Known for innovation and resilience, Colombia's coffee history dates back to the early 19th century.",
    },
  ];
  return (
    <AnimatedElement>
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <p className="text-muted-foreground text-xs tracking-widest uppercase mb-4">What's fresh</p>
            <h2
              className="text-6xl sm:text-8xl font-bold text-foreground leading-[0.85] tracking-tighter"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Spring
              <br />
              <span className="bg-gradient-to-r from-accent via-foreground to-accent bg-clip-text text-transparent animate-gradient-x">Offerings</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-6">
              See our latest offerings from around the world, brought straight to you. Keep up to date with new coffee launches by signing up for our weekly release newsletter.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
            {origins.map((o, i) => (
              <AnimatedElement key={o.name} delay={i * 100}>
                <a href="#" className="group relative overflow-hidden block aspect-[4/5]">
                  <img src={o.img} alt={o.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-primary-foreground text-2xl font-bold tracking-tight mb-2">{o.name}</h3>
                    <p className="text-primary-foreground/70 text-xs leading-relaxed mb-4">{o.desc}</p>
                    <span className="text-accent text-xs tracking-widest uppercase font-bold flex items-center gap-2">
                      View Coffees <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </a>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}

function CoffeeMenuSection() {
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CoffeeOfferingEntity.list("-updated_date", 6).then(setOfferings).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const staticFallback = [
    { name: "Morning Light Blend", origin: "Ethiopia", tasting_notes: "Jasmine · Blood Orange · Honey", price: "$22", roast_level: "Light", badge: "New", image_url: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/0a0efdfbe_generated_eaccb73c.png" },
    { name: "Harvest Select", origin: "Colombia", tasting_notes: "Dark Chocolate · Caramel · Walnut", price: "$20", roast_level: "Medium", badge: "Fan Favorite", image_url: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/97c275c38_generated_7d8c3497.png" },
    { name: "Elevation Espresso", origin: "Guatemala", tasting_notes: "Brown Sugar · Dried Cherry · Almond", price: "$19", roast_level: "Medium-Dark", badge: "", image_url: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/24a153b51_generated_486190bc.png" },
    { name: "Pacific Ridge", origin: "Peru", tasting_notes: "Peach · Raw Sugar · Oolong", price: "$21", roast_level: "Light", badge: "Limited", image_url: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/b6e93fdf9_generated_9acd3bb9.png" },
    { name: "Cold Brew Reserve", origin: "Honduras", tasting_notes: "Bittersweet Chocolate · Brown Butter · Fig", price: "$18", roast_level: "Dark", badge: "", image_url: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/0a0efdfbe_generated_eaccb73c.png" },
  ];
  const items = offerings.length > 0 ? offerings : staticFallback;

  return (
    <AnimatedElement>
      <section className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-muted-foreground text-xs tracking-widest uppercase mb-3">Our Selection</p>
              <h2
                className="text-5xl font-bold text-foreground tracking-tighter"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                Current Coffees
              </h2>
            </div>
            <Link to="/Menu">
              <Button variant="outline" className="border-border text-foreground hover:bg-primary hover:text-primary-foreground text-xs tracking-widest uppercase px-6 py-4 transition-all duration-300">
                View All <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
            {items.map((item, index) => (
              <AnimatedElement key={item.name || index} delay={index * 80}>
                <div className="group bg-card rounded-sm overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)] transition-all duration-500 cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    {item.badge ? (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-accent text-accent-foreground text-xs tracking-wider uppercase">{item.badge}</Badge>
                      </div>
                    ) : null}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-card-foreground text-lg font-bold tracking-tight">{item.name}</h3>
                      <span className="text-card-foreground font-bold text-sm">{item.price}</span>
                    </div>
                    <p className="text-card-foreground/50 text-xs tracking-widest uppercase mb-2">{item.origin} · {item.roast_level}</p>
                    <p className="text-accent text-xs font-medium">{item.tasting_notes}</p>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}

function BoxSetsSection() {
  return (
    <AnimatedElement>
      <section className="bg-background py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative group overflow-hidden" style={{ minHeight: "400px" }}>
            <img
              src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/97c275c38_generated_7d8c3497.png"
              alt="Box Sets"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ minHeight: "400px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h2 className="text-primary-foreground text-4xl font-bold tracking-tighter mb-3" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>BOX SETS</h2>
              <p className="text-primary-foreground/70 text-sm mb-5 max-w-xs">Want to try more than just one offering? Explore our box sets for smaller sample packs or a collection of our most recent releases and beloved blends!</p>
              <a href="#">
                <Button className="bg-primary-foreground text-primary text-xs tracking-widest uppercase font-bold px-6 py-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                  See Box Sets <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
          <div className="relative group overflow-hidden" style={{ minHeight: "400px" }}>
            <img
              src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/b6e93fdf9_generated_9acd3bb9.png"
              alt="Subscriptions"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ minHeight: "400px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h2 className="text-primary-foreground text-4xl font-bold tracking-tighter mb-3" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>SUBSCRIPTIONS</h2>
              <p className="text-primary-foreground/70 text-sm mb-5 max-w-xs">Receive fresh-roasted specialty coffee delivered to your door on your schedule. New single origins, blends, and seasonal favorites curated just for you.</p>
              <a href="#">
                <Button className="bg-primary-foreground text-primary text-xs tracking-widest uppercase font-bold px-6 py-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                  Explore Subscriptions <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}

function AwardsSection() {
  const awards = [
    { year: "2024", title: "Best Independent Coffee Shop", org: "Regional Food & Wine Awards" },
    { year: "2024", title: "Outstanding Roastery", org: "Specialty Coffee Association" },
    { year: "2023", title: "Reader's Choice — Best Cafe", org: "Local Living Magazine" },
    { year: "2023", title: "Top 10 Coffee Shops", org: "The Hospitality Guide" },
    { year: "2022", title: "Excellence in Sourcing Award", org: "Fair Trade Alliance" },
    { year: "2022", title: "Best New Espresso Bar", org: "City Eats Awards" },
  ];
  const [current, setCurrent] = useState(0);
  return (
    <AnimatedElement>
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0">
          <img src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/adae611ae_generated_066dabd6.png" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-6">Recognition</p>
          <h2
            className="text-6xl sm:text-8xl font-bold text-primary-foreground leading-[0.85] tracking-tighter mb-16"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            THE MOST
            <br />
            <span className="text-accent">AWARDED</span>
            <br />
            COFFEE ROASTER
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary-foreground/10">
            {awards.map((a, i) => (
              <div key={i} className="bg-primary/60 backdrop-blur-sm p-8 text-center hover:bg-accent/20 transition-colors duration-300">
                <p className="text-accent font-bold text-2xl mb-2">{a.year}</p>
                <p className="text-primary-foreground font-bold text-sm tracking-tight mb-1">{a.title}</p>
                <p className="text-primary-foreground/50 text-xs">{a.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}

function PressSection() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    PressQuoteEntity.list().then(setQuotes).catch(() => {}).finally(() => setLoading(false));
  }, []);
  const staticFallback = [
    { publication: "The New York Times", quote: "\"This cleverly crafted, roasted-to-order coffee will surprise and delight even the most expert coffee enthusiasts.\"" },
    { publication: "Bon Appétit", quote: "\"This is the brand that redefined what fresh, community-driven coffee means to me.\"" },
    { publication: "GQ Magazine", quote: "\"Chelvies has taken the local coffee world by storm — consistently delivering some of the most exciting craft coffee in the region.\"" },
    { publication: "Food & Wine", quote: "\"Few cafes match Chelvies' commitment to transparency, sustainability, and sheer cup quality. A benchmark for specialty coffee.\"" },
  ];
  const items = quotes.length > 0 ? quotes : staticFallback;

  return (
    <AnimatedElement>
      <section className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-muted-foreground text-xs tracking-widest uppercase text-center mb-12">As Featured In</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((q, i) => (
              <AnimatedElement key={i} delay={i * 80}>
                <div className="bg-card p-8 rounded-sm border border-border/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <p className="text-card-foreground/80 text-sm leading-relaxed mb-6 italic">{q.quote}</p>
                  <p className="text-accent font-bold text-xs tracking-widest uppercase">{q.publication}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}

function CafeExpressions() {
  return (
    <AnimatedElement>
      <section className="bg-background py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col justify-center px-10 py-20 relative order-2 sm:order-1">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
            <p className="text-muted-foreground text-xs tracking-widest uppercase mb-4">Premium Experience</p>
            <h2
              className="text-5xl sm:text-6xl font-bold text-foreground leading-[0.9] tracking-tighter mb-6"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              CAFE
              <br />
              <span className="bg-gradient-to-r from-accent to-foreground bg-clip-text text-transparent">EXPRESSIONS</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-md">
              For the last five years, we've been developing a curated line of finished beverages crafted with the same care, precision, and standards that define Chelvies' award-winning cafes.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
              Learn more about the new program by clicking the link below.
            </p>
            <a href="#">
              <Button className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-8 py-5 text-xs tracking-widest uppercase font-bold w-fit transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                Learn More <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </a>
          </div>
          <div className="relative overflow-hidden order-1 sm:order-2" style={{ minHeight: "500px" }}>
            <img
              src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/adae611ae_generated_066dabd6.png"
              alt="Cafe Expressions"
              className="w-full h-full object-cover"
              style={{ minHeight: "500px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/20" />
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}

function BaristaSectionSection() {
  return (
    <AnimatedElement>
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0">
          <img src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/24a153b51_generated_486190bc.png" alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <p className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-6">Expertise & Craft</p>
          <h2
            className="text-6xl sm:text-8xl font-bold text-primary-foreground leading-[0.85] tracking-tighter mb-8"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Barista
            <br />
            <span className="text-accent">Provisions</span>
          </h2>
          <p className="text-primary-foreground/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            We've spent years refining ingredients, perfecting recipes, and testing in our cafes to create drinks that are both delicious and unforgettable. Now, we're sharing the best of what we discovered with you.
          </p>
          <a href="#">
            <Button className="relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-sm tracking-widest uppercase font-bold hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              Explore Now
            </Button>
          </a>
        </div>
      </section>
    </AnimatedElement>
  );
}

function WholesaleAndClassesSection() {
  return (
    <AnimatedElement>
      <section className="bg-background py-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative group overflow-hidden" style={{ minHeight: "420px" }}>
            <img src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/b6e93fdf9_generated_9acd3bb9.png" alt="Wholesale" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ minHeight: "420px" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h2 className="text-primary-foreground text-3xl font-bold tracking-tighter mb-3" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Wholesale</h2>
              <p className="text-primary-foreground/70 text-sm mb-5 max-w-xs leading-relaxed">Be our partner. Wholesale is the heartbeat of what we do. We're baristas, roasters and cafe owners — we understand hospitality.</p>
              <a href="#">
                <Button className="bg-primary-foreground text-primary text-xs tracking-widest uppercase font-bold px-6 py-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                  Learn More <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
          <div className="relative group overflow-hidden" style={{ minHeight: "420px" }}>
            <img src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/9ccf2568a_generated_f37a4ca1.png" alt="Classes" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ minHeight: "420px" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h2 className="text-primary-foreground text-3xl font-bold tracking-tighter mb-3" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Classes</h2>
              <p className="text-primary-foreground/70 text-sm mb-5 max-w-xs leading-relaxed">Let our head barista guide you through a variety of skills and knowledge surrounding all aspects of coffee and beverages.</p>
              <a href="#">
                <Button className="bg-primary-foreground text-primary text-xs tracking-widest uppercase font-bold px-6 py-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                  See Classes <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}

function ComeVisitSection() {
  return (
    <AnimatedElement>
      <section className="bg-background">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative overflow-hidden" style={{ minHeight: "500px" }}>
            <img src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/adae611ae_generated_066dabd6.png" alt="Come Visit Us" className="w-full h-full object-cover" style={{ minHeight: "500px" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30" />
          </div>
          <div className="bg-muted flex flex-col justify-center px-10 py-16 relative">
            <div className="absolute top-8 right-8 w-48 h-48 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
            <p className="text-muted-foreground text-xs tracking-widest uppercase mb-4 relative z-10">We'd love to see you</p>
            <h2
              className="text-5xl sm:text-6xl font-bold text-foreground leading-[0.9] tracking-tighter mb-6 relative z-10"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Come
              <br />
              Visit
              <br />
              <span className="text-accent">Us</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md relative z-10">
              Our community is at the heart of what we do. See cafe hours, explore the menu, and make plans to come see us any day of the week!
            </p>
            <Link to="/Locations">
              <Button className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground px-8 py-5 text-xs tracking-widest uppercase font-bold w-fit transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative z-10">
                Our Locations <MapPin className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}

function BCorp() {
  return (
    <AnimatedElement>
      <section className="relative overflow-hidden bg-primary py-24">
        <div className="absolute inset-0">
          <img src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/24a153b51_generated_486190bc.png" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-6">Our Commitment</p>
          <h2
            className="text-6xl sm:text-8xl font-bold text-primary-foreground leading-[0.85] tracking-tighter mb-8"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            We Are A
            <br />
            Certified
            <br />
            <span className="text-accent">B-Corp</span>
          </h2>
          <p className="text-primary-foreground/70 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            This certification is more than a symbol — it's a statement of who we are and how we work. B Corps™ are businesses that meet the highest verified standards of social and environmental performance, transparency, and accountability.
          </p>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Button className="border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary px-10 py-6 text-sm tracking-widest uppercase font-bold transition-all duration-300">
              See Our Certification
            </Button>
          </a>
        </div>
      </section>
    </AnimatedElement>
  );
}

function ShopGrid() {
  const categories = [
    { name: "Coffee", img: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/0a0efdfbe_generated_eaccb73c.png" },
    { name: "Cold Brew", img: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/97c275c38_generated_7d8c3497.png" },
    { name: "Subscriptions", img: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/b6e93fdf9_generated_9acd3bb9.png" },
    { name: "Merch", img: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/24a153b51_generated_486190bc.png" },
  ];
  return (
    <AnimatedElement>
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-muted-foreground text-xs tracking-widest uppercase text-center mb-4">Explore</p>
          <h2 className="text-4xl font-bold text-foreground tracking-tighter text-center mb-12" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Shop By Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((c, i) => (
              <AnimatedElement key={c.name} delay={i * 60}>
                <a href="#" className="group relative overflow-hidden block aspect-square">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/70 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h3 className="text-primary-foreground text-xl font-bold tracking-tight mb-2">{c.name}</h3>
                    <span className="text-primary-foreground/70 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                      Shop <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </a>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
    </AnimatedElement>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <AnimatedElement>
      <section className="bg-muted py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Coffee className="h-8 w-8 text-accent mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-foreground tracking-tighter mb-4" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>Join Our Pilgrimage</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Sign up for Chelvies emails to unlock access to everything we're excited to share — new coffee releases, resources and recipes, exclusive promotions, and more.
          </p>
          {submitted ? (
            <p className="text-accent font-bold tracking-wider uppercase text-sm">Welcome to the pilgrimage.</p>
          ) : (
            <div className="flex gap-0 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-none border-border bg-background text-foreground placeholder:text-muted-foreground flex-1 py-5 text-sm"
              />
              <Button
                onClick={() => { if (email) setSubmitted(true); }}
                className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground rounded-none px-6 text-xs tracking-widest uppercase font-bold transition-all duration-300"
              >
                GO
              </Button>
            </div>
          )}
        </div>
      </section>
    </AnimatedElement>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TickerSection />
      <FeaturedOfferingSection />
      <SubscribeSection />
      <SpringOfferingsSection />
      <CoffeeMenuSection />
      <BoxSetsSection />
      <AwardsSection />
      <PressSection />
      <CafeExpressions />
      <BaristaSectionSection />
      <WholesaleAndClassesSection />
      <ComeVisitSection />
      <BCorp />
      <ShopGrid />
      <NewsletterSection />
    </div>
  );
}