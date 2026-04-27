import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ArrowRight, Coffee, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CoffeeOfferingEntity = base44.entities.CoffeeOffering;

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

const roastFilters = ["All", "Light", "Medium", "Medium-Dark", "Dark"];

export default function Menu() {
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    CoffeeOfferingEntity.list("-updated_date", 20).then(setOfferings).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const staticFallback = [
    { id: "1", name: "Morning Light Blend", origin: "Ethiopia", tasting_notes: "Jasmine · Blood Orange · Honey", description: "A radiant Ethiopian blend from Yirgacheffe, where volcanic soils and high altitude create an extraordinary floral cup that sings with citrus brightness.", price: "$22", roast_level: "Light", badge: "New", image_url: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/0a0efdfbe_generated_eaccb73c.png" },
    { id: "2", name: "Harvest Select", origin: "Colombia", tasting_notes: "Dark Chocolate · Caramel · Walnut", description: "Sourced from small-lot producers in Huila, this Colombian single origin delivers a rich, satisfying cup with velvety body and warm, lingering sweetness.", price: "$20", roast_level: "Medium", badge: "Fan Favorite", image_url: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/97c275c38_generated_7d8c3497.png" },
    { id: "3", name: "Elevation Espresso", origin: "Guatemala", tasting_notes: "Brown Sugar · Dried Cherry · Almond", description: "Grown at 1,800 meters in Huehuetenango, this espresso-forward offering rewards with complex dried fruit notes and a sweet, nutty finish.", price: "$19", roast_level: "Medium-Dark", badge: "", image_url: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/24a153b51_generated_486190bc.png" },
    { id: "4", name: "Pacific Ridge", origin: "Peru", tasting_notes: "Peach · Raw Sugar · Oolong", description: "A delicate Peruvian offering from the Cajamarca region. Clean, refined, and wonderfully nuanced — a perfect afternoon pour.", price: "$21", roast_level: "Light", badge: "Limited", image_url: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/b6e93fdf9_generated_9acd3bb9.png" },
    { id: "5", name: "Cold Brew Reserve", origin: "Honduras", tasting_notes: "Bittersweet Chocolate · Brown Butter · Fig", description: "Specially selected and slowly cold-extracted over 20 hours, this Honduran cold brew reserve is bold, smooth and dangerously drinkable.", price: "$18", roast_level: "Dark", badge: "", image_url: "https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/0a0efdfbe_generated_eaccb73c.png" },
  ];
  const allItems = offerings.length > 0 ? offerings : staticFallback;
  const items = activeFilter === "All" ? allItems : allItems.filter(i => i.roast_level === activeFilter);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-0" style={{ minHeight: "45vh" }}>
        <div className="absolute inset-0">
          <img src="https://media.base44.com/images/public/69ef9b0acbe2dd7785d82f2a/9ccf2568a_generated_f37a4ca1.png" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col justify-center"
          style={{ minHeight: "45vh" }}
        >
          <p className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-4">Chelvies Coffee Company</p>
          <h1
            className="text-6xl sm:text-8xl font-bold text-primary-foreground leading-[0.85] tracking-tighter mb-6"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Our
            <br />
            <span className="bg-gradient-to-r from-accent via-primary-foreground to-accent bg-clip-text text-transparent animate-gradient-x">Coffee</span>
            <br />
            Menu
          </h1>
          <p className="text-primary-foreground/60 text-sm max-w-lg leading-relaxed">
            Meticulously sourced, precisely roasted. Each offering is cupped, tracked, and published for your journey.
          </p>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <AnimatedElement>
        <section className="bg-muted border-b border-border/30 py-4 sticky top-0 z-20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto">
            <Filter className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            {roastFilters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>
      </AnimatedElement>

      {/* Grid */}
      <AnimatedElement>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
              {items.map((item, index) => (
                <AnimatedElement key={item.id || item.name} delay={index * 80}>
                  <div
                    className="group bg-card rounded-sm overflow-hidden cursor-pointer hover:-translate-y-3 hover:shadow-[0_24px_60px_-15px_hsl(var(--primary)/0.4)] transition-all duration-500"
                    onClick={() => setActiveItem(activeItem?.name === item.name ? null : item)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.badge ? (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-accent text-accent-foreground text-xs tracking-wider uppercase">{item.badge}</Badge>
                        </div>
                      ) : null}
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="border-card-foreground/20 text-card-foreground bg-card/80 text-xs">{item.roast_level}</Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-card-foreground text-xl font-bold tracking-tight leading-tight">{item.name}</h3>
                        <span className="text-accent font-bold text-lg">{item.price}</span>
                      </div>
                      <p className="text-card-foreground/50 text-xs tracking-widest uppercase mb-3">{item.origin}</p>
                      <p className="text-accent text-xs font-medium mb-4">{item.tasting_notes}</p>
                      <div className={`overflow-hidden transition-all duration-500 ${activeItem?.name === item.name ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                        <p className="text-card-foreground/70 text-sm leading-relaxed mb-4">{item.description}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest uppercase px-5 py-3 font-bold transition-all duration-300">
                          Add to Cart
                        </Button>
                        <span className="text-card-foreground/40 text-xs">
                          {activeItem?.name === item.name ? "▲ Less" : "▼ More"}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
            {items.length === 0 && !loading && (
              <div className="text-center py-20">
                <Coffee className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-sm">No offerings found for this roast level.</p>
              </div>
            )}
          </div>
        </section>
      </AnimatedElement>

      {/* Subscription CTA */}
      <AnimatedElement>
        <section className="relative overflow-hidden bg-primary py-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <p className="text-primary-foreground/50 text-xs tracking-widest uppercase mb-4">Never miss a drop</p>
            <h2
              className="text-5xl font-bold text-primary-foreground leading-[0.85] tracking-tighter mb-6"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              Get Fresh Coffee
              <br />
              <span className="text-accent">Delivered Weekly</span>
            </h2>
            <p className="text-primary-foreground/70 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
              Subscribe and receive our newest single origins and curated blends delivered fresh from the roastery, on your schedule, at a discount.
            </p>
            <a href="#">
              <Button className="relative overflow-hidden bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-sm tracking-widest uppercase font-bold hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-1">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                Explore Subscriptions <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>
      </AnimatedElement>
    </div>
  );
}