import { useState, useCallback } from 'react';
import type { CalculatorInputs, CalculatorResults } from '../types';
import { calculateResults } from '../utils/calculations';
import { DEFAULT_MATTRESS_PRICE } from '../utils/constants';

interface UseCalculatorReturn {
  inputs: CalculatorInputs;
  results: CalculatorResults | null;
  hasCalculated: boolean;
  updateIncome: (value: number) => void;
  updateCaffeine: (value: number) => void;
  updateMattressPrice: (value: number) => void;
  toggleDisruptor: (id: string) => void;
  calculate: () => void;
  reset: () => void;
}

const defaultInputs: CalculatorInputs = {
  annualIncome: 75000,
  selectedDisruptors: [],
  monthlyCaffeine: 75, // ~$2.50/day
  mattressPrice: DEFAULT_MATTRESS_PRICE,
};

/**
 * Custom hook for managing calculator state and logic
 */
export function useCalculator(): UseCalculatorReturn {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const updateIncome = useCallback((value: number) => {
    setInputs(prev => ({ ...prev, annualIncome: value }));
  }, []);

  const updateCaffeine = useCallback((value: number) => {
    setInputs(prev => ({ ...prev, monthlyCaffeine: value }));
  }, []);

  const updateMattressPrice = useCallback((value: number) => {
    setInputs(prev => ({ ...prev, mattressPrice: value }));
  }, []);

  const toggleDisruptor = useCallback((id: string) => {
    setInputs(prev => {
      const selected = prev.selectedDisruptors.includes(id)
        ? prev.selectedDisruptors.filter(d => d !== id)
        : [...prev.selectedDisruptors, id];
      return { ...prev, selectedDisruptors: selected };
    });
  }, []);

  const calculate = useCallback(() => {
    const calculatedResults = calculateResults(inputs);
    setResults(calculatedResults);
    setHasCalculated(true);
  }, [inputs]);

  const reset = useCallback(() => {
    setInputs(defaultInputs);
    setResults(null);
    setHasCalculated(false);
  }, []);

  return {
    inputs,
    results,
    hasCalculated,
    updateIncome,
    updateCaffeine,
    updateMattressPrice,
    toggleDisruptor,
    calculate,
    reset,
  };
}