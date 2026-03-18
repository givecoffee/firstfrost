import { ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GlassCardProductProps {
  title: string;
  description: string;
  price: string;
  imageQuery: string;
}

export function GlassCardProduct({ title, description, price, imageQuery }: GlassCardProductProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden hover:scale-[1.02] transition-transform">
      <div className="h-40 overflow-hidden">
        <ImageWithFallback
          src={`https://source.unsplash.com/featured/?${encodeURIComponent(imageQuery)}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white mb-1">{title}</h3>
        <p className="text-white/70 text-sm mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">{price}</span>
          <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
