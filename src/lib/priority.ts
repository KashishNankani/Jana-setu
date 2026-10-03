// ============================================================
// JanaSetu — Priority Engine (Module C)
// Fixed weightages, department-aware scoring
// ============================================================

import type { PriorityBreakdown, PriorityWeight, Priority } from './types';

interface PriorityInput {
  reporter_count: number;
  severity: number;        // 1–5
  population_affected: number;
  hours_open: number;
  geo_impact: number;      // 1–5
}

const DEFAULT_WEIGHTS: Record<string, number> = {
  reporter_count: 0.30,
  severity: 0.25,
  population_affected: 0.20,
  duration: 0.15,
  geo_impact: 0.10,
};

const MAX_VALUES: Record<string, number> = {
  reporter_count: 50,
  severity: 5,
  population_affected: 500,
  geo_impact: 5,
};

/**
 * Normalize a value to [0, 1] range
 */
function normalize(value: number, max: number): number {
  return Math.min(Math.max(value / max, 0), 1);
}

/**
 * Aging function for duration — grows past 1.0 after 7 days (168 hours)
 */
function aging(hoursOpen: number): number {
  return Math.min(hoursOpen / 168, 1.5);
}

/**
 * Calculate priority score for a problem instance.
 * Score range: 0 to ~1.0 (can exceed 1.0 due to aging)
 */
export function calculatePriorityScore(
  input: PriorityInput,
  weights?: PriorityWeight[]
): PriorityBreakdown {
  const w = { ...DEFAULT_WEIGHTS };

  if (weights && weights.length > 0) {
    for (const pw of weights) {
      w[pw.factor] = pw.weight;
    }
  }

  const reporterScore = normalize(input.reporter_count, MAX_VALUES.reporter_count);
  const severityScore = normalize(input.severity, MAX_VALUES.severity);
  const populationScore = normalize(input.population_affected, MAX_VALUES.population_affected);
  const durationScore = aging(input.hours_open);
  const geoScore = normalize(input.geo_impact, MAX_VALUES.geo_impact);

  const totalScore =
    w.reporter_count * reporterScore +
    w.severity * severityScore +
    w.population_affected * populationScore +
    w.duration * durationScore +
    w.geo_impact * geoScore;

  return {
    reporter_count: { value: input.reporter_count, weight: w.reporter_count, score: reporterScore },
    severity: { value: input.severity, weight: w.severity, score: severityScore },
    population_affected: { value: input.population_affected, weight: w.population_affected, score: populationScore },
    duration: { value: input.hours_open, weight: w.duration, score: durationScore },
    geo_impact: { value: input.geo_impact, weight: w.geo_impact, score: geoScore },
    total_score: Math.round(totalScore * 1000) / 1000,
  };
}

/**
 * Convert a numeric priority score to a priority level
 */
export function scoreToPriority(score: number): Priority {
  if (score >= 0.6) return 'high';
  if (score >= 0.35) return 'medium';
  return 'low';
}

/**
 * Get priority badge color class
 */
export function priorityColor(priority: Priority): string {
  switch (priority) {
    case 'high': return 'badge-high';
    case 'medium': return 'badge-medium';
    case 'low': return 'badge-low';
  }
}
