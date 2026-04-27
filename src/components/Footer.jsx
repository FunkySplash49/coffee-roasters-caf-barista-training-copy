import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coffee, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Coffee className="h-4 w-4 text-accent-foreground" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-[0.15em] uppercase text-primary-foreground block">Chelvies</span>
                <span className="text-xs tracking-[0.2em] uppercase text-primary-foreground/50 block">Coffee Company</span>
              </div>
            </div>
            <h3 className="text-primary-foreground font-bold text-sm tracking-wide uppercase mb-3">Join Our Pilgrimage</h3>
            <p className="text-primary-foreground/60 text-xs leading-relaxed mb-5">
              Sign up for our email list to elevate your coffee journey with exclusive access to new offerings, discount codes, expert brewing insights, and more.
            </p>
            {submitted ? (
              <p className="text-accent font-bold text-xs tracking-widest uppercase">Welcome aboard!</p>
            ) : (
              <div className="flex gap-0">
                <Input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-none border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 flex-1 text-xs py-4"
                />
                <Button
                  onClick={() => { if (email) setSubmitted(true); }}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-none px-4 text-xs tracking-widest uppercase font-bold transition-all duration-300"
                >
                  GO
                </Button>
              </div>
            )}
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-primary-foreground font-bold text-xs tracking-widest uppercase mb-5">Shop</h3>
            <div className="flex flex-col gap-3">
              <Link to="/Menu" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Coffee</Link>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Cold Brew</a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Subscriptions</a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Box Sets</a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Merch</a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Gift Cards</a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-primary-foreground font-bold text-xs tracking-widest uppercase mb-5">Support</h3>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Help Center</a>
              <a href="mailto:hello@chelviescoffee.com" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Email Us</a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">FAQ</a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Brew Guides</a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Classes</a>
              <p className="text-primary-foreground/40 text-xs pt-2">
                Mon – Fri<br />
                9:00AM – 5:00PM
              </p>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-primary-foreground font-bold text-xs tracking-widest uppercase mb-5">About</h3>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Our Story</a>
              <Link to="/Locations" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Locations</Link>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Wholesale</a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Sustainability</a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Careers</a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-xs tracking-wide transition-colors duration-200">Private Events</a>
            </div>
          </div>
        </div>

        {/* Social + bottom bar */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-accent transition-colors duration-200">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-accent transition-colors duration-200">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-accent transition-colors duration-200">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-accent transition-colors duration-200">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
            <p className="text-primary-foreground/30 text-xs tracking-widest text-center">Never Settle for Good Enough.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground/70 text-xs transition-colors duration-200">Terms of Use</a>
              <span className="text-primary-foreground/20">·</span>
              <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground/70 text-xs transition-colors duration-200">Privacy Policy</a>
              <span className="text-primary-foreground/20">·</span>
              <p className="text-primary-foreground/30 text-xs">© Chelvies Coffee Company</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}