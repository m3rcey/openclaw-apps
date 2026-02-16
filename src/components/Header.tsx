import { Moon, Sparkles } from 'lucide-react';

/**
 * App header with branding
 */
export function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg leading-tight">
                SleepScore
              </h1>
              <p className="text-xs text-gray-500">Smart Mattress ROI</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            <span className="text-xs font-medium text-primary-700">Free Tool</span>
          </div>
        </div>
      </div>
    </header>
  );
}