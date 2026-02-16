import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { useCalculator } from './hooks/useCalculator';

/**
 * Main App Component
 * Smart Sleep Score Calculator - Calculate ROI of smart mattresses
 */
function App() {
  const {
    inputs,
    results,
    hasCalculated,
    updateIncome,
    updateCaffeine,
    updateMattressPrice,
    toggleDisruptor,
    calculate,
    reset,
  } = useCalculator();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {hasCalculated && results ? (
          <ResultsDisplay
            inputs={inputs}
            results={results}
            onRecalculate={reset}
          />
        ) : (
          <CalculatorForm
            inputs={inputs}
            onIncomeChange={updateIncome}
            onCaffeineChange={updateCaffeine}
            onMattressPriceChange={updateMattressPrice}
            onDisruptorToggle={toggleDisruptor}
            onCalculate={calculate}
            onReset={reset}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;