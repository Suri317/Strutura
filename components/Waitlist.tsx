import React, { useState } from 'react';
import { UserType } from '../types';
import { ArrowRight, Check, Loader2, User, Phone, Mail, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WaitlistProps {
  activeView: UserType;
}

const Waitlist: React.FC<WaitlistProps> = ({ activeView }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name || !formData.mobile) return;
    
    setStatus('loading');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/rawatsuraj307@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...formData,
            _subject: `New Structura Waitlist: ${formData.name}`,
            userType: activeView, // Helps you know if they are a Contractor or Homeowner
            _template: 'table' // Formats the email nicely
        })
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', mobile: '', email: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
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
          className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl shadow-brand-900/5 backdrop-blur-sm"
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
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 rounded-xl p-8 text-green-700 flex flex-col items-center gap-4 max-w-md mx-auto"
            >
              <div className="bg-green-500 rounded-full p-3 text-white shadow-lg shadow-green-500/30">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xl font-bold mb-1">You're on the list!</p>
                <p className="text-sm opacity-90">We've received your details. Expect verified updates soon.</p>
              </div>
              <button onClick={() => setStatus('idle')} className="text-sm font-semibold underline mt-2 hover:text-green-900">
                Register another person
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
              
              {/* Name Input */}
              <div className="relative group">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors">
                    <User className="w-5 h-5" />
                 </div>
                 <input 
                    type="text" 
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm"
                    required
                 />
              </div>

               {/* Mobile Input */}
              <div className="relative group">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors">
                    <Phone className="w-5 h-5" />
                 </div>
                 <input 
                    type="tel" 
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm"
                    required
                 />
              </div>

               {/* Email Input */}
              <div className="relative group">
                 <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors">
                    <Mail className="w-5 h-5" />
                 </div>
                 <input 
                    type="email" 
                    name="email"
                    placeholder={isHomeowner ? "your@email.com" : "company@email.com"}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-6 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all shadow-sm"
                    required
                 />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-brand-600/20 mt-2 hover:translate-y-[-2px]"
              >
                {status === 'loading' ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <>
                    Get Early Access
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
              
              {status === 'error' && (
                <div className="flex items-center justify-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm font-medium">Something went wrong. Please try again.</p>
                </div>
              )}
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