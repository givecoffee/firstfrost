import { FrostCountdown } from './frost-countdown';
import { WeatherCard } from './weather-card';
import { ClimateCarousel } from './climate-carousel';
import { PlantStatusCard } from './plant-status-card';
import { FirstFrostHeader } from './first-frost-header';
import { Leaf, AlertTriangle } from 'lucide-react';

interface OutdoorViewProps {
  highContrast: boolean;
  reducedMotion: boolean;
}

export function OutdoorView({ highContrast, reducedMotion }: OutdoorViewProps) {
  // Mock frost countdown - in production, calculate from user's location and weather API
  const daysUntilFrost = 9; // STATE 3 - Action Required
  
  return (
    <div className="h-screen overflow-y-auto pb-32 px-4 sm:px-6 lg:px-8 pt-4 max-w-7xl mx-auto">
      {/* App Header */}
      <FirstFrostHeader highContrast={highContrast} />

      {/* Hero: Frost Countdown */}
      <FrostCountdown daysUntilFrost={daysUntilFrost} highContrast={highContrast} reducedMotion={reducedMotion} />

      {/* Climate Information Carousel */}
      <ClimateCarousel highContrast={highContrast} />

      {/* Outdoor Garden Status */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white text-shadow-strong">Garden Status</h2>
          <span className="text-white/90 text-sm font-medium text-shadow">4 beds</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <PlantStatusCard
            name="Tomato Bed A"
            variety="Cherokee Purple"
            status="needs-attention"
            message="Sensitive to frost - harvest or protect"
            icon={<AlertTriangle size={20} aria-hidden="true" />}
            highContrast={highContrast}
          />
          <PlantStatusCard
            name="Lettuce Bed"
            variety="Mixed Greens"
            status="safe"
            message="Can tolerate light frost"
            highContrast={highContrast}
          />
          <PlantStatusCard
            name="Herb Garden"
            variety="Basil, Cilantro"
            status="needs-attention"
            message="Move indoors before frost"
            icon={<AlertTriangle size={20} aria-hidden="true" />}
            highContrast={highContrast}
          />
          <PlantStatusCard
            name="Root Vegetables"
            variety="Carrots, Beets"
            status="safe"
            message="Frost improves flavor"
            highContrast={highContrast}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`mt-8 rounded-3xl p-5 sm:p-6 shadow-xl ${
        highContrast 
          ? 'bg-white/40 border-2 border-white/60' 
          : 'glass-card-strong'
      }`}>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2 text-shadow-strong">
          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full drop-shadow-lg"></span>
          Frost Prep Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <button className={`min-h-[52px] px-5 py-3 rounded-2xl text-white text-left transition-glass hover:scale-[1.02] active:scale-[0.98] border shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            highContrast
              ? 'bg-white/30 hover:bg-white/40 border-white/60'
              : 'glass-button'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🛡️</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold block text-shadow">Cover plants</span>
                <p className={`text-xs sm:text-sm mt-0.5 text-shadow ${highContrast ? 'text-white' : 'text-white/90'}`}>Row covers</p>
              </div>
            </div>
          </button>
          <button className={`min-h-[52px] px-5 py-3 rounded-2xl text-white text-left transition-glass hover:scale-[1.02] active:scale-[0.98] border shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            highContrast
              ? 'bg-white/30 hover:bg-white/40 border-white/60'
              : 'glass-button'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🧺</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold block text-shadow">Harvest crops</span>
                <p className={`text-xs sm:text-sm mt-0.5 text-shadow ${highContrast ? 'text-white' : 'text-white/90'}`}>Before frost</p>
              </div>
            </div>
          </button>
          <button className={`min-h-[52px] px-5 py-3 rounded-2xl text-white text-left transition-glass hover:scale-[1.02] active:scale-[0.98] border shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:col-span-2 lg:col-span-1 ${
            highContrast
              ? 'bg-white/30 hover:bg-white/40 border-white/60'
              : 'glass-button'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💧</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold block text-shadow">Water deeply</span>
                <p className={`text-xs sm:text-sm mt-0.5 text-shadow ${highContrast ? 'text-white' : 'text-white/90'}`}>Heat retention</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}