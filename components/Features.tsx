import React, { useState } from 'react';
import { UserType, Feature } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  CalendarClock, 
  Camera, 
  FileCheck, 
  History, 
  MessageSquare, 
  ShieldCheck, 
  Smartphone, 
  Wallet,
  MoreHorizontal,
  Paperclip
} from 'lucide-react';

interface FeaturesProps {
  activeView: UserType;
  setActiveView: (view: UserType) => void;
}

const Features: React.FC<FeaturesProps> = ({ activeView, setActiveView }) => {
  const isHomeowner = activeView === UserType.HOMEOWNER;
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const features: Record<UserType, Feature[]> = {
    [UserType.CONTRACTOR]: [
      {
        title: "Auto-Daily Logs",
        description: "Your foreman sends a WhatsApp voice note. Our AI converts it into a professional PDF site report.",
        icon: Smartphone,
        benefits: ["Voice to PDF", "Zero typing", "WhatsApp Integration"]
      },
      {
        title: "Automated Portfolio",
        description: "Every verified milestone adds to your public profile. Build trust with data, not just claims.",
        icon: History,
        benefits: ["Verified Badge", "Higher Trust Score", "Win bigger projects"]
      },
      {
        title: "Smart Billing",
        description: "Invoices unlock automatically when site progress is verified. Get paid faster.",
        icon: FileCheck,
        benefits: ["Evidence-backed invoices", "Auto-reminders", "Cashflow view"]
      },
      {
        title: "Gantt Charts",
        description: "Upload your BOQ. We auto-generate a timeline and material schedule instantly.",
        icon: CalendarClock,
        benefits: ["Instant scheduling", "Delay forecasting", "Material alerts"]
      }
    ],
    [UserType.HOMEOWNER]: [
      {
        title: "See Inside the Walls",
        description: "Daily AI updates highlight technical progress (e.g. 'Wiring Complete') so you aren't guessing.",
        icon: Camera,
        benefits: ["Daily visual proof", "Technical translation", "Catch issues early"]
      },
      {
        title: "Milestone Escrow",
        description: "Your money stays safe in escrow. It's only released when the work is verified complete.",
        icon: Wallet,
        benefits: ["No advance fraud", "Safe payments", "Fair for everyone"]
      },
      {
        title: "Verified Experts",
        description: "Hire based on a 'Completion Score' from past 10 projects. Real performance data.",
        icon: ShieldCheck,
        benefits: ["Data-backed hiring", "No fake reviews", "Verified expertise"]
      },
      {
        title: "One Central Hub",
        description: "Chat, quotes, invoices, and blueprints all in one place. No more lost emails.",
        icon: MessageSquare,
        benefits: ["Centralized docs", "Clear audit trail", "Professional management"]
      }
    ]
  };

  // Render different UI mocks based on hovered feature
  const renderMockUI = () => {
    // This is a simplified logic for demo purposes. 
    // In production, each case would return a distinct detailed component.
    const activeFeature = features[activeView][hoveredIndex];
    
    return (
      <motion.div 
        key={`${activeView}-${hoveredIndex}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full bg-white rounded-xl border border-slate-200 p-6 flex flex-col relative overflow-hidden shadow-sm"
      >
        {/* Mock Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-brand-50 flex items-center justify-center">
                 <activeFeature.icon className="w-4 h-4 text-brand-600" />
              </div>
              <span className="font-bold text-slate-900 text-sm">{activeFeature.title} Module</span>
           </div>
           <MoreHorizontal className="text-slate-400 w-5 h-5" />
        </div>

        {/* Dynamic Content based on feature index (Demo visual) */}
        <div className="flex-1 relative">
           {/* Abstract representations of UI */}
           {hoveredIndex === 0 && ( // Logs / Photos
             <div className="space-y-4">
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                   <div className="bg-slate-50 rounded-r-xl rounded-bl-xl p-3 text-xs text-slate-600 border border-slate-200 max-w-[80%]">
                      Uploaded 5 photos for Foundation pouring. 
                      <div className="grid grid-cols-2 gap-2 mt-2">
                         <div className="h-16 bg-slate-200 rounded"></div>
                         <div className="h-16 bg-slate-200 rounded"></div>
                      </div>
                   </div>
                </div>
                <div className="flex flex-row-reverse gap-3">
                   <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-[10px] font-bold text-white">AI</div>
                   <div className="bg-brand-50 rounded-l-xl rounded-br-xl p-3 text-xs text-brand-800 border border-brand-200 max-w-[80%]">
                      <span className="font-bold block mb-1 text-brand-700">Log Generated:</span>
                      Progress: 15% <br/>
                      Material: Cement (40 bags) <br/>
                      Status: On Track
                   </div>
                </div>
             </div>
           )}

           {hoveredIndex === 1 && ( // Portfolio / Escrow
             <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                   <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Total Project Value</div>
                   <div className="text-2xl font-bold text-slate-900">$45,000.00</div>
                   <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
                      <div className="bg-brand-500 h-full w-[60%]"></div>
                   </div>
                   <div className="flex justify-between mt-2 text-[10px] text-slate-500">
                      <span>Paid: $25k</span>
                      <span>Pending Verification: $20k</span>
                   </div>
                </div>
                <div className="flex items-center justify-between bg-green-50 border border-green-200 p-3 rounded-lg">
                   <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-700 font-bold">Milestone 3 Verified</span>
                   </div>
                   <button className="bg-green-600 text-white text-[10px] px-3 py-1.5 rounded font-bold shadow-sm">Release Payment</button>
                </div>
             </div>
           )}

            {hoveredIndex === 2 && ( // Billing / Experts
             <div className="space-y-2">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded bg-slate-200"></div>
                       <div>
                          <div className="text-xs font-bold text-slate-900">Invoice #10{i}</div>
                          <div className="text-[10px] text-slate-500">Plumbing Phase</div>
                       </div>
                    </div>
                    <div className="text-xs font-bold text-slate-900">$1,200</div>
                 </div>
               ))}
                <div className="mt-4 p-3 bg-brand-50 border border-brand-200 rounded-lg text-center">
                   <div className="text-xs text-brand-700">Payment linked to site progress</div>
                </div>
             </div>
           )}

           {hoveredIndex === 3 && ( // Gantt / Hub
             <div className="space-y-3">
                <div className="flex gap-2 mb-2 overflow-x-auto">
                   {['Oct', 'Nov', 'Dec'].map(m => (
                      <div key={m} className="px-3 py-1 bg-white rounded text-[10px] text-slate-500 border border-slate-200">{m}</div>
                   ))}
                </div>
                {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="relative h-6 bg-slate-100 rounded w-full overflow-hidden">
                      <div 
                        className="absolute top-0 bottom-0 bg-blue-500 rounded shadow-sm" 
                        style={{ left: `${i * 10}%`, width: `${30 + i * 5}%` }}
                      ></div>
                   </div>
                ))}
                 <div className="absolute bottom-0 right-0 p-3 bg-white/90 backdrop-blur border border-red-200 rounded-lg shadow-xl max-w-[150px]">
                    <div className="text-[10px] text-red-600 font-bold flex items-center gap-1">
                       ! Delay Alert
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight mt-1">
                       Rain forecast next week. Suggest rescheduling Foundation.
                    </div>
                 </div>
             </div>
           )}
        </div>
      </motion.div>
    );
  }

  return (
    <section id="features" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-slate-900">
              Powerful Tools for <br/>
              <span className="text-brand-600">Every Stage</span>
            </h2>
            <p className="text-slate-500 max-w-lg">
              Specialized tools for the two sides of construction.
            </p>
          </div>
          
          {/* Tab Switcher */}
          <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm flex gap-2">
            <button 
              onClick={() => setActiveView(UserType.HOMEOWNER)}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isHomeowner ? 'bg-brand-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              For Homeowners
            </button>
            <button 
              onClick={() => setActiveView(UserType.CONTRACTOR)}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                !isHomeowner ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              For Contractors
            </button>
          </div>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div 
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* Feature List (Interactive) */}
            <div className="grid gap-4">
              {features[activeView].map((feature, index) => (
                <div 
                  key={index} 
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer group flex gap-5 items-start ${
                    hoveredIndex === index 
                      ? 'bg-white border-brand-500 shadow-xl shadow-brand-900/5 ring-1 ring-brand-500' 
                      : 'bg-white border-slate-200 hover:border-brand-200 shadow-sm'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    hoveredIndex === index 
                      ? 'bg-brand-600 text-white' 
                      : 'bg-slate-100 text-slate-400 group-hover:text-brand-600 group-hover:bg-brand-50'
                  }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 transition-colors ${
                       hoveredIndex === index ? 'text-slate-900' : 'text-slate-800'
                    }`}>{feature.title}</h3>
                    <p className="text-slate-500 text-sm mb-3 leading-relaxed">
                      {feature.description}
                    </p>
                    {hoveredIndex === index && (
                       <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex flex-wrap gap-2 pt-2"
                        >
                          {feature.benefits.map((benefit, i) => (
                            <span key={i} className="text-xs font-medium text-brand-700 bg-brand-50 px-2 py-1 rounded border border-brand-100">
                              {benefit}
                            </span>
                          ))}
                       </motion.div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky UI Visual Side */}
            <div className="hidden lg:block relative h-[600px] sticky top-24">
               {/* Background Glow */}
               <div className="absolute inset-0 bg-brand-500/20 blur-[80px] rounded-full pointer-events-none" />
               
               {/* Device Frame */}
               <div className="relative w-full h-full bg-slate-50 border border-slate-200 rounded-3xl p-2 shadow-2xl overflow-hidden backdrop-blur-xl">
                  {renderMockUI()}
               </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Features;