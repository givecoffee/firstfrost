import { useState } from 'react';
import { X, Eye, Contrast, Minimize2 } from 'lucide-react';

interface AccessibilitySettingsProps {
  onClose: () => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
}

export function AccessibilitySettings({ 
  onClose, 
  highContrast, 
  setHighContrast,
  reducedMotion,
  setReducedMotion 
}: AccessibilitySettingsProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="text-gray-700 dark:text-gray-300" size={24} />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Accessibility
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close accessibility settings"
          >
            <X size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* High Contrast Mode */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Contrast size={20} className="text-gray-700 dark:text-gray-300" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    High Contrast Mode
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Increases contrast ratios for better visibility in bright conditions.
                  Recommended for outdoor use.
                </p>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`min-h-[44px] min-w-[76px] rounded-full p-1 transition-all ${
                  highContrast 
                    ? 'bg-green-600' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                role="switch"
                aria-checked={highContrast}
                aria-label="Toggle high contrast mode"
              >
                <div
                  className={`w-9 h-9 bg-white rounded-full shadow-md transition-transform ${
                    highContrast ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Reduced Motion */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Minimize2 size={20} className="text-gray-700 dark:text-gray-300" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Reduce Motion
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Minimizes animations and transitions. Recommended if animations
                  cause discomfort.
                </p>
              </div>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                className={`min-h-[44px] min-w-[76px] rounded-full p-1 transition-all ${
                  reducedMotion 
                    ? 'bg-green-600' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                role="switch"
                aria-checked={reducedMotion}
                aria-label="Toggle reduced motion"
              >
                <div
                  className={`w-9 h-9 bg-white rounded-full shadow-md transition-transform ${
                    reducedMotion ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Accessibility Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <span>All text meets WCAG AA standards (4.5:1 contrast ratio)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <span>Touch targets are minimum 44×44 pixels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <span>Status indicators use icon + color + text</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <span>Keyboard navigation fully supported</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <span>Screen reader optimized</span>
              </li>
            </ul>
          </div>

          {/* System Preferences */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              These settings sync with your device's accessibility preferences when available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
