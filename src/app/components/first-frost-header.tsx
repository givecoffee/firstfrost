import svgPaths from "../../imports/svg-btrfr7y3kc";

interface FirstFrostHeaderProps {
  highContrast?: boolean;
}

export function FirstFrostHeader({ highContrast }: FirstFrostHeaderProps) {
  return (
    <div className="w-full py-6 px-4 sm:px-6">
      <div className="flex items-center justify-center gap-3">
        {/* Leaf Icon */}
        <div className="w-8 h-8 flex-shrink-0">
          <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g>
              <path 
                d={svgPaths.p1e821000} 
                stroke={highContrast ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.4)"} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2.66667" 
              />
              <path 
                d={svgPaths.p32206a80} 
                stroke={highContrast ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.4)"} 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2.66667" 
              />
            </g>
          </svg>
        </div>
        
        {/* Title */}
        <h1 className={`font-['Cormorant_Garamond'] italic text-[28px] sm:text-[32px] tracking-[0.64px] leading-[32px] text-shadow ${
          highContrast ? 'text-white' : 'text-[rgba(255,255,255,0.55)]'
        }`}>
          FirstFrost
        </h1>
      </div>
      
      {/* Subtitle */}
      <div className="mt-3">
        <p className={`font-['DM_Sans'] font-normal text-[11px] text-center tracking-[1.54px] uppercase leading-[16.5px] ${
          highContrast ? 'text-white/80' : 'text-[rgba(255,255,255,0.25)]'
        }`}>
          Climate Monitoring & Garden Protection
        </p>
      </div>
    </div>
  );
}