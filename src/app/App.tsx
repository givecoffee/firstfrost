import { useState, useRef, useEffect } from 'react';
import { OutdoorView } from './components/outdoor-view';
import { IndoorView } from './components/indoor-view';
import { AccessibilitySettings } from './components/accessibility-settings';
import { Sun, Droplets, Settings } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'outdoor' | 'indoor'>('outdoor');
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showA11ySettings, setShowA11ySettings] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const isSwiping = useRef(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Check for prefers-contrast
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: more)');
    setHighContrast(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setHighContrast(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartX.current;
    
    // Limit swipe distance
    if (currentView === 'outdoor' && diff < 0 && diff > -window.innerWidth) {
      setSwipeOffset(diff);
    } else if (currentView === 'indoor' && diff > 0 && diff < window.innerWidth) {
      setSwipeOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    isSwiping.current = false;
    const threshold = window.innerWidth * 0.3;

    if (currentView === 'outdoor' && swipeOffset < -threshold) {
      setCurrentView('indoor');
    } else if (currentView === 'indoor' && swipeOffset > threshold) {
      setCurrentView('outdoor');
    }
    
    setSwipeOffset(0);
  };

  const toggleView = () => {
    setCurrentView(prev => prev === 'outdoor' ? 'indoor' : 'outdoor');
  };

  // Calculate background gradient based on view and swipe
  const getBackgroundGradient = () => {
    // FirstFrost deep forest green gradient
    return `linear-gradient(135deg, #1F3A30 0%, #0F1F19 100%)`;
  };

  const transitionClass = reducedMotion ? '' : 'transition-all duration-300 ease-out';

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen overflow-hidden relative ${highContrast ? 'high-contrast' : ''}`}
      style={{
        background: getBackgroundGradient(),
        transition: swipeOffset === 0 && !reducedMotion ? 'background 0.3s ease' : 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative glass orbs */}
      {!reducedMotion && !highContrast && (
        <>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#4CAF78]/10 blur-3xl top-20 left-10 pointer-events-none" aria-hidden="true" />
          <div className="absolute w-[250px] h-[250px] rounded-full bg-[#2A8FA8]/10 blur-3xl bottom-40 right-20 pointer-events-none" aria-hidden="true" />
        </>
      )}
      
      {/* View Container */}
      <div 
        className={`relative h-screen ${transitionClass}`}
        style={{
          transform: `translateX(${currentView === 'outdoor' ? swipeOffset : swipeOffset - window.innerWidth}px)`
        }}
      >
        {/* Outdoor View */}
        <div className="absolute inset-0 w-full">
          <OutdoorView highContrast={highContrast} reducedMotion={reducedMotion} />
        </div>
        
        {/* Indoor View */}
        <div className="absolute inset-0 w-full" style={{ left: '100%' }}>
          <IndoorView highContrast={highContrast} reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* View Indicator Pills */}
      <div className="fixed bottom-6 sm:bottom-24 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 rounded-3xl backdrop-blur-xl bg-white/15 border border-white/30 shadow-2xl">
        <button
          onClick={() => setCurrentView('outdoor')}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl ${transitionClass} min-h-[44px] min-w-[44px] flex items-center gap-2 sm:gap-2.5 font-medium shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            currentView === 'outdoor'
              ? highContrast 
                ? 'bg-white text-gray-900 border-2 border-gray-900'
                : 'bg-white/30 text-white border border-white/40 text-shadow'
              : highContrast
                ? 'bg-gray-800 text-white border border-white hover:bg-gray-700'
                : 'text-white/80 hover:text-white hover:bg-white/15 text-shadow'
          }`}
          aria-label="Switch to outdoor view"
          aria-pressed={currentView === 'outdoor'}
        >
          <Sun size={18} aria-hidden="true" />
          <span className="text-sm hidden sm:inline font-['Inter']">Outside</span>
        </button>
        <button
          onClick={() => setCurrentView('indoor')}
          className={`px-4 sm:px-5 py-2.5 rounded-2xl ${transitionClass} min-h-[44px] min-w-[44px] flex items-center gap-2 sm:gap-2.5 font-medium shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            currentView === 'indoor'
              ? highContrast 
                ? 'bg-white text-gray-900 border-2 border-gray-900'
                : 'bg-white/30 text-white border border-white/40 text-shadow'
              : highContrast
                ? 'bg-gray-800 text-white border border-white hover:bg-gray-700'
                : 'text-white/80 hover:text-white hover:bg-white/15 text-shadow'
          }`}
          aria-label="Switch to indoor view"
          aria-pressed={currentView === 'indoor'}
        >
          <Droplets size={18} aria-hidden="true" />
          <span className="text-sm hidden sm:inline font-['Inter']">Inside</span>
        </button>
      </div>

      {/* Accessibility Settings Button */}
      <button
        onClick={() => setShowA11ySettings(true)}
        className={`fixed top-4 left-4 z-50 p-3 sm:p-3.5 rounded-2xl backdrop-blur-xl border text-white ${transitionClass} min-h-[44px] sm:min-h-[48px] min-w-[44px] sm:min-w-[48px] shadow-xl hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          highContrast ? 'bg-gray-800 border-white' : 'glass-button'
        }`}
        aria-label="Accessibility settings"
      >
        <Settings size={18} className="sm:w-5 sm:h-5" aria-hidden="true" />
      </button>

      {/* Toggle Button Alternative (for accessibility) */}
      <button
        onClick={toggleView}
        className={`fixed top-4 right-4 z-50 p-3 sm:p-3.5 rounded-2xl backdrop-blur-xl border text-white ${transitionClass} min-h-[44px] sm:min-h-[48px] min-w-[44px] sm:min-w-[48px] shadow-xl hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          highContrast ? 'bg-gray-800 border-white' : 'glass-button'
        }`}
        aria-label={`Switch to ${currentView === 'outdoor' ? 'indoor' : 'outdoor'} view`}
      >
        {currentView === 'outdoor' ? <Droplets size={18} className="sm:w-5 sm:h-5" aria-hidden="true" /> : <Sun size={18} className="sm:w-5 sm:h-5" aria-hidden="true" />}
      </button>

      {/* Swipe Indicators - Hidden on mobile */}
      {currentView === 'outdoor' && !reducedMotion && (
        <div className="hidden sm:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 opacity-40" aria-hidden="true">
          <div className="w-1 h-10 bg-white/50 rounded-full shadow-lg"></div>
          <div className="w-1 h-10 bg-white/50 rounded-full shadow-lg"></div>
          <div className="w-1 h-10 bg-white/50 rounded-full shadow-lg"></div>
        </div>
      )}
      {currentView === 'indoor' && !reducedMotion && (
        <div className="hidden sm:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-2 opacity-40" aria-hidden="true">
          <div className="w-1 h-10 bg-white/50 rounded-full shadow-lg"></div>
          <div className="w-1 h-10 bg-white/50 rounded-full shadow-lg"></div>
          <div className="w-1 h-10 bg-white/50 rounded-full shadow-lg"></div>
        </div>
      )}

      {/* Accessibility Settings Modal */}
      {showA11ySettings && (
        <AccessibilitySettings
          onClose={() => setShowA11ySettings(false)}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          reducedMotion={reducedMotion}
          setReducedMotion={setReducedMotion}
        />
      )}
    </div>
  );
}