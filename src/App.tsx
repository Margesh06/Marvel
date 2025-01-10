import React, { useEffect, useRef, useState } from 'react';
import { Shield, Sparkles, ChevronDown } from 'lucide-react';

const heroes = [
  {
    name: "Iron Man",
    modelImage: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&q=80&w=2000",
    title: "Tony Stark",
    description: "Genius. Billionaire. Philanthropist.",
    stats: {
      power: 85,
      intelligence: 100,
      speed: 70
    }
  },
  {
    name: "Spider Man",
    modelImage: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=2000",
    title: "T'Challa",
    description: "King of Wakanda",
    stats: {
      power: 90,
      intelligence: 95,
      speed: 85
    }
  },
  {
    name: "Captain America",
    modelImage: "https://wallpapers.com/images/hd/spider-man-and-iron-man-qsceazkj7tw1c1jt.jpg",
    title: "Steve Rogers",
    description: "First Avenger",
    stats: {
      power: 80,
      intelligence: 85,
      speed: 80
    }
  }
];

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => setIsLoaded(true), 500);
    }, 12000);

    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const rotation = scrollPercent * 360;
        const translateZ = Math.sin(scrollPercent * Math.PI) * 200;
        const scale = 1 + (scrollPercent * 0.2);
        
        // Calculate which hero to show based on scroll position
        const newIndex = Math.floor(scrollPercent * 3) % heroes.length;
        if (newIndex !== currentHeroIndex) {
          setCurrentHeroIndex(newIndex);
        }
        
        heroRef.current.style.transform = `
          perspective(1000px) 
          rotateY(${rotation}deg) 
          scale(${scale})
          translateZ(${translateZ}px)
        `;
      }

      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll('.content-section');
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.75;
          if (isVisible) {
            section.classList.add('animate-in');
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [currentHeroIndex]);

  const hero = heroes[currentHeroIndex];

  return (
    <div className="min-h-[400vh] bg-black relative">
      {/* Marvel Intro Animation */}
      {showIntro && (
        <div className="fixed inset-0 z-50 bg-black">
          <video
            autoPlay
            muted
            className="w-full h-full object-cover"
            onEnded={() => setShowIntro(false)}
          >
            <source src="https://cdn.coverr.co/videos/coverr-marvel-studios-intro-animation-4584/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      )}

      {/* Loading Screen */}
      <div className={`fixed inset-0 z-40 bg-black transition-opacity duration-1000 ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="flex items-center justify-center h-full">
          <div className="relative">
            <Sparkles className="w-20 h-20 text-yellow-500 animate-spin absolute" />
            <Shield className="w-20 h-20 text-red-500 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-red-500/20 via-black to-black z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/30 via-transparent to-transparent animate-pulse" />
        </div>
        
        {/* Hero Models */}
        <div ref={heroRef} className="relative z-10 transition-all duration-700 ease-out perspective-3d">
          <div className="relative w-[90vw] h-[80vh] max-w-7xl">
            {heroes.map((h, index) => (
              <div
                key={h.name}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={h.modelImage}
                  alt={h.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            {/* Holographic Interface Elements */}
            <div className="absolute -left-20 top-1/4 w-80 h-80 bg-blue-500/10 border border-blue-500/30 rounded-lg backdrop-blur-sm transform -rotate-12 animate-pulse">
              <div className="p-6">
                <h3 className="text-blue-500 text-xl font-mono mb-4">SYSTEM STATUS</h3>
                <div className="space-y-4">
                  {Object.entries(hero.stats).map(([stat, value]) => (
                    <div key={stat} className="space-y-2">
                      <div className="flex justify-between text-blue-400">
                        <span className="uppercase text-sm">{stat}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-1 bg-blue-900/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-1000"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Info Display */}
            <div className="absolute -right-20 top-1/3 w-72 bg-red-500/10 border border-red-500/30 backdrop-blur-sm transform rotate-12 animate-pulse p-6 rounded-2xl">
              <div className="text-center space-y-4">
                <h3 className="text-red-500 text-2xl font-mono mb-2">{hero.name}</h3>
                <p className="text-red-400/80">{hero.title}</p>
                <p className="text-red-300/60 text-sm">{hero.description}</p>
              </div>
            </div>

            {/* Power Level Indicator */}
            <div className="absolute -left-16 bottom-1/4 w-64 h-64">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-spin-slow" />
                <div className="absolute inset-4 border-2 border-red-500/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                <div className="absolute inset-8 border border-yellow-500/10 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Indicators */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
          {heroes.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentHeroIndex
                  ? 'bg-red-500 w-4'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Content Sections */}
      <div ref={contentRef} className="relative z-10">
        {/* Hero Stats */}
        <div className="content-section min-h-screen flex items-center justify-center opacity-0 translate-y-10 py-20">
          <div className="max-w-6xl w-full mx-auto px-4">
            <h2 className="text-7xl font-bold text-center bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent mb-20">
              {hero.name}
            </h2>
            
            <div className="grid grid-cols-2 gap-16">
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white/90 mb-6">Combat Analysis</h3>
                {Object.entries(hero.stats).map(([stat, value]) => (
                  <div key={stat} className="bg-white/5 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all">
                    <h4 className="text-lg text-white/80 capitalize mb-3">{stat}</h4>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-1000 relative"
                        style={{ width: `${value}%` }}
                      >
                        <div className="absolute inset-0 animate-pulse bg-white/30" />
                      </div>
                    </div>
                    <div className="mt-2 text-right text-white/60">{value}%</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 transform hover:scale-105 transition-all">
                <h3 className="text-3xl font-bold text-white/90 mb-6">Hero Profile</h3>
                <div className="space-y-6">
                  <p className="text-white/70 leading-relaxed">
                    {hero.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white/80 font-semibold mb-2">Rank</h4>
                      <p className="text-2xl text-yellow-500">S-Tier</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-white/80 font-semibold mb-2">Status</h4>
                      <p className="text-2xl text-green-500">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Powers Section */}
        <div className="content-section min-h-screen flex items-center justify-center opacity-0 translate-y-10 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-3 gap-12">
              {[
                { title: "Repulsor Technology", icon: "⚡", description: "Advanced energy projection system capable of devastating force" },
                { title: "Neural Interface", icon: "🧠", description: "Direct mental control over all suit functions" },
                { title: "Adaptive Armor", icon: "🛡️", description: "Self-repairing nanotech structure adapts to any threat" }
              ].map((power, index) => (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-8 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{power.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{power.title}</h3>
                    <p className="text-white/70">{power.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Section */}
        <div className="content-section min-h-screen flex items-center justify-center opacity-0 translate-y-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-red-900/20 to-black" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
              Join the Fight
            </h2>
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              The world needs heroes. With cutting-edge technology and unwavering determination,
              we stand ready to face any threat. Are you ready to make a difference?
            </p>
            <button className="px-12 py-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full text-white font-bold text-xl transform hover:scale-105 transition-all relative group">
              <span className="relative z-10">Initiate Sequence</span>
              <div className="absolute inset-0 bg-white/20 rounded-full filter blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;