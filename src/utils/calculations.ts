import type { 
  CalculatorInputs, 
  CalculatorResults 
} from '../types';
import { 
  SLEEP_DISRUPTORS, 
  CAFFEINE_COST_PER_DAY,
  MATTRESS_LIFESPAN_YEARS 
} from './constants';

/**
 * Calculate the total annual cost of sleep disruptors
 */
export function calculateDisruptorCost(selectedIds: string[]): number {
  return selectedIds.reduce((total, id) => {
    const disruptor = SLEEP_DISRUPTORS.find(d => d.id === id);
    return total + (disruptor?.cost || 0);
  }, 0);
}

/**
 * Calculate productivity loss based on sleep quality
 * Uses number of disruptors as proxy for sleep quality impact
 */
export function calculateProductivityLoss(
  annualIncome: number, 
  disruptorCount: number
): { percent: number; dollarAmount: number } {
  // Each disruptor adds to productivity loss, capped at 50%
  const baseLoss = Math.min(disruptorCount * 0.05, 0.50);
  const dollarAmount = annualIncome * baseLoss;
  
  return {
    percent: Math.round(baseLoss * 100),
    dollarAmount: Math.round(dollarAmount),
  };
}

/**
 * Calculate annual caffeine cost
 */
export function calculateCaffeineCost(monthlySpending: number): number {
  // If user provided monthly spending, use it; otherwise calculate from daily average
  if (monthlySpending > 0) {
    return monthlySpending * 12;
  }
  return CAFFEINE_COST_PER_DAY * 365;
}

/**
 * Calculate Sleep Score (0-100)
 * Higher score = more potential benefit from smart mattress
 */
export function calculateSleepScore(
  totalAnnualCost: number,
  annualIncome: number,
  disruptorCount: number
): { score: number; grade: 'A' | 'B' | 'C' | 'D' | 'F'; message: string } {
  // Base score from cost relative to income (max 50 points)
  const costRatio = totalAnnualCost / Math.max(annualIncome, 30000);
  const costScore = Math.min(costRatio * 200, 50);
  
  // Disruptor diversity score (max 30 points)
  const disruptorScore = Math.min(disruptorCount * 5, 30);
  
  // Income factor - higher earners benefit more from productivity (max 20 points)
  const incomeScore = Math.min(annualIncome / 5000, 20);
  
  const totalScore = Math.round(costScore + disruptorScore + incomeScore);
  const normalizedScore = Math.min(totalScore, 100);
  
  // Determine grade
  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  let message: string;
  
  if (normalizedScore >= 80) {
    grade = 'A';
    message = 'Excellent investment opportunity! A smart mattress could significantly improve your sleep and save you money.';
  } else if (normalizedScore >= 60) {
    grade = 'B';
    message = 'Strong potential! You\'ll likely see good returns from better sleep quality.';
  } else if (normalizedScore >= 40) {
    grade = 'C';
    message = 'Moderate benefits expected. Consider which disruptors affect you most.';
  } else if (normalizedScore >= 20) {
    grade = 'D';
    message = 'Modest improvement possible. Focus on your top sleep issues first.';
  } else {
    grade = 'F';
    message = 'Limited immediate ROI, but better sleep is always valuable for long-term health.';
  }
  
  return { score: normalizedScore, grade, message };
}

/**
 * Main calculation function
 * Computes all metrics from user inputs
 */
export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  const { annualIncome, selectedDisruptors, monthlyCaffeine, mattressPrice } = inputs;
  
  // Calculate disruptor costs
  const annualSleepCost = calculateDisruptorCost(selectedDisruptors);
  
  // Calculate caffeine costs
  const annualCaffeineCost = calculateCaffeineCost(monthlyCaffeine);
  
  // Calculate productivity loss
  const productivity = calculateProductivityLoss(annualIncome, selectedDisruptors.length);
  
  // Total annual cost
  const totalAnnualCost = annualSleepCost + annualCaffeineCost + productivity.dollarAmount;
  
  // Calculate ROI
  const yearlySavings = totalAnnualCost * 0.6; // Assume 60% improvement with smart mattress
  const roi = Math.round((yearlySavings / mattressPrice) * 100);
  
  // Break-even timeline
  const breakEvenMonths = Math.ceil(mattressPrice / (yearlySavings / 12));
  
  // 10-year projection
  const tenYearValue = (yearlySavings * MATTRESS_LIFESPAN_YEARS) - mattressPrice;
  
  // Sleep score
  const { score, grade, message } = calculateSleepScore(
    totalAnnualCost, 
    annualIncome, 
    selectedDisruptors.length
  );
  
  return {
    annualSleepCost,
    annualCaffeineCost,
    totalAnnualCost,
    productivityLossPercent: productivity.percent,
    annualProductivityLoss: productivity.dollarAmount,
    roi,
    breakEvenMonths,
    tenYearValue,
    yearlySavings,
    sleepScore: score,
    scoreGrade: grade,
    scoreMessage: message,
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercent(value: number): string {
  return `${value}%`;
}