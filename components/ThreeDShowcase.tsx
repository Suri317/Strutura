import React, { useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { UserType } from '../types';
import { Layers, FileText, Hammer, Zap, Home, ChevronRight, ScanLine, Box } from 'lucide-react';

interface ThreeDShowcaseProps {
  activeView: UserType;
}

const ThreeDShowcase: React.FC<ThreeDShowcaseProps> = ({ activeView }) => {
  const [expansion, setExpansion] = useState(0.5); // 0 to 1
  const [activeLayer, setActiveLayer] = useState<number>(3); // 0 to 3

  // Spring animation for smooth expansion
  const springExpansion = useSpring(expansion, { damping: 20, stiffness: 100 });

  // Handle slider change
  const handleSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setExpansion(val);
    
    // Determine active layer based on expansion
    if (val < 0.2) setActiveLayer(3); // Top
    else if (val < 0.5) setActiveLayer(2);
    else if (val < 0.8) setActiveLayer(1);
    else setActiveLayer(0); // Bottom
  };

  const layers = [
    {
      id: "finish",
      title: "The Vision",
      subtitle: "Final Finishes & Snagging",
      icon: Home,
      color: "bg-brand-500",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
      data: activeView === UserType.HOMEOWNER 
        ? ["Paint Finish: Premium Emulsion", "Flooring: Italian Marble", "Snag List: 0 Pending"]
        : ["Client Handover Signed", "Final Bill Cleared", "Retention Amount Released"]
    },
    {
      id: "systems",
      title: "The Nervous System",
      subtitle: "MEP (Mechanical, Electrical, Plumbing)",
      icon: Zap,
      color: "bg-yellow-500",
      // Abstract texture for wires/pipes
      texture: "radial-gradient(circle, transparent 20%, #0f172a 20%, #0f172a 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #0f172a 20%, #0f172a 80%, transparent 80%, transparent) 50px 50px, linear-gradient(#A8A29E 2px, transparent 2px) 0 -1px, linear-gradient(90deg, #A8A29E 2px, #0f172a 2px) -1px 0",
      data: activeView === UserType.HOMEOWNER
        ? ["Wiring: Fire Retardant", "Piping Check: Leak Proof", "HVAC: Ducts Sealed"]
        : ["Conduit Layout Verified", "Pressure Test: Passed", "Material Reconciliation"]
    },
    {
      id: "structure",
      title: "The Skeleton",
      subtitle: "Civil Structure & Brickwork",
      icon: Hammer,
      color: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1647800762953-e982187600f6?q=80&w=1000&auto=format&fit=crop", // Concrete texture
      data: activeView === UserType.HOMEOWNER
        ? ["Concrete Grade: M25", "Curing Days: 14/14", "Wall Plumb: Vertical"]
        : ["Steel Reinforcement: Verified", "Shuttering Quality: A+", "Daily Labour: 12"]
    },
    {
      id: "plan",
      title: "The Blueprint",
      subtitle: "Costing & Planning",
      icon: FileText,
      color: "bg-indigo-500",
      // Blueprint grid pattern
      texture: "linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)",
      data: activeView === UserType.HOMEOWNER
        ? ["Budget Locked: $120k", "Timeline: 6 Months", "Floor Area: 2400 sqft"]
        : ["BOQ Quantities Uploaded", "Rate Analysis: Done", "Vendor list: 15 Active"]
    }
  ];

  return (
    <section className="bg-slate-900 py-32 relative overflow-hidden min-h-[900px] flex items-center">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e293b_0%,#020617_100%)]"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: The Isometric Stack */}
        <div className="relative h-[600px] flex items-center justify-center perspective-[2000px] group">
          
          {/* Interaction Hint Overlay */}
          <div className={`absolute top-10 left-0 right-0 text-center transition-opacity duration-500 ${expansion > 0.1 ? 'opacity-0' : 'opacity-100'}`}>
             <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-400 px-4 py-2 rounded-full border border-brand-500/20 text-sm font-bold animate-bounce">
                <ScanLine className="w-4 h-4" />
                Drag slider to Deconstruct
             </div>
          </div>

          {/* The Stack Container */}
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg) rotateZ(-45deg)' }}>
            
            {/* 1. BLUEPRINT (Bottom) */}
            <IsoLayer 
              index={0} 
              expansion={springExpansion} 
              baseZ={0} 
              content={layers[3]} 
              isActive={activeLayer === 0}
            />

            {/* 2. STRUCTURE */}
            <IsoLayer 
              index={1} 
              expansion={springExpansion} 
              baseZ={50} 
              content={layers[2]} 
              isActive={activeLayer === 1}
            />

            {/* 3. SYSTEMS */}
            <IsoLayer 
              index={2} 
              expansion={springExpansion} 
              baseZ={100} 
              content={layers[1]} 
              isActive={activeLayer === 2}
            />

            {/* 4. FINISH (Top) */}
            <IsoLayer 
              index={3} 
              expansion={springExpansion} 
              baseZ={150} 
              content={layers[0]} 
              isActive={activeLayer === 3}
              isTop
            />
            
            {/* Central Axis Line */}
            <motion.div 
               style={{ height: useTransform(springExpansion, [0, 1], [0, 400]) }}
               className="absolute left-1/2 top-1/2 w-0.5 bg-brand-500/50 -translate-x-1/2 -translate-y-1/2 origin-bottom" 
            />

          </div>

          {/* Vertical Slider Control */}
          <div className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 h-64 flex flex-col items-center gap-4 z-50">
             <div className="h-full bg-slate-800 rounded-full w-2 relative">
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01"
                  value={expansion}
                  onChange={handleSlide}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ns-resize z-20"
                />
                <motion.div 
                  className="w-8 h-8 bg-brand-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] absolute left-1/2 -translate-x-1/2 flex items-center justify-center border-2 border-white cursor-grab active:cursor-grabbing"
                  style={{ bottom: `${expansion * 100}%` }}
                >
                   <Layers className="w-4 h-4 text-white" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-500 to-slate-700 rounded-full w-full" style={{ height: `${expansion * 100}%`, bottom: 0, top: 'auto' }}></div>
             </div>
             <span className="text-xs font-mono text-slate-500 rotate-90 whitespace-nowrap tracking-widest mt-8">EXPLODE LAYERS</span>
          </div>

        </div>

        {/* RIGHT: Intelligence Panel */}
        <div className="relative">
           <div className="mb-12">
             <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
               Total Visibility. <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-blue-500">
                 Layer by Layer.
               </span>
             </h2>
             <p className="text-slate-400 text-lg">
               Structura doesn't just manage tasks. It understands the physics of your construction site, from the hidden pipes to the final paint.
             </p>
           </div>

           {/* Dynamic Data Cards */}
           <div className="space-y-4">
             {layers.map((layer, idx) => {
                const isSelected = activeLayer === (3 - idx); // Reversing index to match visual stack order if needed, or mapping by ID. 
                // Let's map directly: Top of stack (Finish) is idx 0 in layers array.
                // activeLayer 3 = Finish (Top of visual stack).
                // layers[0] is Finish.
                
                const isCurrent = (3 - activeLayer) === idx;

                return (
                  <motion.div 
                    key={layer.id}
                    initial={false}
                    animate={{ 
                       scale: isCurrent ? 1.02 : 1,
                       opacity: isCurrent ? 1 : 0.4,
                       x: isCurrent ? 20 : 0
                    }}
                    className={`p-6 rounded-2xl border transition-all duration-300 ${isCurrent ? 'bg-slate-800 border-brand-500/50 shadow-2xl' : 'bg-slate-900/50 border-slate-800'}`}
                  >
                    <div className="flex items-start gap-4">
                       <div className={`w-12 h-12 rounded-xl ${layer.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                          <layer.icon className="w-6 h-6" />
                       </div>
                       <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                            {layer.title}
                            {isCurrent && <span className="text-[10px] bg-brand-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Live</span>}
                          </h3>
                          <p className="text-slate-400 text-sm mb-4">{layer.subtitle}</p>
                          
                          {/* Data Points Grid */}
                          <motion.div 
                            initial={false}
                            animate={{ height: isCurrent ? 'auto' : 0, opacity: isCurrent ? 1 : 0 }}
                            className="overflow-hidden grid grid-cols-2 gap-2"
                          >
                             {layer.data.map((item, i) => (
                                <div key={i} className="bg-slate-900/50 rounded p-2 border border-slate-700/50 text-xs font-mono text-brand-300 flex items-center gap-2">
                                   <div className="w-1.5 h-1.5 rounded-full bg-brand-500"></div>
                                   {item}
                                </div>
                             ))}
                          </motion.div>
                       </div>
                    </div>
                  </motion.div>
                )
             })}
           </div>
        </div>

      </div>
    </section>
  );
};

// Sub-component for individual Isometric Layers
const IsoLayer = ({ index, expansion, baseZ, content, isActive, isTop = false }: any) => {
  // Calculate dynamic Z translation based on expansion
  // Max separation is 100px per layer roughly
  const z = useTransform(expansion, [0, 1], [0, index * 120]);
  const y = useTransform(expansion, [0, 1], [0, -index * 40]); // Optional Y lift for better view
  
  // Opacity logic: if activeLayer is above me, I might be hidden? No, "Exploded view" shows all.
  // We just highlight the active one.
  
  return (
    <motion.div
      style={{ 
         z: baseZ, // Base stacking order
         translateZ: z, // Dynamic lift
         translateY: y,
      }}
      className={`absolute inset-0 shadow-xl transition-all duration-500 ${isActive ? 'brightness-110' : 'brightness-50 grayscale-[0.5]'}`}
    >
       {/* The "Floor Plate" */}
       <div className={`w-full h-full relative ${isActive ? 'border-2 border-brand-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border border-slate-600'}`}>
          
          {/* Content Texture/Image */}
          {content.image ? (
            <img 
               src={content.image} 
               alt={content.title} 
               className="w-full h-full object-cover" 
            />
          ) : (
            <div 
               className="w-full h-full bg-slate-800"
               style={{ background: content.texture || '#1e293b', backgroundSize: '40px 40px' }}
            ></div>
          )}

          {/* Overlay Color Tint */}
          <div className={`absolute inset-0 ${content.color} mix-blend-overlay opacity-20`}></div>

          {/* Side Walls (Thicknes simulation) */}
          <div className="absolute -right-[10px] top-0 w-[10px] h-full bg-slate-900 origin-left skew-y-[45deg] brightness-50 border-r border-slate-700"></div>
          <div className="absolute bottom-[-10px] left-0 w-full h-[10px] bg-slate-800 origin-top skew-x-[45deg] brightness-75 border-b border-slate-700"></div>

          {/* Label Floating Above (Always faces camera roughly) */}
          <motion.div 
            style={{ opacity: useTransform(expansion, [0, 0.2], [0, 1]) }}
            className={`absolute -left-10 bottom-10 transform -rotate-z-[-45deg] -rotate-x-[-60deg] pointer-events-none ${isActive ? 'block' : 'hidden'}`}
          >
             <div className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded border border-brand-500 shadow-lg whitespace-nowrap flex items-center gap-2">
                {content.title}
                <ChevronRight className="w-3 h-3 text-brand-500" />
             </div>
             <div className="w-12 h-px bg-brand-500 absolute top-1/2 -right-12"></div>
             <div className="w-2 h-2 rounded-full bg-brand-500 absolute top-1/2 -right-12 -translate-y-1/2"></div>
          </motion.div>

       </div>
    </motion.div>
  )
}

export default ThreeDShowcase;
