import { useState, useRef, useEffect } from 'react';
import { Wind, CloudRain, ThermometerSun, Calendar, TrendingDown, Sprout } from 'lucide-react';

interface ClimateCarouselProps {
  highContrast: boolean;
}

export function ClimateCarousel({ highContrast }: ClimateCarouselProps) {
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      id: 'current',
      title: 'Current Weather',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm mb-1 ${highContrast ? 'text-white' : 'text-white/80'}`}>Temperature</p>
              <p className="text-4xl font-bold text-white font-data">58°F</p>
            </div>
            <ThermometerSun size={48} className={highContrast ? 'text-white' : 'text-white/80'} aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`text-sm ${highContrast ? 'text-white' : 'text-white/70'}`}>Feels Like</p>
              <p className="text-xl font-semibold text-white font-data">54°F</p>
            </div>
            <div>
              <p className={`text-sm ${highContrast ? 'text-white' : 'text-white/70'}`}>Humidity</p>
              <p className="text-xl font-semibold text-white font-data">72%</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 pt-2 border-t ${highContrast ? 'border-white/60' : 'border-white/20'}`}>
            <Wind size={18} className={highContrast ? 'text-white' : 'text-white/70'} aria-hidden="true" />
            <p className={`text-sm ${highContrast ? 'text-white' : 'text-white/80'}`}>Wind: 8 mph NW (increases frost risk)</p>
          </div>
        </div>
      ),
    },
    {
      id: 'forecast',
      title: '7-Day Forecast',
      content: (
        <div className="space-y-3">
          {[
            { day: 'Mon', high: 62, low: 45, frost: false },
            { day: 'Tue', high: 59, low: 42, frost: false },
            { day: 'Wed', high: 55, low: 38, frost: true },
            { day: 'Thu', high: 52, low: 35, frost: true },
            { day: 'Fri', high: 50, low: 32, frost: true },
            { day: 'Sat', high: 54, low: 36, frost: true },
            { day: 'Sun', high: 58, low: 40, frost: false },
          ].map((day, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-white font-medium w-12">{day.day}</span>
              <div className="flex-1 flex items-center justify-center gap-4">
                <span className={`font-data ${highContrast ? 'text-white' : 'text-white/80'}`}>{day.high}°</span>
                <div className={`flex-1 h-1 rounded-full overflow-hidden ${highContrast ? 'bg-white/40' : 'bg-white/20'}`}>
                  <div className={`h-full ${highContrast ? 'bg-white/80' : 'bg-white/40'}`} style={{ width: '60%' }} />
                </div>
                <span className={`font-data ${highContrast ? 'text-white' : 'text-white/80'}`}>{day.low}°</span>
              </div>
              <div className="w-8 flex justify-end">
                {day.frost && (
                  <span className="text-blue-200" title="Frost risk" aria-label="Frost risk">
                    ❄️
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'historical',
      title: 'Historical Data',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar size={24} className={`mt-1 ${highContrast ? 'text-white' : 'text-white/70'}`} aria-hidden="true" />
            <div>
              <p className={`text-sm mb-1 ${highContrast ? 'text-white' : 'text-white/80'}`}>Average First Frost</p>
              <p className="text-2xl font-bold text-white">Oct 18</p>
              <p className={`text-sm mt-1 ${highContrast ? 'text-white' : 'text-white/70'}`}>Based on 30-year average</p>
            </div>
          </div>
          <div className={`pt-4 border-t ${highContrast ? 'border-white/60' : 'border-white/20'}`}>
            <div className="flex items-start gap-3">
              <TrendingDown size={24} className={`mt-1 ${highContrast ? 'text-white' : 'text-white/70'}`} aria-hidden="true" />
              <div>
                <p className={`text-sm mb-1 ${highContrast ? 'text-white' : 'text-white/80'}`}>Variance</p>
                <p className="text-white">Some years it arrives 2 weeks earlier</p>
                <p className={`text-sm mt-2 ${highContrast ? 'text-white' : 'text-white/70'}`}>
                  Earliest: Sept 28 • Latest: Nov 3
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'soil',
      title: 'Soil Temperature',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm mb-1 ${highContrast ? 'text-white' : 'text-white/80'}`}>Current Soil Temp</p>
              <p className="text-4xl font-bold text-white font-data">52°F</p>
            </div>
            <Sprout size={48} className={highContrast ? 'text-white' : 'text-white/80'} aria-hidden="true" />
          </div>
          <div className={`rounded-xl p-4 ${highContrast ? 'bg-white/30' : 'bg-white/10'}`}>
            <p className={`text-sm leading-relaxed ${highContrast ? 'text-white' : 'text-white/90'}`}>
              <strong className="text-white">Below 50°F</strong> slows root growth
            </p>
            <p className={`text-sm mt-2 ${highContrast ? 'text-white' : 'text-white/70'}`}>
              Consider mulching to insulate soil temperature
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className={highContrast ? 'text-white' : 'text-white/70'}>6" depth</span>
              <span className="text-white font-data">52°F</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={highContrast ? 'text-white' : 'text-white/70'}>12" depth</span>
              <span className="text-white font-data">54°F</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.querySelector('[data-card]')?.clientWidth || 0;
      const gap = 16; // 1rem gap
      const newActiveCard = Math.round(scrollLeft / (cardWidth + gap));
      setActiveCard(newActiveCard);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white text-shadow-strong">Climate Data</h2>
        <div className="flex gap-1">
          {cards.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === activeCard
                  ? 'w-6 bg-white shadow-lg'
                  : 'w-1 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Scrollable Cards Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        role="region"
        aria-label="Climate information cards"
      >
        {cards.map((card, idx) => (
          <div
            key={card.id}
            data-card
            className={`min-w-[280px] max-w-[280px] sm:min-w-[320px] sm:max-w-[320px] lg:min-w-[360px] lg:max-w-[360px] backdrop-blur-xl rounded-3xl border p-5 sm:p-6 snap-center shadow-xl transition-glass flex-shrink-0 ${
              highContrast 
                ? 'bg-white/40 border-white/60' 
                : 'glass-card-strong'
            }`}
            aria-label={`Card ${idx + 1} of ${cards.length}: ${card.title}`}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-5 flex items-center gap-2 text-shadow-strong">
              <span className="w-1 h-6 bg-white/60 rounded-full"></span>
              {card.title}
            </h3>
            {card.content}
          </div>
        ))}
      </div>

      {/* Scroll Progress Indicators */}
      <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Climate card navigation">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => {
              if (scrollRef.current) {
                const cardElement = scrollRef.current.querySelector(`[data-card]:nth-child(${idx + 1})`) as HTMLElement;
                if (cardElement) {
                  const scrollContainer = scrollRef.current;
                  const cardLeft = cardElement.offsetLeft;
                  const cardWidth = cardElement.offsetWidth;
                  const containerWidth = scrollContainer.offsetWidth;
                  const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2) + 16; // 16px is left padding
                  
                  scrollContainer.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth',
                  });
                }
              }
            }}
            className={`h-2 rounded-full transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              idx === activeCard
                ? 'w-8 bg-white shadow-lg'
                : highContrast
                  ? 'w-2 bg-white/70'
                  : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`View ${card.title}`}
            aria-selected={idx === activeCard}
            role="tab"
          />
        ))}
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}