import { X, Droplets, Sun, Thermometer, Leaf, Info } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GlassCard } from './glass-card';
import type { Plant } from '../types/plant';

interface PlantDetailModalProps {
  plant: Plant;
  onClose: () => void;
}

export function PlantDetailModal({ plant, onClose }: PlantDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{plant.common_name}</h2>
            <p className="text-white/70 italic">{plant.scientific_name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="mb-6 rounded-xl overflow-hidden">
            <ImageWithFallback
              src={plant.default_image?.original_url || `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(plant.common_name + ' plant')}`}
              alt={plant.common_name}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Droplets className="text-white mx-auto mb-2" size={24} />
              <p className="text-white/70 text-sm mb-1">Watering</p>
              <p className="text-white font-medium">{plant.watering || 'Moderate'}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Sun className="text-white mx-auto mb-2" size={24} />
              <p className="text-white/70 text-sm mb-1">Sunlight</p>
              <p className="text-white font-medium capitalize">
                {plant.sunlight?.[0] || 'Full Sun'}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Thermometer className="text-white mx-auto mb-2" size={24} />
              <p className="text-white/70 text-sm mb-1">Cycle</p>
              <p className="text-white font-medium capitalize">{plant.cycle || 'Perennial'}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Leaf className="text-white mx-auto mb-2" size={24} />
              <p className="text-white/70 text-sm mb-1">Type</p>
              <p className="text-white font-medium capitalize">{plant.type || 'Plant'}</p>
            </div>
          </div>

          {/* Description */}
          {plant.description && (
            <GlassCard className="mb-6">
              <div className="flex items-start gap-3">
                <Info className="text-white mt-1" size={20} />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Description</h3>
                  <p className="text-white/80">{plant.description}</p>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Care Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {plant.sunlight && plant.sunlight.length > 0 && (
              <GlassCard>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Sun size={20} />
                  Sunlight Requirements
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plant.sunlight.map((sun, idx) => (
                    <span
                      key={idx}
                      className="bg-white/20 text-white px-3 py-1 rounded-full text-sm capitalize"
                    >
                      {sun}
                    </span>
                  ))}
                </div>
              </GlassCard>
            )}

            {plant.watering && (
              <GlassCard>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Droplets size={20} />
                  Watering Schedule
                </h3>
                <p className="text-white/80 capitalize">{plant.watering}</p>
                <p className="text-white/60 text-sm mt-2">
                  Adjust based on season and humidity levels
                </p>
              </GlassCard>
            )}
          </div>

          {/* Hydroponic Info */}
          {plant.hydroponic_compatible && (
            <GlassCard className="bg-blue-500/20">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Droplets size={20} />
                Hydroponic Compatible
              </h3>
              <p className="text-white/80">
                This plant can be grown hydroponically! Perfect for indoor gardens and
                controlled environment agriculture.
              </p>
            </GlassCard>
          )}

          {/* Additional Details */}
          {(plant.attracts || plant.propagation || plant.maintenance) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {plant.attracts && plant.attracts.length > 0 && (
                <GlassCard>
                  <h4 className="text-white font-medium mb-2">Attracts</h4>
                  <div className="flex flex-wrap gap-2">
                    {plant.attracts.map((item, idx) => (
                      <span key={idx} className="text-white/80 text-sm capitalize">
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              )}
              {plant.propagation && plant.propagation.length > 0 && (
                <GlassCard>
                  <h4 className="text-white font-medium mb-2">Propagation</h4>
                  <div className="flex flex-wrap gap-2">
                    {plant.propagation.map((method, idx) => (
                      <span key={idx} className="text-white/80 text-sm capitalize">
                        {method}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              )}
              {plant.maintenance && (
                <GlassCard>
                  <h4 className="text-white font-medium mb-2">Maintenance</h4>
                  <p className="text-white/80 text-sm capitalize">{plant.maintenance}</p>
                </GlassCard>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
