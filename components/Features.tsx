import React, { useState, useEffect } from 'react';
import { UserType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  FileText, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Calendar, 
  Smartphone, 
  ShieldCheck, 
  Scan, 
  Search,
  Users,
  HardHat,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Image as ImageIcon,
  Cuboid,
  Star,
  Layers
} from 'lucide-react';

interface FeaturesProps {
  activeView: UserType;
  setActiveView: (view: UserType) => void;
}

const Features: React.FC<FeaturesProps> = ({ activeView, setActiveView }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-cycle features if user hasn't interacted
  useEffect(() => {
    let interval: any;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % 5);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeView]);

  const handleFeatureClick = (index: number) => {
    setActiveFeature(index);
    setIsAutoPlaying(false);
  };

  const isHomeowner = activeView === UserType.HOMEOWNER;

  const features = isHomeowner 
    ? [
        {
          id: "xray",
          title: "X-Ray Vision",
          subtitle: "See Behind Walls",
          description: "Don't guess. Our AI overlays blueprints onto reality to find hidden pipes and wires before you drill.",
          icon: Scan,
          color: "bg-purple-500"
        },
        {
          id: "design",
          title: "3D Visualization",
          subtitle: "Preview Before Build",
          description: "Walk through your future home in 3D before a single brick is laid. Catch design errors early.",
          icon: Cuboid,
          color: "bg-indigo-500"
        },
        {
          id: "escrow",
          title: "Smart Escrow",
          subtitle: "Payment Protection",
          description: "Funds are held securely. You only release payment when the milestone is verified complete.",
          icon: Lock,
          color: "bg-emerald-500"
        },
        {
          id: "verify",
          title: "Verified Pros",
          subtitle: "Data-Backed Hiring",
          description: "Hire contractors based on their actual on-time performance scores, not just text reviews.",
          icon: ShieldCheck,
          color: "bg-blue-500"
        },
        {
          id: "walk",
          title: "Live Updates",
          subtitle: "Real-time Feed",
          description: "Get a daily feed of site progress photos, analyzed by AI for quality issues.",
          icon: Smartphone,
          color: "bg-pink-500"
        }
      ]
    : [
        {
          id: "voice",
          title: "Auto-Daily Logs",
          subtitle: "Voice to Report",
          description: "Speak into the app. AI generates a professional PDF site log with weather, labour, and progress.",
          icon: Mic,
          color: "bg-red-500"
        },
        {
          id: "bim",
          title: "3D BIM Viewer",
          subtitle: "Digital Twin",
          description: "Show clients the finished product before starting. Overlay BIM models on-site to verify structural accuracy.",
          icon: Layers,
          color: "bg-indigo-500"
        },
        {
          id: "schedule",
          title: "AI Scheduler",
          subtitle: "Auto-Gantt",
          description: "Upload a BOQ, get a timeline. AI predicts delays before they happen based on labour count.",
          icon: Calendar,
          color: "bg-blue-500"
        },
        {
          id: "portfolio",
          title: "Live Portfolio",
          subtitle: "Win More Work",
          description: "Every verified project automatically adds to your public profile. Let your work sell itself.",
          icon: ImageIcon,
          color: "bg-purple-500"
        },
        {
          id: "crm",
          title: "Lead Manager",
          subtitle: "WhatsApp Sync",
          description: "Manage leads directly from WhatsApp. AI reminds you to follow up so you never lose a bid.",
          icon: MessageSquare,
          color: "bg-orange-500"
        }
      ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="features">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">
              The <span className="text-brand-600">Construction OS</span>
            </h2>
            <p className="text-xl text-slate-500">
              Powerful tools designed specifically for the chaos of construction sites.
              Switch views to see how we empower both sides.
            </p>
          </div>

          {/* User Type Switcher */}
          <div className="bg-white p-1.5 rounded-full border border-slate-200 shadow-sm flex shrink-0">
             <button 
               onClick={() => { setActiveView(UserType.HOMEOWNER); setActiveFeature(0); }}
               className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                 isHomeowner ? 'bg-brand-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
               }`}
             >
               <Users className="w-4 h-4" />
               Homeowner
             </button>
             <button 
               onClick={() => { setActiveView(UserType.CONTRACTOR); setActiveFeature(0); }}
               className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                 !isHomeowner ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
               }`}
             >
               <HardHat className="w-4 h-4" />
               Contractor
             </button>
          </div>
        </div>

        {/* Feature Deck */}
        <div className="grid lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
          
          {/* Navigation (Left) */}
          <div className="lg:col-span-4 flex flex-col gap-3 h-full overflow-y-auto pr-2 custom-scrollbar">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => handleFeatureClick(index)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
                  activeFeature === index 
                    ? 'bg-white border-brand-500 shadow-xl shadow-brand-900/5 scale-[1.02] z-10' 
                    : 'bg-white/50 border-slate-200 hover:bg-white hover:border-brand-200'
                }`}
              >
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    activeFeature === index ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600'
                  }`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 transition-colors ${activeFeature === index ? 'text-slate-900' : 'text-slate-600'}`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                {/* Progress Bar for Active State */}
                {activeFeature === index && isAutoPlaying && (
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-brand-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Simulation Stage (Right) */}
          <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-4 md:p-8 relative overflow-hidden shadow-2xl flex flex-col">
            {/* Top Bar Decoration */}
            <div className="absolute top-0 left-0 w-full h-12 bg-slate-800/50 border-b border-slate-700 flex items-center px-6 gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
               <div className="ml-auto text-slate-500 text-xs font-mono">STRUCTURA.AI // v2.4.0</div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 mt-12 relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={`${isHomeowner ? 'home' : 'pro'}-${features[activeFeature].id}`}
                   initial={{ opacity: 0, y: 20, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: -20, scale: 0.95 }}
                   transition={{ duration: 0.4 }}
                   className="w-full max-w-lg"
                 >
                    {/* Render specific simulation based on ID */}
                    <FeatureSimulation id={features[activeFeature].id} />
                 </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- SIMULATIONS ---

const FeatureSimulation = ({ id }: { id: string }) => {
  
  // 1. Voice Log Simulation
  if (id === 'voice') {
     return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
           <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                    <Mic className="w-5 h-5 text-red-600" />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Recording...</div>
                    <div className="text-slate-900 font-bold">Site Visit: Main Hall</div>
                  </div>
              </div>
              <div className="text-red-500 font-mono text-sm">00:14</div>
           </div>
           
           <div className="p-6 space-y-4">
              <div className="flex items-center justify-center gap-1 h-12">
                 {[1,2,3,4,5,6,7,8,9,10].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ height: [10, 30, 10] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1.5 bg-slate-800 rounded-full"
                    />
                 ))}
              </div>
              <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                 <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   transition={{ delay: 1 }}
                   className="space-y-2"
                 >
                    <div className="flex gap-2">
                       <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                       <p className="text-sm text-slate-700">Flooring work is 40% complete.</p>
                    </div>
                    <div className="flex gap-2">
                       <AlertCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                       <p className="text-sm text-slate-700">Need 50 bags of cement by tomorrow.</p>
                    </div>
                 </motion.div>
              </div>
           </div>
        </div>
     )
  }

  // 2. X-Ray Simulation
  if (id === 'xray') {
    return (
       <div className="relative w-full aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700">
          <div className="absolute inset-0 bg-slate-600 flex items-center justify-center">
             <div className="text-slate-400 text-sm font-mono">Surface: Drywall</div>
          </div>
          <motion.div 
             className="absolute inset-0 bg-slate-900 flex items-center justify-center overflow-hidden"
             initial={{ clipPath: 'circle(0% at 50% 50%)' }}
             animate={{ clipPath: ['circle(20% at 30% 50%)', 'circle(20% at 70% 50%)', 'circle(20% at 30% 50%)'] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
              <div className="w-full h-full relative opacity-50">
                 <div className="absolute top-1/4 left-0 right-0 h-4 bg-blue-500/50"></div>
                 <div className="absolute top-3/4 left-0 right-0 h-4 bg-blue-500/50"></div>
                 <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-yellow-500/50"></div>
                 <div className="absolute top-0 bottom-0 right-1/3 w-2 bg-yellow-500/50"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-blue-400 font-mono text-xs border border-blue-500 px-2 py-1 rounded bg-blue-900/80">
                    Warning: Live Wire
                 </div>
              </div>
          </motion.div>
          <motion.div 
             className="absolute w-40 h-40 border-2 border-brand-400 rounded-full shadow-[0_0_30px_rgba(52,211,153,0.3)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
             animate={{ left: ['30%', '70%', '30%'], top: '50%' }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white text-[10px] px-2 rounded-full">SCANNING</div>
          </motion.div>
       </div>
    )
  }

  // 3. Escrow & Billing
  if (id === 'escrow' || id === 'billing') {
     return (
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-auto">
           <div className="flex justify-between items-center mb-8">
              <div>
                 <p className="text-sm text-slate-500 uppercase tracking-wider font-bold">Milestone #3</p>
                 <h4 className="text-xl font-bold text-slate-900">Plinth Beam</h4>
              </div>
              <div className="text-right">
                 <p className="text-sm text-slate-500">Amount</p>
                 <p className="text-xl font-mono font-bold text-slate-900">$2,500</p>
              </div>
           </div>
           <div className="relative h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
              <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 1.5, ease: "easeInOut" }}
                 className="absolute left-0 top-0 bottom-0 bg-green-500"
              />
           </div>
           <div className="flex justify-center">
              <motion.div 
                 initial={{ scale: 0.8, backgroundColor: '#f1f5f9' }}
                 animate={{ scale: 1, backgroundColor: '#dcfce7' }}
                 transition={{ duration: 0.5, delay: 1.5 }}
                 className="w-20 h-20 rounded-full flex items-center justify-center text-slate-400"
              >
                 <motion.div
                    initial={{ opacity: 1, display: 'block' }}
                    animate={{ opacity: 0, display: 'none' }}
                    transition={{ delay: 1.5 }}
                 >
                    <Lock className="w-8 h-8" />
                 </motion.div>
                 <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                 >
                    <Unlock className="w-8 h-8 text-green-600" />
                 </motion.div>
              </motion.div>
           </div>
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.8 }}
             className="text-center mt-4 text-green-600 font-bold"
           >
              Payment Released
           </motion.div>
        </div>
     )
  }

  // 4. Schedule Simulation
  if (id === 'schedule') {
     return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl text-xs">
           <div className="bg-slate-50 border-b border-slate-200 p-3 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
           </div>
           <div className="p-4 space-y-3">
              <div className="flex gap-4 border-b border-slate-100 pb-2">
                 <div className="w-20 font-bold text-slate-400">Task</div>
                 <div className="flex-1 font-bold text-slate-400">Timeline</div>
              </div>
              {['Foundation', 'Brickwork', 'Electrical', 'Plumbing'].map((task, i) => (
                 <div key={i} className="flex gap-4 items-center">
                    <div className="w-20 font-medium text-slate-700">{task}</div>
                    <div className="flex-1 bg-slate-50 h-6 rounded relative overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${30 + (i * 15)}%`, x: i * 20 }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className={`absolute top-1 bottom-1 rounded ${['bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-green-500'][i]}`}
                       />
                    </div>
                 </div>
              ))}
           </div>
        </div>
     )
  }

  // 5. CRM / Lead Manager
  if (id === 'crm') {
      return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-sm mx-auto flex flex-col h-80">
            <div className="bg-[#075e54] p-4 flex items-center gap-3 text-white">
                <ArrowRight className="w-5 h-5" />
                <div className="font-bold">WhatsApp Leads</div>
            </div>
            <div className="flex-1 bg-[#ece5dd] p-4 space-y-3 overflow-hidden relative">
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm max-w-[80%] text-xs"
                >
                    <p className="font-bold text-orange-600 mb-1">+91 98765 43210</p>
                    <p className="text-slate-800">Hi, I need a quote for a G+2 villa construction in Bangalore.</p>
                </motion.div>
                
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="bg-[#dcf8c6] p-2 rounded-lg rounded-tr-none shadow-sm max-w-[80%] ml-auto text-xs"
                >
                     <p className="text-slate-800">Sure! Our AI has analyzed your requirements. Sending estimate...</p>
                     <div className="flex justify-end mt-1"><CheckCircle2 className="w-3 h-3 text-blue-400" /></div>
                </motion.div>

                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-3 py-1 rounded-full shadow-lg"
                >
                    Lead Captured
                </motion.div>
            </div>
        </div>
      )
  }

  // 6. Live Portfolio
  if (id === 'portfolio') {
      return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl p-4">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                <div>
                    <h4 className="font-bold text-slate-900 text-sm">BuildRight Const.</h4>
                    <div className="flex text-yellow-400"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                </div>
                <div className="ml-auto bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <motion.div className="aspect-square bg-slate-100 rounded-lg overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] p-1">Project A - 100% On Time</div>
                </motion.div>
                <motion.div className="aspect-square bg-slate-100 rounded-lg overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] p-1">Project B - Verified</div>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="aspect-square bg-slate-100 rounded-lg overflow-hidden relative"
                >
                     <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                    className="aspect-square bg-slate-900 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                >
                    +12 Projects
                </motion.div>
            </div>
        </div>
      )
  }

  // 7. Verified Pros
  if (id === 'verify') {
      return (
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-xs mx-auto relative group">
              <div className="h-20 bg-brand-600"></div>
              <div className="px-6 pb-6">
                  <div className="w-20 h-20 bg-white rounded-full p-1 -mt-10 relative">
                      <div className="w-full h-full bg-slate-200 rounded-full overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" />
                      </div>
                      <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
                          <ShieldCheck className="w-4 h-4" />
                      </div>
                  </div>
                  <div className="mt-3">
                      <h3 className="font-bold text-lg text-slate-900">Rajesh Kumar</h3>
                      <p className="text-slate-500 text-sm">Master Contractor</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                      <div className="flex-1 bg-green-50 border border-green-100 rounded p-2 text-center">
                          <div className="text-green-700 font-bold text-lg">98%</div>
                          <div className="text-[10px] text-green-600 uppercase">On Time</div>
                      </div>
                      <div className="flex-1 bg-blue-50 border border-blue-100 rounded p-2 text-center">
                          <div className="text-blue-700 font-bold text-lg">4.9</div>
                          <div className="text-[10px] text-blue-600 uppercase">Quality</div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  // 8. Live Updates
  if (id === 'walk') {
      return (
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-xs mx-auto">
              <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-slate-700 text-sm">Site Feed</span>
                  <span className="text-xs text-brand-600 font-bold animate-pulse">● LIVE</span>
              </div>
              <div className="p-3 space-y-3">
                  <motion.div 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     className="bg-slate-50 rounded-xl p-2 border border-slate-100"
                  >
                      <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-slate-300"></div>
                          <div className="text-xs">
                              <span className="font-bold block">Site Supervisor</span>
                              <span className="text-slate-400">2 mins ago</span>
                          </div>
                      </div>
                      <div className="aspect-video bg-slate-200 rounded-lg mb-2 overflow-hidden relative">
                           <img src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                           <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-md">
                               AI: Flooring Complete
                           </div>
                      </div>
                      <p className="text-xs text-slate-600">Living room tiling finished. Moving to kitchen.</p>
                  </motion.div>
              </div>
          </div>
      )
  }

  // 9. 3D Visualization / BIM (Improved Animation)
  if (id === 'design' || id === 'bim') {
      return (
          <div className="flex flex-col items-center justify-center h-80 text-white relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
             {/* Background Grid */}
             <div className="absolute inset-0" style={{ 
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', 
                 backgroundSize: '40px 40px',
                 transform: 'perspective(500px) rotateX(60deg) translateY(0) scale(1.5)',
                 transformOrigin: 'center 80%'
             }}></div>
             
             {/* 3D House Hologram Container */}
             <div className="relative w-48 h-48" style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px) rotateX(60deg) rotateZ(45deg)' }}>
                
                {/* Floor Plan Scanning Effect */}
                <motion.div 
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
                   transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                   className="absolute inset-0 border-2 border-brand-500/50 bg-brand-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                ></motion.div>

                {/* Building Walls (Extruding Up) */}
                <motion.div
                   className="absolute bottom-0 left-0 w-full h-full border border-brand-400/30 bg-brand-500/5"
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: [0, 60, 60, 0], opacity: [0, 1, 1, 0] }} // 60px height in 3D space
                   transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
                   style={{ transform: 'translateZ(0)', transformOrigin: 'bottom' }}
                >
                   {/* Creating 3D Box look via pseudo/child elements is complex in loop, simplifying to "Rising Cube" */}
                   <div className="absolute inset-0 border-t border-brand-300/50"></div>
                </motion.div>

                {/* Wireframe Box Structure */}
                <motion.div
                    animate={{ z: [0, 50, 50, 0], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.7, 1] }}
                    className="absolute inset-0 border border-brand-500/30"
                    style={{ transform: 'translateZ(50px)' }} // Top of the box
                >
                    {/* Roof Structure */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
                        transition={{ duration: 4, repeat: Infinity, times: [0.3, 0.4, 0.6, 0.7] }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 w-full h-full border-l border-r border-brand-500/30"
                        style={{ transform: 'rotateX(-60deg) scaleY(0.5)' }} // Fake roof
                    />
                </motion.div>

             </div>
             
             <div className="absolute bottom-8 left-0 right-0 text-center">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/50 border border-brand-500/30 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
                    <span className="text-brand-300 font-mono text-[10px] uppercase tracking-widest">Generating BIM Model...</span>
                 </div>
             </div>
          </div>
      )
  }
  
  // Fallback
  return (
     <div className="flex flex-col items-center justify-center h-full text-white">
        <ShieldCheck className="w-16 h-16 text-brand-500 mb-4" />
        <h3 className="text-2xl font-bold">Feature Loading...</h3>
     </div>
  )
}

export default Features;