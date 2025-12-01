import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ecosystem from './components/Ecosystem';
import Features from './components/Features';
import PainPoints from './components/PainPoints';
import Comparison from './components/Comparison';
import ThreeDShowcase from './components/ThreeDShowcase';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import { UserType } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<UserType>(UserType.HOMEOWNER);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white overflow-x-hidden">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      
      <main>
        <Hero activeView={activeView} />
        <PainPoints activeView={activeView} />
        <Ecosystem />
        <Comparison activeView={activeView} />
        <Features activeView={activeView} setActiveView={setActiveView} />
        <ThreeDShowcase activeView={activeView} />
        <Waitlist activeView={activeView} />
      </main>

      <Footer />
    </div>
  );
};

export default App;