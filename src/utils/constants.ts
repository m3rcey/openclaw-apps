/**
 * Sleep disruptor definitions with their annual costs
 * Costs represent estimated yearly financial impact of each issue
 */
export const SLEEP_DISRUPTORS = [
  {
    id: 'back-neck-pain',
    label: 'Back/Neck Pain',
    cost: 1200,
    description: 'Chiropractor visits, pain medication, lost productivity',
  },
  {
    id: 'hot-sleep',
    label: 'Hot Sleep / Night Sweats',
    cost: 800,
    description: 'AC costs, bedding replacements, sleep aids',
  },
  {
    id: 'partner-disturbance',
    label: 'Partner Disturbance',
    cost: 1500,
    description: 'Reduced sleep quality, separate bedroom costs',
  },
  {
    id: 'snoring-apnea',
    label: 'Snoring / Sleep Apnea',
    cost: 3000,
    description: 'Medical consultations, sleep studies, equipment',
  },
  {
    id: 'restless-sleep',
    label: 'Restless Sleeping',
    cost: 600,
    description: 'Sleep aids, bedding wear, energy costs',
  },
  {
    id: 'morning-fatigue',
    label: 'Morning Fatigue',
    cost: 400,
    description: 'Coffee, energy drinks, productivity loss',
  },
  {
    id: 'general-pain',
    label: 'General Pain (Arthritis, Fibromyalgia)',
    cost: 2500,
    description: 'Medical treatments, medications, therapy',
  },
  {
    id: 'allergies',
    label: 'Allergies (Dust, Mold, Pet Dander)',
    cost: 1200,
    description: 'Air purifiers, medications, cleaning supplies',
  },
  {
    id: 'acid-reflux',
    label: 'Acid Reflux / GERD',
    cost: 1800,
    description: 'Medications, elevated pillow systems, dietary restrictions',
  },
] as const;

/** Default mattress price for smart mattresses */
export const DEFAULT_MATTRESS_PRICE = 2500;

/** Average productivity loss per poor sleep night (as percentage) */
export const PRODUCTIVITY_LOSS_PER_NIGHT = 0.3; // 30%

/** Working days per year */
export const WORKING_DAYS_PER_YEAR = 250;

/** Caffeine cost per day (average) */
export const CAFFEINE_COST_PER_DAY = 3.50; // Coffee shop coffee

/** Mattress lifespan in years */
export const MATTRESS_LIFESPAN_YEARS = 10;