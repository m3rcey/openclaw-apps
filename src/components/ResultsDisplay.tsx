import { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Wallet, 
  Calendar, 
  Download, 
  Share2, 
  Mail, 
  MessageCircle,
  Check,
  AlertCircle
} from 'lucide-react';
import type { CalculatorInputs, CalculatorResults } from '../types';
import { formatCurrency, formatPercent } from '../utils/calculations';
import { downloadPDF } from '../utils/pdfExport';
import { shareResults, shareViaEmail, shareViaSMS } from '../utils/share';

interface ResultsDisplayProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
  onRecalculate: () => void;
}

/**
 * Displays calculation results with export options
 */
export function ResultsDisplay({ inputs, results, onRecalculate }: ResultsDisplayProps) {
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleShare = async () => {
    const success = await shareResults(inputs, results);
    setShareStatus(success ? 'copied' : 'error');
    setTimeout(() => setShareStatus('idle'), 2000);
  };

  const handleEmail = () => {
    shareViaEmail(inputs, results);
  };

  const handleSMS = () => {
    shareViaSMS(inputs, results);
  };

  const handlePDF = () => {
    downloadPDF(inputs, results);
  };

  // Get color based on score
  const getScoreColor = () => {
    if (results.sleepScore >= 80) return 'text-green-500';
    if (results.sleepScore >= 60) return 'text-primary-600';
    if (results.sleepScore >= 40) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Score Card */}
      <div className="card bg-gradient-to-br from-primary-50 to-white border-primary-200">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
            Your Smart Sleep Score
          </p>
          <div className="flex items-baseline justify-center gap-2 mb-3">
            <span className={`text-6xl sm:text-7xl font-bold ${getScoreColor()}`}>
              {results.sleepScore}
            </span>
            <span className="text-2xl text-gray-400 font-medium">/100</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <span className="text-2xl font-bold text-primary-600">
              Grade {results.scoreGrade}
            </span>
          </div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            {results.scoreMessage}
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* ROI */}
        <div className="card p-4 sm:p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">ROI</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-primary-600">
            {formatPercent(results.roi)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Annual return</p>
        </div>

        {/* Break-even */}
        <div className="card p-4 sm:p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">Break-Even</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-primary-600">
            {results.breakEvenMonths} mo
          </p>
          <p className="text-xs text-gray-400 mt-1">Until paid off</p>
        </div>

        {/* 10-Year Value */}
        <div className="card p-4 sm:p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Wallet className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">10-Year Value</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {formatCurrency(results.tenYearValue)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Net savings</p>
        </div>

        {/* Yearly Savings */}
        <div className="card p-4 sm:p-5">
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">Yearly Savings</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {formatCurrency(results.yearlySavings)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Every year</p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="card">
        <h3 className="section-title">Current Annual Sleep Costs</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Sleep Issues</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(results.annualSleepCost)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">Caffeine/Stimulants</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(results.annualCaffeineCost)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600 text-sm">
              Productivity Loss ({results.productivityLossPercent}%)
            </span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(results.annualProductivityLoss)}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 bg-gray-50 px-3 rounded-lg">
            <span className="font-semibold text-gray-900">Total Annual Cost</span>
            <span className="font-bold text-xl text-primary-600">
              {formatCurrency(results.totalAnnualCost)}
            </span>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="card">
        <h3 className="section-title">Save or Share Results</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={handlePDF}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Download PDF report"
          >
            <Download className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-medium text-gray-700">PDF</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Share results"
          >
            {shareStatus === 'copied' ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : shareStatus === 'error' ? (
              <AlertCircle className="w-6 h-6 text-red-500" />
            ) : (
              <Share2 className="w-6 h-6 text-primary-600" />
            )}
            <span className="text-sm font-medium text-gray-700">
              {shareStatus === 'copied' ? 'Copied!' : 'Copy'}
            </span>
          </button>
          
          <button
            onClick={handleEmail}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Email results"
          >
            <Mail className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-medium text-gray-700">Email</span>
          </button>
          
          <button
            onClick={handleSMS}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Text results"
          >
            <MessageCircle className="w-6 h-6 text-primary-600" />
            <span className="text-sm font-medium text-gray-700">Text</span>
          </button>
        </div>
      </div>

      {/* Recalculate Button */}
      <button
        onClick={onRecalculate}
        className="btn-secondary w-full"
        aria-label="Recalculate"
      >
        Recalculate
      </button>
    </div>
  );
}