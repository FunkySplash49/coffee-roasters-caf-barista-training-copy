import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, ShoppingBag, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  // When scrolled or not on home page, header becomes light.
  // When at top of home page (over dark hero), header is transparent/dark.
  const headerBgClass = scrolled || !isHome
    ? "bg-background/95 backdrop-blur-md border-b border-border/30 shadow-sm"
    : "bg-transparent";

  const textClass = scrolled || !isHome
    ? "text-foreground hover:text-accent"
    : "text-primary-foreground hover:text-primary-foreground/70";

  const mutedTextClass = scrolled || !isHome
    ? "text-muted-foreground"
    : "text-primary-foreground/60";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBgClass}`}>
      {/* Top Ticker Bar matching screenshot style */}
      <div className="bg-foreground text-background flex items-center justify-between px-6 py-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold overflow-hidden whitespace-nowrap">
        <div className="hidden sm:block flex-1">
          <span className="opacity-70">Now Serving</span> <span className="ml-2">The Heartbreakers</span>
        </div>
        <div className="flex-1 text-center animate-[marquee_20s_linear_infinite] sm:animate-none">
          Free Shipping On Orders $40+ <span className="mx-2 opacity-50">·</span> New Releases Every Week
        </div>
        <div className="hidden sm:flex flex-1 justify-end items-center gap-4">
          <span className="cursor-pointer hover:text-accent transition-colors">Login</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-3 group relative z-10 w-1/4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${scrolled || !isHome ? 'bg-foreground' : 'bg-primary-foreground'}`}>
              <Coffee className={`h-5 w-5 ${scrolled || !isHome ? 'text-background' : 'text-primary'}`} />
            </div>
            <div>
              <span
                className={`font-black text-xl sm:text-2xl tracking-[0.1em] uppercase block leading-none transition-colors duration-300 ${scrolled || !isHome ? "text-foreground" : "text-primary-foreground"}`}
                style={{ fontFamily: "'Cinzel', 'Montserrat', serif" }}
              >
                Cuppa
              </span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden sm:flex items-center justify-center gap-8 w-2/4">
            {[
              { label: "Coffee", to: "/Menu" },
              { label: "Subscriptions", to: null },
              { label: "Locations", to: "/Locations" },
              { label: "Our Story", to: null },
              { label: "Wholesale", to: null },
            ].map(({ label, to }) =>
              to ? (
                <Link
                  key={label}
                  to={to}
                  className={`text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-current hover:after:w-full after:transition-all after:duration-300 ${textClass}`}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href="#"
                  className={`text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-current hover:after:w-full after:transition-all after:duration-300 ${textClass}`}
                >
                  {label}
                </a>
              )
            )}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-5 w-1/4 relative z-10">
            <button className={`hidden sm:flex items-center justify-center transition-transform hover:scale-110 duration-300 ${textClass}`}>
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button className={`hidden sm:flex items-center justify-center text-xs tracking-widest uppercase font-bold transition-colors duration-300 ${textClass}`}>
              Login
            </button>
            <button className={`flex items-center justify-center transition-transform hover:scale-110 duration-300 relative ${textClass}`}>
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              <span className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${scrolled || !isHome ? 'bg-foreground text-background' : 'bg-primary-foreground text-primary'}`}>
                0
              </span>
            </button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="sm:hidden">
                <Button variant="ghost" size="icon" className={`h-10 w-10 transition-colors duration-300 ${textClass}`}>
                  <Menu className="h-6 w-6" strokeWidth={1.5} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background w-full sm:w-[400px] border-l border-border p-8">
                <div className="flex flex-col h-full mt-12">
                  <nav className="flex flex-col gap-6">
                    {[
                      { label: "Home", to: "/" },
                      { label: "Shop Coffee", to: "/Menu" },
                      { label: "Subscriptions", to: null },
                      { label: "Locations", to: "/Locations" },
                      { label: "Our Story", to: null },
                      { label: "Wholesale", to: null },
                    ].map(({ label, to }, i) =>
                      to ? (
                        <Link
                          key={label}
                          to={to}
                          className="text-foreground hover:text-accent text-2xl tracking-widest uppercase font-black transition-colors duration-300 animate-in slide-in-from-right-8"
                          style={{ animationDelay: `${i * 100}ms` }}
                        >
                          {label}
                        </Link>
                      ) : (
                        <a
                          key={label}
                          href="#"
                          className="text-foreground hover:text-accent text-2xl tracking-widest uppercase font-black transition-colors duration-300 animate-in slide-in-from-right-8"
                          style={{ animationDelay: `${i * 100}ms` }}
                        >
                          {label}
                        </a>
                      )
                    )}
                  </nav>
                  <div className="mt-auto pt-12 border-t border-border">
                    <button className="w-full bg-foreground text-background py-4 text-xs tracking-[0.2em] uppercase font-bold hover:bg-foreground/90 transition-colors">
                      Login / Register
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}