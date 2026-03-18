import { TrendingUp, TrendingDown } from 'lucide-react';

interface GlassCardStatsProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export function GlassCardStats({ title, value, change, trend }: GlassCardStatsProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:scale-[1.02] transition-transform">
      <div className="flex items-center justify-between mb-4">
        <p className="text-white/80">{title}</p>
        <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-green-300' : 'text-red-300'}`}>
          {trend === 'up' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
