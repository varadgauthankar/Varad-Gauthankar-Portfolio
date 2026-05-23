import { motion, AnimatePresence } from "motion/react";
import { X, Printer, Copy, Check, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-stone-900/80 backdrop-blur-md overflow-y-auto p-4 md:p-6 no-print print-resume-visible"
        >
          {/* Scrollable Container */}
          <div className="relative w-full max-w-4xl my-auto bg-brand-cream/95 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] border border-brand-stone-200">
            
            {/* Modal Heading Actions Bar */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-brand-stone-200/60 no-print">
              <span className="text-xs uppercase tracking-widest font-black text-brand-stone-500">Interactive Resume Viewer</span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-3 py-1.5 h-9 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-stone-900 font-extrabold uppercase tracking-wider text-[10px] rounded-lg transition-all"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>

                <button
                  onClick={() => copyToClipboard("gvarad1601@gmail.com", "email")}
                  className="flex items-center gap-1.5 px-3 py-1.5 h-9 bg-white hover:bg-brand-stone-100 text-brand-stone-700 font-bold text-[10px] uppercase tracking-wider rounded-lg border border-brand-stone-200 transition-all"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Email
                </button>

                <button
                  onClick={() => copyToClipboard("+918888175501", "phone")}
                  className="flex items-center gap-1.5 px-3 py-1.5 h-9 bg-white hover:bg-brand-stone-100 text-brand-stone-700 font-bold text-[10px] uppercase tracking-wider rounded-lg border border-brand-stone-200 transition-all"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Phone
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-brand-stone-200 bg-white hover:bg-brand-stone-100 text-brand-stone-600 transition-all ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Editable/Printable Area */}
            <div className="overflow-y-auto px-6 py-10 md:px-12 md:py-14 flex-1">
              <div 
                id="resume-print-area" 
                className="print-resume-container mx-auto max-w-[800px] bg-[#fdfcf7] text-brand-stone-900 p-8 sm:p-12 md:p-14 rounded-2xl border border-brand-yellow/30 shadow-inner select-text"
              >
                {/* Header Grid Section */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-brand-stone-200/50 pb-8 mb-8">
                  <div>
                    {/* Name Styling Matching the PDF */}
                    <div className="leading-none mb-2">
                      <h1 className="text-4xl md:text-5xl font-sans font-medium tracking-tight text-brand-stone-900 lowercase leading-tight">
                        varad
                      </h1>
                      <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-brand-stone-900 uppercase leading-none">
                        Gauthankar
                      </h1>
                    </div>
                    {/* Role Title */}
                    <p className="text-brand-stone-500 font-sans text-xs md:text-sm tracking-wide max-w-md leading-relaxed mt-4">
                      Creative videographer and designer passionate about visual storytelling, skilled in video production, editing, and graphic design.
                    </p>
                  </div>

                  {/* Metadata Sidebar Contact Box */}
                  <div className="flex flex-col gap-2.5 text-right items-end text-xs text-brand-stone-500 bg-brand-cream/40 p-4 rounded-xl border border-brand-stone-100 min-w-[200px]">
                    <div className="flex items-center gap-2 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-brand-amber" />
                      <span>16 Jan 2001 (24y)</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <Phone className="w-3.5 h-3.5 text-brand-amber" />
                      <a href="tel:+918888175501" className="hover:text-brand-stone-950 font-bold">+91 88881 75501</a>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <Mail className="w-3.5 h-3.5 text-brand-amber" />
                      <a href="mailto:gvarad1601@gmail.com" className="hover:text-brand-stone-950 font-bold">gvarad1601@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-brand-amber" />
                      <span>Bicholim, Goa</span>
                    </div>
                  </div>
                </div>

                {/* Main Yellow-Bordered Bento Container */}
                <div className="print-border border-2 border-brand-yellow/60 rounded-3xl p-6 sm:p-8 flex flex-col gap-8 bg-[#fdfcf5]">
                  
                  {/* EXPERIENCE SECTION */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-sans font-black tracking-tight text-brand-stone-900 mb-6 border-b border-brand-yellow/30 pb-2">
                      Experience
                    </h2>
                    
                    <div className="flex flex-col gap-6">
                      <div>
                        {/* Item 1 */}
                        <div className="flex items-start gap-2.5 mb-1.5">
                          <span className="text-brand-yellow font-black text-lg sm:text-xl leading-none">#</span>
                          <h3 className="font-sans font-black text-sm sm:text-base text-brand-stone-900">
                            Freelance Visual Artist & Designer
                          </h3>
                        </div>
                        <div className="md:ml-5 flex flex-wrap gap-2 text-xs text-brand-stone-500 mb-3 font-semibold">
                          <span>Self-Employed – Freelance</span>
                          <span>•</span>
                          <span className="text-brand-amber">2024 – Present</span>
                        </div>
                        <p className="md:ml-5 text-xs sm:text-sm text-brand-stone-500 leading-relaxed max-w-2xl font-light">
                          Executed a wide range of design, video, photography, and brand projects for businesses and creative clients, creating engaging visual content.
                        </p>
                      </div>

                      <div>
                        {/* Item 2 */}
                        <div className="flex items-start gap-2.5 mb-1.5">
                          <span className="text-brand-yellow font-black text-lg sm:text-xl leading-none">#</span>
                          <h3 className="font-sans font-black text-sm sm:text-base text-brand-stone-900">
                            Videographer & Editor
                          </h3>
                        </div>
                        <div className="md:ml-5 flex flex-wrap gap-2 text-xs text-brand-stone-500 mb-3 font-semibold">
                          <span>Soulscape Media – Part Time</span>
                          <span>•</span>
                          <span className="text-brand-amber">Aug 2023 – Oct 2024</span>
                        </div>
                        <p className="md:ml-5 text-xs sm:text-sm text-brand-stone-500 leading-relaxed max-w-2xl font-light">
                          Filmed and edited promotional and social media content, collaborating with creative teams to craft engaging visual stories along with color grading, sound, and final delivery.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* EDUCATION SECTION */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-sans font-black tracking-tight text-brand-stone-900 mb-6 border-b border-brand-yellow/30 pb-2">
                      Education
                    </h2>
                    
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="flex items-start gap-2.5 mb-1">
                          <span className="text-brand-yellow font-black text-lg sm:text-xl leading-none">#</span>
                          <h3 className="font-sans font-black text-sm sm:text-base text-brand-stone-900">
                            Bachelor of Fine Art – Applied Art
                          </h3>
                        </div>
                        <div className="md:ml-5 flex flex-wrap justify-between items-center text-xs text-brand-stone-500 font-semibold gap-1">
                          <span>Goa College of Art, Altino, Panjim - Goa</span>
                          <span className="text-brand-amber">July 2023 – May 2027</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-2.5 mb-1">
                          <span className="text-brand-yellow font-black text-lg sm:text-xl leading-none">#</span>
                          <h3 className="font-sans font-black text-sm sm:text-base text-brand-stone-900">
                            Master of Computer Application (Distance Learning)
                          </h3>
                        </div>
                        <div className="md:ml-5 flex flex-wrap justify-between items-center text-xs text-brand-stone-500 font-semibold gap-1">
                          <span>Manipal University, Jaipur</span>
                          <span className="text-brand-amber">June 2023 – August 2025</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-2.5 mb-1">
                          <span className="text-brand-yellow font-black text-lg sm:text-xl leading-none">#</span>
                          <h3 className="font-sans font-black text-sm sm:text-base text-brand-stone-900">
                            Bachelor of Science – Computer Science
                          </h3>
                        </div>
                        <div className="md:ml-5 flex flex-wrap justify-between items-center text-xs text-brand-stone-500 font-semibold gap-1">
                          <span>Govt. College of Arts, Science & Commerce, Sanquelim - Goa</span>
                          <span className="text-brand-amber">2019 – 2022</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TECHNICAL SKILLS SECTION */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-sans font-black tracking-tight text-brand-stone-900 mb-6 border-b border-brand-yellow/30 pb-2">
                      Technical Skills
                    </h2>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-2.5">
                        <span className="text-brand-yellow font-black text-lg sm:text-xl leading-none">#</span>
                        <div className="font-sans text-xs sm:text-sm text-brand-stone-600 leading-relaxed font-light">
                          <strong className="font-black text-brand-stone-900">Creative Tools:</strong> Adobe Illustrator, Adobe Photoshop, Adobe After Effects, Figma, DaVinci Resolve
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <span className="text-brand-yellow font-black text-lg sm:text-xl leading-none">#</span>
                        <div className="font-sans text-xs sm:text-sm text-brand-stone-600 leading-relaxed font-light">
                          <strong className="font-black text-brand-stone-900">Other Skills:</strong> Video editing, photography, UI design, motion graphics, digital content creation
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
