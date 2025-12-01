import React, { useRef } from 'react';
import { UserType } from '../types';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { ArrowRight, CheckCircle2, PlayCircle, ShieldCheck, DollarSign, Calendar, Activity, Box } from 'lucide-react';

interface HeroProps {
  activeView: UserType;
}

const Hero: React.FC<HeroProps> = ({ activeView }) => {
  const isHomeowner = activeView === UserType.HOMEOWNER;

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const content = {
    homeowner: {
      badge: "Trusted by 2,000+ Families",
      title: "Construction Without The Chaos.",
      highlight: "Finally.",
      description: "The first marketplace where contractors are ranked by real site data, not fake reviews. Track your home build from anywhere, milestone by milestone.",
      cta: "Find a Verified Builder",
      secondaryCta: "See Sample Report",
      stats: [
        { label: "Projects Delivered", value: "500+" },
        { label: "Verified Milestones", value: "12k+" },
      ]
    },
    contractor: {
      badge: "For Professional Builders",
      title: "Let Your Work Win The Bid.",
      highlight: "Automated.",
      description: "Stop losing jobs to low-bidders. Use our free site management app to prove your quality, organize your team, and win high-value clients automatically.",
      cta: "Start Using for Free",
      secondaryCta: "View Platform Demo",
      stats: [
        { label: "Admin Time Saved", value: "15hrs/wk" },
        { label: "Win Rate Increase", value: "+45%" },
      ]
    }
  };

  const current = isHomeowner ? content.homeowner : content.contractor;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-slate-50">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" 
          alt="Construction Site" 
          className="w-full h-full object-cover opacity-20"
        />
        {/* Light overlay instead of dark */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/90 to-slate-50/60" />
        {/* Glow Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: Text */}
          <motion.div 
            key={activeView}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase mb-8 border backdrop-blur-md ${
                isHomeowner ? 'bg-brand-500/10 border-brand-500/20 text-brand-700' : 'bg-blue-500/10 border-blue-500/20 text-blue-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              {current.badge}
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight text-slate-900 drop-shadow-sm">
              {current.title} <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                isHomeowner ? 'from-brand-600 to-brand-400' : 'from-blue-600 to-blue-400'
              }`}>
                {current.highlight}
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              {current.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a href="#waitlist" className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl shadow-brand-900/10 group ${
                isHomeowner ? 'bg-brand-600 hover:bg-brand-500' : 'bg-blue-600 hover:bg-blue-500'
              }`}>
                {current.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 transition-all shadow-sm">
                <PlayCircle className="w-5 h-5" />
                {current.secondaryCta}
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-12 border-t border-slate-200 pt-8">
              {current.stats.map((stat, i) => (
                <div key={i} className="text-left">
                  <p className="text-3xl font-display font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive App Simulation */}
          <motion.div 
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex-1 w-full max-w-lg lg:max-w-none relative z-20 hidden md:block"
          >
             {/* Main Dashboard Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden group hover:border-brand-500/30 transition-all duration-500"
            >
                 {/* Decorative Grid on Card */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

                 {/* Top Navigation */}
                 <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 relative z-10">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full bg-red-400"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                       <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <Activity className="w-3 h-3 text-brand-500" />
                      Live Connection
                    </div>
                 </div>

                 <div className="p-6 relative z-10 bg-white">
                    {/* Header Info */}
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">Project: Green Valley Villa</h3>
                        <p className="text-slate-500 text-sm flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                          </span>
                          Site Status: Active • 14 Workers
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Budget Utilized</p>
                        <p className="text-xl font-mono font-bold text-slate-900">$45,230 / <span className="text-slate-400">$120k</span></p>
                      </div>
                    </div>

                    {/* Main Interaction Area */}
                    <div className="grid grid-cols-5 gap-4 mb-6">
                      
                      {/* Photo Upload Area */}
                      <div className="col-span-3 space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <span>Latest Site Upload</span>
                          <span>Today, 09:42 AM</span>
                        </div>
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all bg-slate-100">
                           <img 
                              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop" 
                              alt="Site Work" 
                              className="w-full h-full object-cover"
                           />
                           {/* Scanning overlay */}
                           <motion.div 
                              animate={{ top: ['0%', '100%', '0%'] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute left-0 right-0 h-1 bg-brand-400/80 shadow-[0_0_15px_rgba(52,211,153,0.8)] z-20"
                           />
                           
                           {/* Detected Objects Tags */}
                           <motion.div 
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1, repeat: Infinity, repeatDelay: 3 }}
                              className="absolute top-1/4 left-1/4 bg-white/90 backdrop-blur text-slate-900 text-[10px] px-2 py-1 rounded border border-slate-200 shadow-sm z-30 font-semibold"
                           >
                              Rebar Spacing: 15cm
                           </motion.div>
                           <motion.div 
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
                              className="absolute bottom-1/3 right-1/4 bg-white/90 backdrop-blur text-brand-600 text-[10px] px-2 py-1 rounded border border-brand-200 shadow-sm z-30 flex items-center gap-1 font-bold"
                           >
                              <CheckCircle2 className="w-3 h-3" />
                              Quality Pass
                           </motion.div>
                        </div>
                      </div>

                      {/* AI Analysis Sidebar */}
                      <div className="col-span-2 space-y-2">
                         <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Analysis</div>
                         <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-3 h-full">
                            <div className="space-y-1">
                               <div className="flex justify-between text-xs text-slate-700">
                                  <span>Structure</span>
                                  <span className="text-brand-600 font-bold">92%</span>
                               </div>
                               <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '92%' }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-brand-500" 
                                  />
                               </div>
                            </div>
                            
                            <div className="space-y-1">
                               <div className="flex justify-between text-xs text-slate-700">
                                  <span>Material Inv.</span>
                                  <span className="text-slate-400">Checking...</span>
                               </div>
                               <div className="flex gap-1 text-[10px] text-slate-500">
                                 <Box className="w-3 h-3" /> Cement Bags: 45
                               </div>
                            </div>

                            <div className="pt-2 mt-2 border-t border-slate-200">
                               <div className="text-[10px] text-slate-500 mb-1">Target Completion</div>
                               <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                  <Calendar className="w-3 h-3 text-brand-500" />
                                  Nov 24, 2024
                               </div>
                            </div>
                         </div>
                      </div>

                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex gap-3">
                       <button className="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          Approve Payment Release
                       </button>
                       <button className="px-4 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 transition-colors shadow-sm">
                          View Log
                       </button>
                    </div>

                 </div>
            </motion.div>

            {/* Floating Popups */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-12 bg-white/90 backdrop-blur-md border border-brand-200 p-4 rounded-xl shadow-xl z-30 w-56"
            >
               <div className="flex items-center gap-3 mb-2">
                  <div className="bg-brand-100 p-2 rounded-lg">
                    <DollarSign className="w-4 h-4 text-brand-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Escrow Payment Released</div>
                    <div className="text-[10px] text-slate-500">Milestone: Plinth Beam</div>
                  </div>
               </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;