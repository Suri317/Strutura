import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, Map, Box, MousePointer2, Scan, Compass } from 'lucide-react';
import { UserType } from '../types';

interface ThreeDShowcaseProps {
  activeView: UserType;
}

const ThreeDShowcase: React.FC<ThreeDShowcaseProps> = ({ activeView }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 45, 60]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const layerSpacing = useTransform(scrollYProgress, [0.2, 0.6], [0, 80]); // Explodes layers apart

  const isHomeowner = activeView === UserType.HOMEOWNER;

  const content = isHomeowner ? {
    badge: "Immersive Walkthroughs",
    title: "Don't Guess.",
    highlight: "Experience It.",
    desc: "2D plans are confusing. Walk through your future home on a digital twin before a single brick is laid. See sunlight, views, and finishes in real-time.",
    features: [
      { icon: Compass, label: "Sun Path Analysis" },
      { icon: Box, label: "1:1 Scale Walkthrough" },
      { icon: Map, label: "Contextual Map View" }
    ]
  } : {
    badge: "3D Site Command",
    title: "Win The Bid.",
    highlight: "Show The Vision.",
    desc: "Impress clients by placing their dream project directly onto the site map. Detect clashes, plan logistics, and show progress on a live 3D model.",
    features: [
      { icon: Scan, label: "Clash Detection" },
      { icon: Layers, label: "Structural Exploded View" },
      { icon: Map, label: "Logistics Planning" }
    ]
  };

  return (
    <section ref={containerRef} className="bg-slate-900 py-32 relative overflow-hidden text-white perspective-1000">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Text Side */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Box className="w-3 h-3" />
              {content.badge}
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              {content.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-400">
                {content.highlight}
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {content.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {content.features.map((feat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center lg:items-start gap-3 hover:bg-white/10 transition-colors">
                  <feat.icon className="w-6 h-6 text-brand-400" />
                  <span className="font-semibold text-sm">{feat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Visual Side */}
          <div className="flex-1 w-full flex justify-center perspective-[1200px] h-[500px] items-center">
            <motion.div 
              style={{ rotateX, scale }}
              className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]"
            >
              {/* Layer 1: Terrain / Map */}
              <motion.div 
                style={{ translateY: 0 }} // Base layer stays
                className="absolute inset-0 bg-slate-800/80 border border-slate-600 rounded-2xl shadow-2xl transform-style-3d flex items-center justify-center overflow-hidden"
              >
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')] bg-cover opacity-30 grayscale"></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                 <div className="text-slate-500 text-xs font-mono absolute bottom-4 left-4 flex items-center gap-2">
                    <Map className="w-3 h-3" /> Terrain Layer
                 </div>
              </motion.div>

              {/* Layer 2: Foundation / Blueprints */}
              <motion.div 
                style={{ translateZ: layerSpacing }}
                className="absolute inset-0 bg-blue-900/20 border border-blue-500/30 rounded-2xl shadow-xl backdrop-blur-sm flex items-center justify-center transform-style-3d"
              >
                 {/* Blueprint grid lines */}
                 <div className="w-[80%] h-[80%] border-2 border-dashed border-blue-400/40 grid grid-cols-2 grid-rows-2">
                    <div className="border-r border-b border-blue-400/20"></div>
                    <div className="border-b border-blue-400/20"></div>
                    <div className="border-r border-blue-400/20"></div>
                 </div>
                 <div className="text-blue-400 text-xs font-mono absolute bottom-4 left-4 flex items-center gap-2">
                    <Layers className="w-3 h-3" /> Structural Grid
                 </div>
              </motion.div>

              {/* Layer 3: 3D Model / Finish */}
              <motion.div 
                 style={{ translateZ: useTransform(layerSpacing, (l: any) => l * 2) }}
                 className="absolute inset-0 bg-brand-900/10 border border-brand-500/50 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.2)] backdrop-blur-md flex items-center justify-center transform-style-3d"
              >
                 <div className="w-32 h-32 border-4 border-brand-400 bg-brand-500/20 transform rotate-45 shadow-2xl"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-brand-300/30 rounded-full animate-pulse"></div>
                 
                 <div className="text-brand-400 text-xs font-mono absolute bottom-4 left-4 flex items-center gap-2">
                    <Box className="w-3 h-3" /> Digital Twin
                 </div>

                 {/* Floating Labels */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-8 -right-8 bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded shadow-lg"
                 >
                    Living Room
                 </motion.div>
              </motion.div>

              {/* Connectors */}
              <motion.div style={{ opacity: useTransform(layerSpacing, [0, 80], [0, 0.5]) }} className="absolute inset-0 border-l border-r border-dashed border-white/20"></motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeDShowcase;