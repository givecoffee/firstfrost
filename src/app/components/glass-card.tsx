interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}
