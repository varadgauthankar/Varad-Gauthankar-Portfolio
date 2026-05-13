import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Works", href: "#works" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Frosted effect toggle
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide on scroll logic for mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      if (latest > lastScrollY.current && latest > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      setHidden(false);
    }
    
    lastScrollY.current = latest;
  });

  return (
    <>
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 md:py-6 transition-all duration-300 ${
          isScrolled 
            ? "bg-brand-cream/70 backdrop-blur-xl border-b border-brand-stone-100 shadow-sm" 
            : "bg-transparent py-6 md:py-10"
        }`}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-brand-yellow rounded-full" />
          <span className="text-xl md:text-2xl font-serif font-black tracking-tight uppercase">Varad</span>
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.25em] font-black text-brand-stone-500">
          {navItems.map((item) => (
            <li key={item.name} className="hover:text-brand-stone-900 cursor-pointer transition-colors relative group py-1">
              <a href={item.href}>{item.name}</a>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-yellow transition-all group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-brand-stone-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-cream md:hidden flex flex-col justify-center items-center gap-12"
          >
            <ul className="flex flex-col gap-8 text-center">
              {navItems.map((item, idx) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <a 
                    href={item.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-serif italic text-brand-stone-900 hover:text-brand-amber transition-colors"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            
            <div className="flex gap-6 mt-12">
               <div className="w-3 h-3 rounded-full bg-brand-yellow" />
               <div className="w-3 h-3 rounded-full bg-brand-stone-200" />
               <div className="w-3 h-3 rounded-full bg-brand-amber" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
