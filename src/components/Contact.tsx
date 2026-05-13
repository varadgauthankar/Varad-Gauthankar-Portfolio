import { motion } from "motion/react";
import { Mail, Instagram, Linkedin, ArrowRight, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-12 py-32 bg-brand-stone-900 text-brand-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 relative z-10">
        <div>
           <h2 className="text-xs uppercase tracking-[0.4em] font-black text-brand-yellow mb-6 md:mb-10 flex items-center gap-4">
            <span className="w-8 h-px bg-brand-yellow" /> 03 / Contact
          </h2>
          <h2 className="text-4xl sm:text-5xl md:text-8xl mb-8 md:mb-12 leading-[0.9] md:leading-[0.8] font-serif uppercase break-words">
            Let's build <br />
            <span className="text-brand-yellow italic lowercase font-normal">something</span> <br />
            beautiful.
          </h2>
          <p className="text-brand-stone-400 text-lg md:text-xl max-w-md mb-12 md:mb-16 font-sans leading-relaxed">
            I am a visual creator specializing in professional video shoots, cinematic video editing, and modern digital design.
          </p>
          
          <div className="flex flex-col gap-6 md:gap-8">
            <a href="mailto:hello@varad.com" className="flex items-center gap-4 md:gap-6 group w-fit">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-brand-yellow/20 flex items-center justify-center group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-all duration-500 shrink-0">
                <Mail className="w-5 h-5 md:w-6 md:h-6 group-hover:text-brand-stone-900 transition-colors" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-stone-500 mb-1">Email me</span>
                <span className="text-xl md:text-2xl font-serif italic border-b border-transparent group-hover:border-brand-yellow transition-all truncate">hello@varad.com</span>
              </div>
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-12 md:pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-yellow mb-6">Socials</p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: ExternalLink, label: "Behance" },
                ].map((social, idx) => (
                  <a key={idx} href="#" className="group flex items-center gap-3 text-brand-stone-400 hover:text-brand-yellow transition-colors">
                    <social.icon className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-widest font-black">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-end">
              <p className="text-xs text-brand-stone-500 italic max-w-[180px]">"Design is not just what it looks like and feels like. Design is how it works."</p>
            </div>
          </div>

          <div className="mt-16 md:mt-24">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs uppercase tracking-widest font-black flex items-center gap-3 group hover:text-brand-yellow transition-colors"
            >
              Back to Start <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Background large text accent */}
      <div className="absolute -bottom-24 -right-12 text-[30vw] font-serif font-black text-white/[0.02] pointer-events-none select-none leading-none uppercase">
        Varad
      </div>
    </section>
  );
}
