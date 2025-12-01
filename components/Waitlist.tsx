import React, { useState } from 'react';
import { UserType } from '../types';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface WaitlistProps {
  activeView: UserType;
}

const Waitlist: React.FC<WaitlistProps> = ({ activeView }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  const isHomeowner = activeView === UserType.HOMEOWNER;

  return (
    <section id="waitlist" className="py-24 relative overflow-hidden bg-white">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-slate-50" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-100 rounded-full blur-[100px] opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-100 rounded-full blur-[100px] opacity-50" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-slate-200 rounded-3xl p-8 md:p-16 shadow-2xl shadow-brand-900/5 backdrop-blur-sm"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900">
            Ready to Build <span className="text-brand-600">Without Fear?</span>
          </h2>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
            {isHomeowner 
              ? "Join the 2,000+ homeowners waiting for the safest way to renovate. Get priority access when we launch in your city." 
              : "Secure your spot as a Founding Contractor. Get verified early and access premium leads at launch."}
          </p>

          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-green-700 flex flex-col items-center gap-3">
              <div className="bg-green-500 rounded-full p-2 text-white">
                <Check className="w-6 h-6" />
              </div>
              <p className="text-lg font-bold">You're on the list!</p>
              <p className="text-sm opacity-80">We'll notify you as soon as we launch in your area.</p>
              <button onClick={() => setStatus('idle')} className="text-xs underline mt-2 hover:text-green-900">Register another email</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder={isHomeowner ? "your@email.com" : "company@email.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-xl px-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-sm"
                required
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-brand-600/20"
              >
                {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    Get Early Access
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-500" /> Free for Homeowners
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-500" /> No Spam, No Ads
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-500" /> Secure Data
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Waitlist;