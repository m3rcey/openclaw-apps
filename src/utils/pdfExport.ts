import { jsPDF } from 'jspdf';
import type { CalculatorInputs, CalculatorResults } from '../types';
import { formatCurrency } from './calculations';
import { SLEEP_DISRUPTORS } from './constants';

/**
 * Generate a PDF report of the sleep score calculation
 */
export function generatePDFReport(
  inputs: CalculatorInputs,
  results: CalculatorResults
): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;
  
  // Header
  doc.setFontSize(24);
  doc.setTextColor(79, 70, 229); // Primary-600
  doc.text('Smart Sleep Score Report', pageWidth / 2, y, { align: 'center' });
  
  y += 15;
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: 'center' });
  
  // Sleep Score Section
  y += 25;
  doc.setFontSize(48);
  doc.setTextColor(79, 70, 229);
  doc.text(`${results.sleepScore}`, margin, y);
  
  doc.setFontSize(24);
  doc.text(`/100 (Grade ${results.scoreGrade})`, margin + 30, y);
  
  y += 10;
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const messageLines = doc.splitTextToSize(results.scoreMessage, pageWidth - margin * 2);
  doc.text(messageLines, margin, y);
  
  // Key Metrics
  y += 25;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Key Metrics', margin, y);
  
  y += 10;
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  
  const metrics = [
    ['ROI:', `${results.roi}%`],
    ['Break-even:', `${results.breakEvenMonths} months`],
    ['10-Year Value:', formatCurrency(results.tenYearValue)],
    ['Yearly Savings:', formatCurrency(results.yearlySavings)],
  ];
  
  metrics.forEach(([label, value]) => {
    doc.text(label, margin, y);
    doc.setTextColor(79, 70, 229);
    doc.text(value, margin + 50, y);
    doc.setTextColor(60, 60, 60);
    y += 8;
  });
  
  // Cost Breakdown
  y += 15;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Current Annual Sleep Costs', margin, y);
  
  y += 10;
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  
  const costs = [
    ['Sleep Disruptors:', formatCurrency(results.annualSleepCost)],
    ['Caffeine/Stimulants:', formatCurrency(results.annualCaffeineCost)],
    ['Productivity Loss:', formatCurrency(results.annualProductivityLoss)],
    ['Total Cost:', formatCurrency(results.totalAnnualCost)],
  ];
  
  costs.forEach(([label, value], index) => {
    doc.text(label, margin, y);
    if (index === costs.length - 1) {
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
    }
    doc.text(value, margin + 60, y);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    y += 8;
  });
  
  // Selected Disruptors
  if (inputs.selectedDisruptors.length > 0) {
    y += 15;
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Selected Sleep Issues', margin, y);
    
    y += 10;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    
    inputs.selectedDisruptors.forEach(id => {
      const disruptor = SLEEP_DISRUPTORS.find(d => d.id === id);
      if (disruptor) {
        const line = `• ${disruptor.label}: ${formatCurrency(disruptor.cost)}/year`;
        doc.text(line, margin, y);
        y += 6;
      }
    });
  }
  
  // Footer
  y = doc.internal.pageSize.getHeight() - 30;
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  doc.text('Smart Sleep Score Calculator', pageWidth / 2, y, { align: 'center' });
  doc.text('Invest in better sleep, invest in yourself.', pageWidth / 2, y + 6, { align: 'center' });
  
  return doc;
}

/**
 * Download the PDF report
 */
export function downloadPDF(
  inputs: CalculatorInputs,
  results: CalculatorResults,
  filename?: string
): void {
  const doc = generatePDFReport(inputs, results);
  const defaultFilename = `sleep-score-report-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename || defaultFilename);
}