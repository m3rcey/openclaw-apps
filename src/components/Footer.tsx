import { Heart } from 'lucide-react';

/**
 * App footer with links and info
 */
export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center space-y-4">
          {/* Tagline */}
          <p className="text-gray-600 text-sm">
            Invest in better sleep, invest in yourself.
          </p>
          
          {/* Made with love */}
          <p className="text-gray-400 text-xs flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for better sleep
          </p>
          
          {/* Disclaimer */}
          <p className="text-gray-400 text-xs max-w-md mx-auto leading-relaxed">
            Calculations are estimates based on average costs. Individual results may vary. 
            Consult with sleep specialists for medical advice.
          </p>
          
          {/* Copyright */}
          <p className="text-gray-300 text-xs">
            © {new Date().getFullYear()} Smart Sleep Score Calculator
          </p>
        </div>
      </div>
    </footer>
  );
}