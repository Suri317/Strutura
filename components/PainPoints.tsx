import React from 'react';
import { UserType } from '../types';
import { AlertTriangle, Clock, DollarSign, EyeOff, SearchX, XCircle } from 'lucide-react';

interface PainPointsProps {
  activeView: UserType;
}

const PainPoints: React.FC<PainPointsProps> = ({ activeView }) => {
  const isHomeowner = activeView === UserType.HOMEOWNER;

  const pains = isHomeowner 
    ? [
        { icon: EyeOff, text: "No Transparency" },
        { icon: DollarSign, text: "Hidden Costs" },
        { icon: AlertTriangle, text: "Contractor Fraud" },
        { icon: Clock, text: "Endless Delays" },
        { icon: SearchX, text: "Who To Trust?" },
      ]
    : [
        { icon: SearchX, text: "Bad Leads" },
        { icon: XCircle, text: "Client Mistrust" },
        { icon: Clock, text: "Paperwork Chaos" },
        { icon: DollarSign, text: "Late Payments" },
        { icon: EyeOff, text: "Work Unnoticed" },
      ];

  return (
    <div className="w-full bg-slate-100 py-8 relative overflow-hidden border-y border-slate-200">
      {/* Gradient Masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-100 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-100 to-transparent z-10"></div>

      <div className="flex gap-16 items-center animate-scroll whitespace-nowrap min-w-full justify-center">
        {[...pains, ...pains, ...pains, ...pains].map((pain, idx) => (
          <div key={idx} className="flex items-center gap-3 text-slate-400 font-bold text-lg uppercase tracking-wider group hover:text-slate-800 transition-colors cursor-default">
            <pain.icon className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
            <span>{pain.text}</span>
            <span className="ml-12 text-slate-300 text-2xl">•</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PainPoints;