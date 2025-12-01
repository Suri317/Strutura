import React from 'react';
import { UserType } from '../types';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';

interface ComparisonProps {
  activeView: UserType;
}

const Comparison: React.FC<ComparisonProps> = ({ activeView }) => {
  const isHomeowner = activeView === UserType.HOMEOWNER;

  const features = isHomeowner ? [
    { title: "Project Costs", old: "Hidden markups & surprises", new: "Live line-item tracking" },
    { title: "Site Updates", old: "Grainy WhatsApp photos", new: "AI-verified Daily Reports" },
    { title: "Your Money", old: "High-risk advances", new: "Milestone-based Escrow" },
    { title: "Completion", old: "Unpredictable delays", new: "Data-backed forecasting" },
  ] : [
    { title: "Lead Quality", old: "Low-budget price shoppers", new: "Verified high-value clients" },
    { title: "Getting Paid", old: "Chasing clients for weeks", new: "Instant milestone release" },
    { title: "Portfolio", old: "Scattered phone gallery", new: "Auto-generated verified history" },
    { title: "Admin Work", old: "Hours of manual Excel", new: "Automated by Site Logs" },
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-200 relative overflow-hidden">
       {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-slate-900">
            Stop Playing the <span className="text-red-500">Lottery</span>.
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Construction shouldn't be a gamble. See how Structura changes the game.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          
          {/* The Old Way (Negative) */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8 opacity-50">
               <div className="h-px bg-slate-300 flex-1"></div>
               <span className="text-sm font-bold uppercase tracking-widest text-slate-500">The Current Reality</span>
               <div className="h-px bg-slate-300 flex-1"></div>
            </div>

            {features.map((item, idx) => (
               <motion.div 
                  key={`old-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center gap-4 group hover:bg-red-50 transition-colors"
               >
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 group-hover:bg-red-200">
                     <X className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                     <p className="text-xs text-slate-400 uppercase font-bold mb-1">{item.title}</p>
                     <p className="text-slate-500 line-through decoration-red-400 decoration-2">{item.old}</p>
                  </div>
               </motion.div>
            ))}
          </div>

          {/* The New Way (Positive) */}
          <div className="space-y-6 relative">
             <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden md:block">
                <div className="bg-white p-2 rounded-full border border-slate-200 shadow-xl z-20">
                   <ArrowRight className="w-6 h-6 text-slate-900" />
                </div>
             </div>

            <div className="flex items-center gap-3 mb-8">
               <div className="h-px bg-brand-200 flex-1"></div>
               <span className="text-sm font-bold uppercase tracking-widest text-brand-600">The Structura Standard</span>
               <div className="h-px bg-brand-200 flex-1"></div>
            </div>

            {features.map((item, idx) => (
               <motion.div 
                  key={`new-${idx}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                  className="bg-white border border-brand-200 p-6 rounded-2xl flex items-center gap-4 shadow-xl shadow-brand-900/5 relative overflow-hidden group hover:border-brand-400 transition-all hover:scale-[1.02]"
               >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-brand-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center shrink-0 shadow-lg shadow-brand-500/20 relative z-10">
                     <Check className="w-5 h-5 text-white" />
                  </div>
                  <div className="relative z-10">
                     <p className="text-xs text-brand-600 uppercase font-bold mb-1">{item.title}</p>
                     <p className="text-slate-900 font-bold text-lg">{item.new}</p>
                  </div>
               </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Comparison;