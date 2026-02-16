/**
 * Type definitions for the Smart Sleep Score Calculator
 */

/** Represents a sleep disruptor with its annual cost */
export interface SleepDisruptor {
  id: string;
  label: string;
  cost: number;
  description?: string;
}

/** User inputs for the calculator */
export interface CalculatorInputs {
  annualIncome: number;
  selectedDisruptors: string[];
  monthlyCaffeine: number;
  mattressPrice: number;
}

/** Results of the sleep score calculation */
export interface CalculatorResults {
  // Raw values
  annualSleepCost: number;
  annualCaffeineCost: number;
  totalAnnualCost: number;
  
  // Productivity calculations
  productivityLossPercent: number;
  annualProductivityLoss: number;
  
  // ROI calculations
  roi: number;
  breakEvenMonths: number;
  tenYearValue: number;
  yearlySavings: number;
  
  // Score
  sleepScore: number; // 0-100
  scoreGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  scoreMessage: string;
}

/** Share data for text/email */
export interface ShareData {
  title: string;
  text: string;
  url?: string;
}

/** PDF report data */
export interface PDFReportData {
  inputs: CalculatorInputs;
  results: CalculatorResults;
  generatedAt: Date;
}