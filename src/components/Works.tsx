import { motion, AnimatePresence } from "motion/react";
import { Play, ExternalLink, X } from "lucide-react";
import { useState, useEffect } from "react";

// Robust component to handle smooth progressive loading, lazy-loading, and chain fallback support
function OptimizedImage({ src, alt, className = "", fallbacks = [], isGrid = false }: {
  src: string;
  alt: string;
  className?: string;
  fallbacks?: string[];
  isGrid?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setFallbackIndex(0);
  }, [src]);

  return (
    <div className="relative w-full h-full bg-brand-stone-100 overflow-hidden flex items-center justify-center">
      {/* High precision shimmering skeleton loader with mini-spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-neutral-300 border-t-brand-amber animate-spin" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading={isGrid ? "lazy" : "eager"}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (fallbackIndex < fallbacks.length) {
            const nextFallback = fallbacks[fallbackIndex];
            setFallbackIndex(prev => prev + 1);
            setCurrentSrc(nextFallback);
          }
        }}
        className={`${className} transition-opacity duration-500 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

const videos = [
  { 
    id: 1, 
    type: "horizontal", 
    title: "Mural for India Climate Week 2025", 
    thumbnail: "https://img.youtube.com/vi/62WtD1_a2cE/maxresdefault.jpg", 
    videoUrl: "https://www.youtube.com/watch?v=62WtD1_a2cE",
    duration: "3:12" 
  },
  { 
    id: 2, 
    type: "horizontal", 
    title: "Janmastami 2025 at Goa college of art", 
    thumbnail: "https://img.youtube.com/vi/s9KbQjCsz78/maxresdefault.jpg", 
    videoUrl: "https://youtu.be/s9KbQjCsz78",
    duration: "2:45" 
  },
  { 
    id: 3, 
    type: "vertical", 
    title: "glimpses of sport day.", 
    thumbnail: "https://img.youtube.com/vi/s2LIrTfzxKM/maxresdefault.jpg", 
    videoUrl: "https://www.youtube.com/shorts/s2LIrTfzxKM",
    duration: "0:30" 
  },
  // { 
  //   id: 4, 
  //   type: "vertical", 
  //   title: "Social Story #2", 
  //   thumbnail: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400", 
  //   videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-field-of-flowers-34522-large.mp4",
  //   duration: "0:20" 
  // },
];

const designs = [
  { 
    title: "PRYSM - Wired to Wonder", 
    thumbnail: "/photos/thumbnails/photo_prysm.jpg", 
    fullres: "/photos/photo_prysm.jpg",
    link: "https://www.behance.net/gallery/249794309/PRYSM-Wired-to-Wonder" 
  }
];

const fallbacks: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
  2: "https://images.unsplash.com/photo-1565192647048-f997ded87958?auto=format&fit=crop&q=80&w=800",
  3: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
  4: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
  5: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800",
  6: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800",
  7: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
  8: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
};

const photos = [
  { id: 1, title: "", thumbnail: "/photos/thumbnails/photo_1.jpeg", fullres: "/photos/photo_1.jpeg" },
  { id: 2, title: "", thumbnail: "/photos/thumbnails/photo_2.jpeg", fullres: "/photos/photo_2.jpeg" },
  { id: 3, title: "", thumbnail: "/photos/thumbnails/photo_3.jpeg", fullres: "/photos/photo_3.jpeg" },
  { id: 4, title: "", thumbnail: "/photos/thumbnails/photo_4.jpeg", fullres: "/photos/photo_4.jpeg" },
  { id: 5, title: "", thumbnail: "/photos/thumbnails/photo_5.jpeg", fullres: "/photos/photo_5.jpeg" },
  { id: 6, title: "", thumbnail: "/photos/thumbnails/photo_6.jpeg", fullres: "/photos/photo_6.jpeg" },
  { id: 7, title: "", thumbnail: "/photos/thumbnails/photo_7.jpeg", fullres: "/photos/photo_7.jpeg" },
  { id: 8, title: "", thumbnail: "/photos/thumbnails/photo_8.jpeg", fullres: "/photos/photo_8.jpeg" },
];

// Video Card component for hover-to-play
function VideoCard({ video, onClick }: { video: typeof videos[0], onClick: () => void, key?: any }) {
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
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
  };

  return (
    <section id="works" className="px-6 md:px-12 py-20 md:py-32 bg-brand-cream max-w-7xl mx-auto">
      {/* Video/Photo Modal */}
      <AnimatePresence>
        {(selectedVideo || selectedPhoto) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-sm"
            onClick={() => { setSelectedVideo(null); setSelectedPhoto(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-5xl ${selectedVideo ? 'aspect-video' : 'max-h-full'} bg-black rounded-xl overflow-hidden shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => { setSelectedVideo(null); setSelectedPhoto(null); }}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              
              {selectedVideo ? (
                <>
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
                </>
              ) : selectedPhoto && (
                <OptimizedImage 
                  src={selectedPhoto.fullres} 
                  alt={selectedPhoto.title || "Zoomed Photo"} 
                  fallbacks={[selectedPhoto.thumbnail, fallbacks[selectedPhoto.id]]}
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 01: VIDEOS */}
      <div className="mb-20 md:mb-24">
        <div className="flex justify-between items-end mb-8 md:mb-12">
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

      {/* SECTION 01.5: PHOTOGRAPHY */}
      <div className="mb-20 md:mb-24">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-brand-amber font-black mb-3 md:mb-4">02.2 / work / photography</h2>
            <h3 className="text-3xl md:text-5xl font-serif">Stills & Moments</h3>
          </div>
        </div>
       

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 0.98 }}
              className="relative aspect-[4/3] group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl bg-brand-stone-100 shadow-md"
              onClick={() => setSelectedPhoto(photo)}
            >
              <OptimizedImage 
                src={photo.thumbnail}
                alt={photo.title || `Stills and Moments ${photo.id}`} 
                fallbacks={[fallbacks[photo.id]]}
                isGrid={true}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                <div className="text-center">
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand-yellow mb-2">View Shot</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SECTION 02: DESIGN */}
      <div className="mb-20 md:mb-24">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-brand-amber font-black mb-3 md:mb-4">02.3 / work / design</h2>
            <h3 className="text-3xl md:text-5xl font-serif">Design & Identities</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {designs.map((design, idx) => (
            <motion.a
              key={idx}
              href={design.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="group flex flex-col gap-4 md:gap-6"
            >
              <div className="aspect-[16/10] bg-brand-stone-200 rounded-2xl md:rounded-3xl overflow-hidden relative shadow-lg">
                <OptimizedImage 
                  src={design.thumbnail} 
                  alt={design.title} 
                  fallbacks={[design.fullres]} 
                  isGrid={true}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" 
                />
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

    </section>
  );
}
