import { Leaf, Cloud, AlertTriangle, Snowflake, Bell } from 'lucide-react';

interface FrostCountdownProps {
  daysUntilFrost: number;
  highContrast: boolean;
  reducedMotion: boolean;
}

export function FrostCountdown({ daysUntilFrost, highContrast, reducedMotion }: FrostCountdownProps) {
  // Determine state based on days
  const getState = () => {
    if (daysUntilFrost >= 30) return 'safe';
    if (daysUntilFrost >= 15) return 'heads-up';
    if (daysUntilFrost >= 7) return 'action';
    if (daysUntilFrost >= 1) return 'imminent';
    return 'tonight';
  };

  const state = getState();

  // State configurations with WCAG AA compliant colors
  const states = {
    safe: {
      bgColor: highContrast ? 'bg-[#4A6741]' : 'bg-[#5F7A61]/95',
      borderColor: highContrast ? 'border-white' : 'border-white/30',
      textColor: 'text-white',
      icon: <Leaf size={28} aria-hidden="true" />,
      label: 'Safe',
      message: `First frost expected in ~${daysUntilFrost} days. You're in good shape.`,
      action: null,
      accentColor: '#4CAF78',
    },
    'heads-up': {
      bgColor: highContrast ? 'bg-[#996515]' : 'bg-[#B8860B]/95',
      borderColor: highContrast ? 'border-white' : 'border-white/30',
      textColor: 'text-white',
      icon: <Cloud size={28} aria-hidden="true" />,
      label: 'Heads Up',
      message: `Frost arriving in ${daysUntilFrost} days. Time to start planning.`,
      action: null,
      accentColor: '#FFA726',
    },
    action: {
      bgColor: highContrast ? 'bg-[#2A4A3A]' : 'bg-[#2A4A3A]/90',
      borderColor: highContrast ? 'border-white/60' : 'border-white/30',
      textColor: 'text-white',
      icon: <AlertTriangle size={32} aria-hidden="true" />,
      iconColor: 'text-orange-400',
      label: 'Action Required',
      message: `First frost in ${daysUntilFrost} days. 3 plants need attention.`,
      action: 'See what to do',
      accentColor: '#FF9800',
      glowColor: 'rgba(255, 152, 0, 0.15)',
    },
    imminent: {
      bgColor: highContrast ? 'bg-[#1E2A38]' : 'bg-[#2C3E50]/95',
      borderColor: highContrast ? 'border-orange-400' : 'border-white/50',
      textColor: 'text-white',
      icon: <Snowflake size={28} className={reducedMotion ? '' : 'animate-pulse'} aria-hidden="true" />,
      label: 'Imminent',
      message: `Frost in ${daysUntilFrost} days. Protect or harvest now.`,
      action: 'Take action',
      accentColor: '#FF9800',
    },
    tonight: {
      bgColor: highContrast ? 'bg-[#0D0D0D]' : 'bg-[#1A1A1A]/98',
      borderColor: highContrast ? 'border-red-400' : 'border-white/60',
      textColor: 'text-white',
      icon: <Bell size={32} className={reducedMotion ? '' : 'animate-pulse'} aria-hidden="true" />,
      label: 'Frost Alert',
      message: 'Frost tonight. Take action now.',
      action: 'View tasks',
      accentColor: '#FF5252',
    },
  };

  const config = states[state];

  // Render modern action state
  if (state === 'action') {
    return (
      <div
        className={`relative overflow-hidden backdrop-blur-xl rounded-3xl border-2 ${config.borderColor} p-6 sm:p-8 mb-6 shadow-2xl transition-all duration-500 ${
          config.bgColor
        } ${!reducedMotion ? 'hover:shadow-3xl hover:scale-[1.01]' : ''}`}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Animated decorative glass orbs */}
        {!reducedMotion && !highContrast && (
          <>
            <div 
              className="absolute w-[200px] h-[200px] rounded-full blur-3xl -top-20 -right-20 pointer-events-none animate-glow-pulse"
              style={{ background: config.glowColor }}
              aria-hidden="true"
            />
            <div 
              className="absolute w-[150px] h-[150px] rounded-full blur-3xl -bottom-10 -left-10 pointer-events-none animate-glow-pulse"
              style={{ background: config.glowColor, animationDelay: '1.5s' }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Shimmer overlay */}
        {!reducedMotion && !highContrast && (
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none" aria-hidden="true">
            <div 
              className="absolute inset-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"
              style={{ animationDuration: '6s' }}
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Header with icon and badge */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              {/* Animated icon */}
              <div className={`relative ${config.iconColor || config.textColor} p-4 rounded-2xl shadow-xl transition-transform duration-300 ${
                highContrast ? 'bg-white/30' : 'bg-white/20'
              } ${!reducedMotion ? 'animate-float' : ''}`}>
                {config.icon}
                {!highContrast && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" aria-hidden="true" />
                )}
              </div>
              
              <div>
                {/* Status badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${config.textColor} uppercase tracking-wider px-3 py-1.5 rounded-full text-shadow transition-all duration-300 ${
                    highContrast ? 'bg-white/30 border border-white/40' : 'bg-white/20 border border-white/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      highContrast ? 'bg-yellow-300' : 'bg-amber-200'
                    } ${!reducedMotion ? 'animate-pulse' : ''}`} aria-hidden="true" />
                    {config.label}
                  </span>
                </div>
                
                {/* Days countdown - Large and prominent with Space Mono font */}
                <div className={`flex items-baseline gap-3 ${!reducedMotion ? 'transition-all duration-300' : ''}`}>
                  <p className={`text-6xl sm:text-7xl font-bold ${config.textColor} font-['Space_Mono'] tracking-tight text-shadow-strong tabular-nums ${
                    !reducedMotion ? 'hover:scale-105 transition-transform duration-300' : ''
                  }`}>
                    {daysUntilFrost.toString().padStart(2, '0')}
                  </p>
                  <span className={`text-xl sm:text-2xl ${config.textColor} opacity-90 font-['Inter'] font-medium text-shadow uppercase tracking-wide`}>
                    day{daysUntilFrost === 1 ? '' : 's'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Message with better typography */}
          <div className={`${
            highContrast ? 'bg-white/20' : 'bg-white/10'
          } backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20 transition-all duration-300 ${
            !reducedMotion ? 'hover:bg-white/15' : ''
          }`}>
            <p className={`${config.textColor} text-base sm:text-lg leading-relaxed text-shadow font-['DM_Sans']`}>
              {config.message}
            </p>
          </div>

          {/* Stats Grid - with subtle hover animations */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className={`${
              highContrast ? 'bg-white/20' : 'bg-white/10'
            } backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center transition-all duration-300 ${
              !reducedMotion ? 'hover:bg-white/15 hover:scale-105' : ''
            }`}>
              <p className={`text-2xl sm:text-3xl font-bold ${config.textColor} text-shadow font-['Space_Mono'] tabular-nums`}>03</p>
              <p className={`text-xs ${config.textColor} opacity-80 text-shadow mt-1 font-['Inter']`}>Plants</p>
            </div>
            <div className={`${
              highContrast ? 'bg-white/20' : 'bg-white/10'
            } backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center transition-all duration-300 ${
              !reducedMotion ? 'hover:bg-white/15 hover:scale-105' : ''
            } ${!reducedMotion ? 'delay-75' : ''}`}>
              <p className={`text-2xl sm:text-3xl font-bold ${config.textColor} text-shadow font-['Space_Mono'] tabular-nums`}>02</p>
              <p className={`text-xs ${config.textColor} opacity-80 text-shadow mt-1 font-['Inter']`}>Tasks</p>
            </div>
            <div className={`${
              highContrast ? 'bg-white/20' : 'bg-white/10'
            } backdrop-blur-sm rounded-xl p-3 border border-white/20 text-center transition-all duration-300 ${
              !reducedMotion ? 'hover:bg-white/15 hover:scale-105' : ''
            } ${!reducedMotion ? 'delay-150' : ''}`}>
              <p className={`text-2xl sm:text-3xl font-bold ${config.textColor} text-shadow font-['Space_Mono'] tabular-nums`}>
                {Math.round(daysUntilFrost * 24).toString().padStart(3, '0')}h
              </p>
              <p className={`text-xs ${config.textColor} opacity-80 text-shadow mt-1 font-['Inter']`}>Remaining</p>
            </div>
          </div>

          {/* Modern CTA Button with enhanced animations */}
          {config.action && (
            <button
              className={`group relative w-full min-h-[56px] px-6 py-4 rounded-2xl font-semibold text-base transition-all duration-300 shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white overflow-hidden ${
                highContrast
                  ? 'bg-white/40 text-white hover:bg-white/50 border-2 border-white/70 text-shadow hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-white/25 text-white hover:bg-white/35 border border-white/40 text-shadow hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl'
              }`}
            >
              {/* Button gradient overlay */}
              {!highContrast && !reducedMotion && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
              )}
              
              <span className="relative z-10 flex items-center justify-center gap-2 font-['Inter']">
                {config.action}
                <svg className={`w-5 h-5 transition-transform duration-300 ${!reducedMotion ? 'group-hover:translate-x-1' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          )}
        </div>

        {/* Accessibility: Hidden text for screen readers */}
        <span className="sr-only">
          Frost countdown: {state.replace('-', ' ')} level. {config.message}
          {config.action ? ` Action available: ${config.action}` : ''}
        </span>
      </div>
    );
  }

  // Default render for other states
  return (
    <div
      className={`${config.bgColor} backdrop-blur-xl rounded-3xl border-2 ${config.borderColor} p-5 sm:p-6 mb-6 shadow-2xl transition-glass min-h-[240px] sm:min-h-[260px] flex flex-col ${
        state === 'tonight' ? 'ring-4 ring-white/30 ring-offset-2 ring-offset-transparent' : ''
      }`}
      role="alert"
      aria-live={state === 'tonight' || state === 'imminent' ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`${config.textColor} p-3 ${highContrast ? 'bg-white/30' : 'bg-white/20'} rounded-2xl shadow-lg`}>
            {config.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-bold ${config.textColor} uppercase tracking-wider px-2.5 py-1 rounded-full text-shadow ${highContrast ? 'bg-white/25' : 'bg-white/15'}`}>
                {config.label}
              </span>
              {state === 'tonight' && !reducedMotion && (
                <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg" aria-hidden="true" />
              )}
            </div>
            <p className={`text-2xl sm:text-3xl font-bold ${config.textColor} font-data tracking-tight text-shadow-strong`}>
              {daysUntilFrost === 0 ? 'Tonight' : `${daysUntilFrost} Day${daysUntilFrost === 1 ? '' : 's'}`}
            </p>
          </div>
        </div>
      </div>

      {/* Message */}
      <p className={`${config.textColor} mb-5 text-sm sm:text-base leading-relaxed text-shadow`}>
        {config.message}
      </p>

      {/* Action Button */}
      {config.action && (
        <button
          className={`w-full min-h-[52px] px-6 py-3.5 rounded-2xl font-semibold transition-glass hover:scale-[1.02] active:scale-[0.98] shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
            state === 'tonight'
              ? 'bg-white text-gray-900 hover:bg-white/95'
              : highContrast
                ? 'bg-white/40 text-white hover:bg-white/50 border-2 border-white/60 text-shadow'
                : 'bg-white/25 text-white hover:bg-white/35 border border-white/30 text-shadow'
          }`}
        >
          {config.action}
        </button>
      )}

      {/* Accessibility: Hidden text for screen readers */}
      <span className="sr-only">
        Frost countdown: {state.replace('-', ' ')} level. {config.message}
        {config.action ? ` Action available: ${config.action}` : ''}
      </span>
    </div>
  );
}