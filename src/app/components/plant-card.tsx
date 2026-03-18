import { Droplets, Sun, Thermometer } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Plant } from '../types/plant';

interface PlantCardProps {
  plant: Plant;
  onClick: () => void;
}

export function PlantCard({ plant, onClick }: PlantCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
    >
      <div className="h-48 overflow-hidden relative">
        <ImageWithFallback
          src={plant.default_image?.medium_url || `https://source.unsplash.com/featured/?${encodeURIComponent(plant.common_name + ' plant')}`}
          alt={plant.common_name}
          className="w-full h-full object-cover"
        />
        {plant.hydroponic_compatible && (
          <div className="absolute top-2 right-2 bg-blue-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Droplets size={12} />
            Hydroponic
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white mb-1">{plant.common_name}</h3>
        <p className="text-white/70 text-sm italic mb-3">{plant.scientific_name}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {plant.sunlight?.slice(0, 2).map((sun, idx) => (
            <span
              key={idx}
              className="text-xs bg-white/20 text-white px-2 py-1 rounded-full flex items-center gap-1"
            >
              <Sun size={12} />
              {sun}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-white/80 text-sm">
          <div className="flex items-center gap-1">
            <Droplets size={16} />
            <span>{plant.watering || 'Moderate'}</span>
          </div>
          {plant.cycle && (
            <div className="flex items-center gap-1">
              <Thermometer size={16} />
              <span className="capitalize">{plant.cycle}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
