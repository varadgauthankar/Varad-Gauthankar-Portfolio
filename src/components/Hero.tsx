import { motion } from "motion/react";

export default function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 py-24 md:py-32 overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          key="hero-video-v3"
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80"
          className="w-full h-full object-cover"
        >
          <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlays for content readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-black text-brand-yellow mb-8 md:mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-brand-yellow" /> 01 / About
            </h2>
            
            <h1 className="text-6xl sm:text-8xl lg:text-9xl xl:text-[11rem] font-serif leading-[0.8] mb-12 tracking-tighter text-white">
              Varad <br />
              <span className="italic text-brand-yellow block mt-4">Gauthankar</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-brand-stone-200 leading-relaxed font-sans mb-12 max-w-2xl font-light">
              I am a visual creator specializing in professional video shoots, cinematic video editing, and modern digital design. My work bridges the gap between raw footage and polished storytelling.
            </p>

            <div className="flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-2 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white">
              <span>Video Editor</span>
              <span className="text-brand-yellow">•</span>
              <span>Visual Artist</span>
              <span className="text-brand-yellow">•</span>
              <span>Designer</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
