import { CheckCircle, AlertTriangle, Leaf } from 'lucide-react';

interface PlantStatusCardProps {
  name: string;
  variety: string;
  status: 'safe' | 'needs-attention';
  message: string;
  icon?: React.ReactNode;
  highContrast: boolean;
}

export function PlantStatusCard({ name, variety, status, message, icon, highContrast }: PlantStatusCardProps) {
  const isSafe = status === 'safe';
  
  return (
    <div className={`backdrop-blur-xl rounded-2xl border p-4 transition-glass hover:scale-[1.01] shadow-lg min-h-[140px] flex flex-col ${
      highContrast
        ? isSafe
          ? 'bg-green-900/60 border-green-400'
          : 'bg-amber-900/60 border-amber-400'
        : isSafe 
          ? 'glass-card border-white/25' 
          : 'glass-card border-amber-300/30'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-xl shadow-md ${
          highContrast
            ? isSafe ? 'bg-green-700/80' : 'bg-amber-700/80'
            : isSafe ? 'bg-green-500/20 backdrop-blur-sm' : 'bg-amber-500/20 backdrop-blur-sm'
        }`}>
          {icon || (isSafe 
            ? <CheckCircle size={20} className={highContrast ? 'text-green-200' : 'text-green-200 drop-shadow-lg'} aria-hidden="true" /> 
            : <AlertTriangle size={20} className={highContrast ? 'text-amber-200' : 'text-amber-200 drop-shadow-lg'} aria-hidden="true" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h4 className="font-semibold text-white text-shadow">{name}</h4>
              <p className={`text-sm text-shadow ${highContrast ? 'text-white' : 'text-white/90'}`}>{variety}</p>
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-semibold shadow-sm ${
              isSafe 
                ? highContrast
                  ? 'bg-green-700 text-white border border-green-400'
                  : 'bg-green-500/25 text-green-100 border border-green-400/40 backdrop-blur-sm' 
                : highContrast
                  ? 'bg-amber-700 text-white border border-amber-400'
                  : 'bg-amber-500/25 text-amber-100 border border-amber-400/40 backdrop-blur-sm'
            }`}>
              {isSafe ? 'Safe' : 'Attention'}
            </span>
          </div>
          <p className={`text-sm mt-2 leading-relaxed text-shadow ${highContrast ? 'text-white' : 'text-white/95'}`}>{message}</p>
        </div>
      </div>
    </div>
  );
}