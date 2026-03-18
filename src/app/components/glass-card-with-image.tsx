import { Heart, Share2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GlassCardWithImageProps {
  title: string;
  description: string;
  imageQuery: string;
}

export function GlassCardWithImage({ title, description, imageQuery }: GlassCardWithImageProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden hover:scale-[1.02] transition-transform">
      <div className="h-48 overflow-hidden">
        <ImageWithFallback
          src={`https://source.unsplash.com/featured/?${encodeURIComponent(imageQuery)}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-4">{description}</p>
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all flex items-center justify-center gap-2">
            <Heart size={18} />
            Like
          </button>
          <button className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all flex items-center justify-center gap-2">
            <Share2 size={18} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
