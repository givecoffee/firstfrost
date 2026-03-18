import { Plus, Camera, Droplets, Beaker, Sprout } from 'lucide-react';

interface GrowNotebookProps {
  highContrast: boolean;
}

export function GrowNotebook({ highContrast }: GrowNotebookProps) {
  const entries = [
    {
      id: 1,
      timestamp: '2026-03-17 10:30 AM',
      type: 'nutrients',
      title: 'Nutrients topped up',
      note: 'Added 50ml of bloom formula to Tray A',
      system: 'Tray A - Lettuce',
    },
    {
      id: 2,
      timestamp: '2026-03-16 2:15 PM',
      type: 'growth',
      title: 'New growth observed',
      note: 'Basil showing significant new leaf development. Height increased ~2 inches.',
      system: 'Tray B - Herbs',
      hasPhoto: true,
    },
    {
      id: 3,
      timestamp: '2026-03-15 9:00 AM',
      type: 'ph',
      title: 'pH adjusted',
      note: 'pH was 7.2, brought down to 6.0 with pH down solution',
      system: 'Tray A - Lettuce',
    },
    {
      id: 4,
      timestamp: '2026-03-14 11:45 AM',
      type: 'water',
      title: 'Water change',
      note: 'Full reservoir change. Cleaned filter and pump.',
      system: 'All trays',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'nutrients':
        return <Beaker size={18} className="text-purple-300" aria-hidden="true" />;
      case 'growth':
        return <Sprout size={18} className="text-green-300" aria-hidden="true" />;
      case 'ph':
        return <Droplets size={18} className="text-blue-300" aria-hidden="true" />;
      case 'water':
        return <Droplets size={18} className="text-cyan-300" aria-hidden="true" />;
      default:
        return <Sprout size={18} className="text-white" aria-hidden="true" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Log Buttons */}
      <div className={`backdrop-blur-md rounded-2xl border p-6 ${
        highContrast ? 'bg-white/40 border-white/60' : 'bg-white/10 border-white/20'
      }`}>
        <h3 className="text-lg font-semibold text-white mb-4">Quick Log</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className={`min-h-[44px] px-3 py-2 rounded-xl text-white text-sm font-medium transition-all border flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            highContrast 
              ? 'bg-white/30 hover:bg-white/40 border-white/60' 
              : 'bg-white/20 hover:bg-white/30 border-white/20'
          }`}>
            <Droplets size={16} aria-hidden="true" />
            pH Adjusted
          </button>
          <button className={`min-h-[44px] px-3 py-2 rounded-xl text-white text-sm font-medium transition-all border flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            highContrast 
              ? 'bg-white/30 hover:bg-white/40 border-white/60' 
              : 'bg-white/20 hover:bg-white/30 border-white/20'
          }`}>
            <Beaker size={16} aria-hidden="true" />
            Nutrients
          </button>
          <button className={`min-h-[44px] px-3 py-2 rounded-xl text-white text-sm font-medium transition-all border flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            highContrast 
              ? 'bg-white/30 hover:bg-white/40 border-white/60' 
              : 'bg-white/20 hover:bg-white/30 border-white/20'
          }`}>
            <Sprout size={16} aria-hidden="true" />
            New Growth
          </button>
          <button className={`min-h-[44px] px-3 py-2 rounded-xl text-white text-sm font-medium transition-all border flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            highContrast 
              ? 'bg-white/30 hover:bg-white/40 border-white/60' 
              : 'bg-white/20 hover:bg-white/30 border-white/20'
          }`}>
            <Camera size={16} aria-hidden="true" />
            Add Photo
          </button>
        </div>
      </div>

      {/* New Entry Button */}
      <button className={`w-full min-h-[44px] px-6 py-4 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        highContrast 
          ? 'bg-white/40 hover:bg-white/50 border-2 border-white/60' 
          : 'bg-white/30 hover:bg-white/40 border-2 border-white/40'
      }`}>
        <Plus size={20} aria-hidden="true" />
        New Entry
      </button>

      {/* Recent Entries */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Entries</h3>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={`backdrop-blur-md rounded-xl border p-4 ${
                highContrast ? 'bg-white/40 border-white/60' : 'bg-white/10 border-white/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${highContrast ? 'bg-white/30' : 'bg-white/10'}`}>
                  {getIcon(entry.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-white">{entry.title}</h4>
                    {entry.hasPhoto && (
                      <Camera size={16} className={highContrast ? 'text-white' : 'text-white/60'} aria-label="Has photo" />
                    )}
                  </div>
                  <p className={`text-xs mb-2 font-data ${highContrast ? 'text-white' : 'text-white/70'}`}>{entry.timestamp}</p>
                  <p className={`text-sm mb-2 ${highContrast ? 'text-white' : 'text-white/80'}`}>{entry.note}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    highContrast ? 'bg-white/30 text-white' : 'bg-white/20 text-white/80'
                  }`}>
                    {entry.system}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button className={`w-full min-h-[44px] px-6 py-3 rounded-xl text-white font-medium transition-all border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        highContrast 
          ? 'bg-white/20 hover:bg-white/30 border-white/60' 
          : 'bg-white/10 hover:bg-white/20 border-white/20'
      }`}>
        Search Entries
      </button>
    </div>
  );
}