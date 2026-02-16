/**
 * Share functionality for text and email
 */

import type { CalculatorInputs, CalculatorResults } from '../types';
import { formatCurrency } from './calculations';

/**
 * Generate share text for the results
 */
export function generateShareText(
  inputs: CalculatorInputs,
  results: CalculatorResults
): string {
  return `🛌 My Smart Sleep Score: ${results.sleepScore}/100 (Grade ${results.scoreGrade})

💰 Current sleep costs me ${formatCurrency(results.totalAnnualCost)}/year
📈 ROI on a smart mattress: ${results.roi}%
⏱️ Break-even: ${results.breakEvenMonths} months
💎 10-year value: ${formatCurrency(results.tenYearValue)}

Calculate your score at: [URL]`;
}

/**
 * Share via Web Share API (mobile) or fallback to clipboard
 */
export async function shareResults(
  inputs: CalculatorInputs,
  results: CalculatorResults,
  url?: string
): Promise<boolean> {
  const text = generateShareText(inputs, results).replace('[URL]', url || window.location.href);
  const shareData = {
    title: 'My Smart Sleep Score',
    text,
    url: url || window.location.href,
  };
  
  // Try Web Share API first (works on mobile)
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      // User cancelled or API failed, fall through to clipboard
      if ((error as Error).name !== 'AbortError') {
        console.error('Share failed:', error);
      }
    }
  }
  
  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Clipboard failed:', error);
    return false;
  }
}

/**
 * Share via email
 */
export function shareViaEmail(
  inputs: CalculatorInputs,
  results: CalculatorResults,
  url?: string
): void {
  const text = generateShareText(inputs, results).replace('[URL]', url || window.location.href);
  const subject = encodeURIComponent(`My Smart Sleep Score: ${results.sleepScore}/100`);
  const body = encodeURIComponent(text);
  
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

/**
 * Share via SMS
 */
export function shareViaSMS(
  inputs: CalculatorInputs,
  results: CalculatorResults,
  url?: string
): void {
  const text = generateShareText(inputs, results).replace('[URL]', url || window.location.href);
  const encodedBody = encodeURIComponent(text);
  
  // iOS uses different URL scheme
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const smsUrl = isIOS 
    ? `sms:&body=${encodedBody}`
    : `sms:?body=${encodedBody}`;
  
  window.location.href = smsUrl;
}