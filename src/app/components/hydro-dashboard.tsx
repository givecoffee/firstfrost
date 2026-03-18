import { Droplets, Zap, Thermometer, Activity, Beaker, Clock } from 'lucide-react';

interface HydroDashboardProps {
  highContrast: boolean;
  reducedMotion: boolean;
}

export function HydroDashboard({ highContrast, reducedMotion }: HydroDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Active Systems */}
      <div className={`backdrop-blur-md rounded-2xl border p-6 ${
        highContrast ? 'bg-white/40 border-white/60' : 'bg-white/10 border-white/20'
      }`}>
        <h3 className="text-lg font-semibold text-white mb-4">Active Grow Trays</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 bg-green-400 rounded-full ${reducedMotion ? '' : 'animate-pulse'}`} aria-label="Running status" />
              <span className="text-white font-medium">Tray A - Lettuce</span>
            </div>
            <span className={highContrast ? 'text-white' : 'text-white/70'}>Running</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 bg-green-400 rounded-full ${reducedMotion ? '' : 'animate-pulse'}`} aria-label="Running status" />
              <span className="text-white font-medium">Tray B - Herbs</span>
            </div>
            <span className={highContrast ? 'text-white' : 'text-white/70'}>Running</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full" aria-label="Idle status" />
              <span className="text-white font-medium">Tray C - Tomatoes</span>
            </div>
            <span className={highContrast ? 'text-white' : 'text-white/70'}>Idle</span>
          </div>
        </div>
      </div>

      {/* System Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* pH Level */}
        <div className={`backdrop-blur-md rounded-xl border p-4 min-h-[160px] flex flex-col ${
          highContrast ? 'bg-white/40 border-white/60' : 'bg-white/10 border-white/20'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Beaker size={20} className={highContrast ? 'text-white' : 'text-white/70'} aria-hidden="true" />
            <span className={`text-sm ${highContrast ? 'text-white' : 'text-white/80'}`}>pH Level</span>
          </div>
          <p className="text-3xl font-bold text-white font-data">6.2</p>
          <div className="mt-2 flex items-center gap-2">
            <div className={`flex-1 h-2 rounded-full overflow-hidden ${
              highContrast ? 'bg-white/40' : 'bg-white/20'
            }`}>
              <div className="h-full bg-green-400" style={{ width: '62%' }} />
            </div>
          </div>
          <p className={`text-xs mt-2 ${highContrast ? 'text-white' : 'text-white/70'}`}>Optimal: 5.5-6.5</p>
        </div>

        {/* EC/PPM */}
        <div className={`backdrop-blur-md rounded-xl border p-4 min-h-[160px] flex flex-col ${
          highContrast ? 'bg-white/40 border-white/60' : 'bg-white/10 border-white/20'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Activity size={20} className={highContrast ? 'text-white' : 'text-white/70'} aria-hidden="true" />
            <span className={`text-sm ${highContrast ? 'text-white' : 'text-white/80'}`}>EC Level</span>
          </div>
          <p className="text-3xl font-bold text-white font-data">1.8</p>
          <p className={`text-sm mt-2 ${highContrast ? 'text-white' : 'text-white/70'}`}>850 PPM</p>
          <p className={`text-xs mt-1 ${highContrast ? 'text-white' : 'text-white/60'}`}>Target: 1.5-2.0</p>
        </div>

        {/* Water Temperature */}
        <div className={`backdrop-blur-md rounded-xl border p-4 min-h-[160px] flex flex-col ${
          highContrast ? 'bg-white/40 border-white/60' : 'bg-white/10 border-white/20'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Thermometer size={20} className={highContrast ? 'text-white' : 'text-white/70'} aria-hidden="true" />
            <span className={`text-sm ${highContrast ? 'text-white' : 'text-white/80'}`}>Water Temp</span>
          </div>
          <p className="text-3xl font-bold text-white font-data">68°F</p>
          <p className={`text-xs mt-2 ${highContrast ? 'text-white' : 'text-white/70'}`}>Ideal: 65-70°F</p>
          <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
            highContrast 
              ? 'bg-green-700 text-white border border-green-400' 
              : 'bg-green-500/20 text-green-200'
          }`}>
            Optimal
          </span>
        </div>

        {/* Nutrient Change */}
        <div className={`backdrop-blur-md rounded-xl border p-4 min-h-[160px] flex flex-col ${
          highContrast ? 'bg-white/40 border-white/60' : 'bg-white/10 border-white/20'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={20} className={highContrast ? 'text-white' : 'text-white/70'} aria-hidden="true" />
            <span className={`text-sm ${highContrast ? 'text-white' : 'text-white/80'}`}>Last Change</span>
          </div>
          <p className="text-3xl font-bold text-white font-data">4</p>
          <p className={`text-sm mt-1 ${highContrast ? 'text-white' : 'text-white/70'}`}>days ago</p>
          <p className={`text-xs mt-1 ${highContrast ? 'text-white' : 'text-white/60'}`}>Change every 7-14 days</p>
        </div>
      </div>

      {/* Grow Light Schedule */}
      <div className={`backdrop-blur-md rounded-2xl border p-6 ${
        highContrast ? 'bg-white/40 border-white/60' : 'bg-white/10 border-white/20'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap size={20} className={highContrast ? 'text-white' : 'text-white/70'} aria-hidden="true" />
            <h3 className="text-lg font-semibold text-white">Grow Lights</h3>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full flex items-center gap-2 ${
            highContrast 
              ? 'bg-green-700 text-white border border-green-400' 
              : 'bg-green-500/20 text-green-200'
          }`}>
            <span className={`w-2 h-2 bg-green-400 rounded-full ${reducedMotion ? '' : 'animate-pulse'}`} />
            On
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className={`text-sm ${highContrast ? 'text-white' : 'text-white/80'}`}>Current Status</span>
            <span className="text-white font-medium font-data">Active (6:00 AM)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${highContrast ? 'text-white' : 'text-white/80'}`}>Auto-off Time</span>
            <span className="text-white font-medium font-data">10:00 PM</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${highContrast ? 'text-white' : 'text-white/80'}`}>Daily Duration</span>
            <span className="text-white font-medium font-data">16 hours</span>
          </div>
        </div>

        {/* Schedule Bar */}
        <div className={`mt-4 pt-4 border-t ${highContrast ? 'border-white/60' : 'border-white/20'}`}>
          <div className={`flex items-center justify-between text-xs mb-2 ${
            highContrast ? 'text-white' : 'text-white/60'
          }`}>
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM</span>
            <span>6 PM</span>
            <span>12 AM</span>
          </div>
          <div className={`h-3 rounded-full overflow-hidden flex ${
            highContrast ? 'bg-white/40' : 'bg-white/20'
          }`}>
            <div className={highContrast ? 'w-1/4 bg-gray-700' : 'w-1/4 bg-white/10'} /> {/* 12AM-6AM OFF */}
            <div className="w-2/3 bg-yellow-400/60" /> {/* 6AM-10PM ON */}
            <div className={highContrast ? 'w-1/12 bg-gray-700' : 'w-1/12 bg-white/10'} /> {/* 10PM-12AM OFF */}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className={`min-h-[44px] px-4 py-3 rounded-xl text-white font-medium transition-all border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          highContrast 
            ? 'bg-white/30 hover:bg-white/40 border-white/60' 
            : 'bg-white/20 hover:bg-white/30 border-white/20'
        }`}>
          Adjust pH
        </button>
        <button className={`min-h-[44px] px-4 py-3 rounded-xl text-white font-medium transition-all border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          highContrast 
            ? 'bg-white/30 hover:bg-white/40 border-white/60' 
            : 'bg-white/20 hover:bg-white/30 border-white/20'
        }`}>
          Add Nutrients
        </button>
        <button className={`min-h-[44px] px-4 py-3 rounded-xl text-white font-medium transition-all border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          highContrast 
            ? 'bg-white/30 hover:bg-white/40 border-white/60' 
            : 'bg-white/20 hover:bg-white/30 border-white/20'
        }`}>
          Change Water
        </button>
        <button className={`min-h-[44px] px-4 py-3 rounded-xl text-white font-medium transition-all border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          highContrast 
            ? 'bg-white/30 hover:bg-white/40 border-white/60' 
            : 'bg-white/20 hover:bg-white/30 border-white/20'
        }`}>
          View History
        </button>
      </div>
    </div>
  );
}