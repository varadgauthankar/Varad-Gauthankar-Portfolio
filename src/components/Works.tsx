import { motion, AnimatePresence } from "motion/react";
import { Play, ExternalLink, X } from "lucide-react";
import { useState } from "react";

const videos = [
  { 
    id: 1, 
    type: "horizontal", 
    title: "MAHABALESHWAR | Cinematic Video", 
    thumbnail: "https://img.youtube.com/vi/iO94et2kBIg/maxresdefault.jpg", 
    videoUrl: "https://www.youtube.com/watch?v=iO94et2kBIg",
    duration: "2:45" 
  },
  { 
    id: 2, 
    type: "horizontal", 
    title: "Urban Rhythms", 
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800", 
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-busy-city-at-night-34131-large.mp4",
    duration: "1:30" 
  },
  { 
    id: 3, 
    type: "vertical", 
    title: "Social Story #1", 
    thumbnail: "https://images.unsplash.com/photo-1511317551221-df996027b461?auto=format&fit=crop&q=80&w=400", 
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-in-the-wind-34538-large.mp4",
    duration: "0:15" 
  },
  { 
    id: 4, 
    type: "vertical", 
    title: "Social Story #2", 
    thumbnail: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400", 
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-field-of-flowers-34522-large.mp4",
    duration: "0:20" 
  },
];

const designs = [
  { title: "Brand Identity X", thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600", link: "#" },
  { title: "Minimal UI Kit", thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600", link: "#" },
  { title: "Organic Packaging", thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600", link: "#" },
  { title: "Editorial Layout", thumbnail: "https://images.unsplash.com/photo-1509343256512-d77a5ea92851?auto=format&fit=crop&q=80&w=600", link: "#" },
];

// Video Card component for hover-to-play
function VideoCard({ video, onClick }: { video: typeof videos[0], onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const isYoutube = video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be');

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative ${video.type === 'horizontal' ? 'aspect-[16/9]' : 'aspect-[9/16]'} bg-brand-stone-900 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl cursor-pointer`}
    >
      <img 
        src={video.thumbnail} 
        alt={video.title} 
        referrerPolicy="no-referrer" 
        className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered && !isYoutube ? 'opacity-0' : 'opacity-60 group-hover:opacity-80'}`} 
      />
      
      {isHovered && !isYoutube && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video.videoUrl} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 ${isHovered && !isYoutube ? 'opacity-0 scale-90' : 'opacity-100 scale-100 group-hover:scale-110'}`}>
          <Play className="text-brand-yellow w-5 h-5 md:w-6 md:h-6 fill-current" />
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 pointer-events-none transition-transform duration-300">
        <p className={`font-serif italic text-white leading-tight ${video.type === 'horizontal' ? 'text-lg md:text-xl' : 'text-sm md:text-lg'}`}>
          {video.title}
        </p>
      </div>
    </motion.div>
  );
}

export default function Works() {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
  };

  return (
    <section id="works" className="px-6 md:px-12 py-20 md:py-32 bg-brand-cream max-w-7xl mx-auto">
      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors"
                aria-label="Close video"
              >
                <X className="w-6 h-6" />
              </button>
              
              {selectedVideo.videoUrl.includes('youtube.com') || selectedVideo.videoUrl.includes('youtu.be') ? (
                <iframe
                  className="w-full h-full"
                  src={getYoutubeEmbedUrl(selectedVideo.videoUrl) || ''}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  controls
                  autoPlay
                  className="w-full h-full"
                  key={selectedVideo.id}
                >
                  <source src={selectedVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 01: VIDEOS */}
      <div className="mb-20 md:mb-24">
        <div className="flex justify-between items-end mb-8 md:mb-12 border-b border-brand-stone-200 pb-6 md:pb-8">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-brand-amber font-black mb-3 md:mb-4">02.1 / work / visuals</h2>
            <h3 className="text-3xl md:text-5xl font-serif">Film & Visuals</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Column: 2 Landscape Videos Stacked (16:9) */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6 md:gap-8">
            {videos.filter(v => v.type === "horizontal").slice(0, 2).map((video) => (
              <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
            ))}
          </div>

          {/* Right Column: 2 Vertical Videos Side-by-Side (9:16) */}
          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6">
            {videos.filter(v => v.type === "vertical").slice(0, 2).map((video) => (
              <VideoCard key={video.id} video={video} onClick={() => setSelectedVideo(video)} />
            ))}
          </div>
        </div>
      </div>

      {/* LINE BREAK */}
      <div className="w-full h-px bg-brand-stone-200 mb-20 md:mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-cream px-4">
          <div className="w-2 h-2 rounded-full bg-brand-yellow" />
        </div>
      </div>

      {/* SECTION 02: DESIGN */}
      <div className="mb-20 md:mb-24">
        <div className="flex justify-between items-end mb-8 md:mb-12 border-b border-brand-stone-200 pb-6 md:pb-8">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-brand-amber font-black mb-3 md:mb-4">02.2 / work / design</h2>
            <h3 className="text-3xl md:text-5xl font-serif">Visual Systems</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {designs.slice(0, 2).map((design, idx) => (
            <motion.a
              key={idx}
              href={design.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="group flex flex-col gap-4 md:gap-6"
            >
              <div className="aspect-[16/10] bg-brand-stone-200 rounded-2xl md:rounded-3xl overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-brand-yellow mix-blend-multiply opacity-10 group-hover:opacity-30 transition-opacity" />
                <img src={design.thumbnail} alt={design.title} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg group-hover:bg-brand-yellow transition-colors">
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-brand-stone-900" />
                  </div>
                </div>
              </div>
              <div className="pl-1 md:pl-2">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand-amber mb-1 md:mb-2">Project 0{idx + 1}</p>
                <h4 className="text-2xl md:text-3xl font-serif italic">{design.title}</h4>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <footer className="mt-16 pt-10 border-t border-brand-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-[10px] text-brand-stone-400 font-black uppercase tracking-[0.3em]">© 2026 Varad Gauthankar</span>
        <div className="flex gap-4">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-yellow shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-stone-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-stone-200"></div>
        </div>
      </footer>
    </section>
  );
}
