import { useState } from 'react';
import { HydroDashboard } from './hydro-dashboard';
import { GrowNotebook } from './grow-notebook';
import { FirstFrostHeader } from './first-frost-header';
import { Droplets } from 'lucide-react';

interface IndoorViewProps {
  highContrast: boolean;
  reducedMotion: boolean;
}

export function IndoorView({ highContrast, reducedMotion }: IndoorViewProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'notebook'>('dashboard');

  return (
    <div className="h-screen overflow-y-auto pb-32 px-4 sm:px-6 lg:px-8 pt-4 max-w-7xl mx-auto">
      {/* App Header */}
      <FirstFrostHeader highContrast={highContrast} />

      {/* Tab Navigation */}
      <div className={`flex gap-2 mb-6 p-1.5 rounded-2xl ${
        highContrast ? 'bg-gray-800/60 border border-white' : 'glass-card'
      }`} role="tablist" aria-label="Indoor system sections">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-semibold transition-glass shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            activeTab === 'dashboard'
              ? highContrast
                ? 'bg-white text-gray-900 shadow-lg'
                : 'bg-white/25 text-white shadow-lg'
              : highContrast
                ? 'text-white hover:bg-gray-700'
                : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
          role="tab"
          aria-selected={activeTab === 'dashboard'}
          aria-controls="dashboard-panel"
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('notebook')}
          className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-semibold transition-glass shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            activeTab === 'notebook'
              ? highContrast
                ? 'bg-white text-gray-900 shadow-lg'
                : 'bg-white/25 text-white shadow-lg'
              : highContrast
                ? 'text-white hover:bg-gray-700'
                : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
          role="tab"
          aria-selected={activeTab === 'notebook'}
          aria-controls="notebook-panel"
        >
          Notebook
        </button>
      </div>

      {/* Content */}
      <div
        role="tabpanel"
        id={activeTab === 'dashboard' ? 'dashboard-panel' : 'notebook-panel'}
        aria-labelledby={activeTab === 'dashboard' ? 'Dashboard' : 'Notebook'}
      >
        {activeTab === 'dashboard' ? (
          <HydroDashboard highContrast={highContrast} reducedMotion={reducedMotion} />
        ) : (
          <GrowNotebook highContrast={highContrast} />
        )}
      </div>
    </div>
  );
}