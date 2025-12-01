import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Smartphone, BrainCircuit, ShieldCheck, ScanLine } from 'lucide-react';

const Ecosystem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate drawing height for the connecting line
  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      id: 1,
      title: "Site Capture (B2B)",
      desc: "Contractors simply take a photo or voice note. No complex forms. We capture the raw site reality instantly.",
      // Worker with tablet/phone
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop", 
      icon: Smartphone,
      highlight: "Raw Input"
    },
    {
      id: 2,
      title: "AI Analysis Engine",
      desc: "Our vision model scans the photo for progress (e.g., 'Wiring installed'). It cross-references the BOQ and flags delays.",
      // Tablet showing analysis/blueprints
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop", 
      icon: BrainCircuit,
      highlight: "Processing..."
    },
    {
      id: 3,
      title: "Trusted Marketplace (B2C)",
      desc: "Verified performance data (not fake stars) powers the marketplace. Homeowners hire contractors with proven track records.",
      // Modern Home
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop", 
      icon: ShieldCheck,
      highlight: "Verified Hiring"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-slate-50 relative overflow-hidden" ref={containerRef}>
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-brand-100 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <span className="text-brand-600 font-bold tracking-widest text-xs uppercase border border-brand-200 px-3 py-1 rounded-full bg-brand-50">The Ecosystem</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-6 mb-6 text-slate-900">
            From Site Photos to <span className="text-brand-600">Verified Trust</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            We bridge the gap between messy construction sites and digital trust.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden md:block absolute top-12 left-[16.5%] right-[16.5%] h-1 bg-slate-200 z-0 rounded-full">
            <motion.div 
              style={{ width: lineProgress }}
              className="h-full bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="relative z-10 group"
              >
                {/* Step Marker */}
                <div className="flex justify-center mb-8 relative">
                   <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 shadow-lg flex items-center justify-center relative z-10 group-hover:border-brand-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all duration-500">
                      <step.icon className="w-10 h-10 text-slate-400 group-hover:text-brand-500 transition-colors duration-500" />
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold text-sm border-4 border-slate-50 shadow-md">
                        {step.id}
                      </div>
                   </div>
                </div>

                {/* Card */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-brand-500/30 transition-all duration-300 hover:shadow-xl relative shadow-sm">
                  <div className="h-48 overflow-hidden relative">
                     <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                     <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                     
                     {/* Special Scanning Effect for Step 2 */}
                     {index === 1 && (
                        <div className="absolute inset-0 pointer-events-none">
                            <motion.div 
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                className="absolute left-0 right-0 h-[2px] bg-brand-400 shadow-[0_0_15px_rgba(52,211,153,1)]"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 text-brand-600 text-[10px] font-mono px-2 py-1 rounded border border-brand-200 shadow-sm flex items-center gap-1 font-bold">
                                <ScanLine className="w-3 h-3" /> Analyzing
                            </div>
                        </div>
                     )}

                     {/* Highlight Tag */}
                     <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md border border-white/40 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {step.highlight}
                     </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">{step.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Mobile Arrow */}
                {index < 2 && (
                  <div className="md:hidden flex justify-center py-6">
                    <ArrowRight className="text-slate-300 w-6 h-6 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;