// ============================================================
// JanaSetu — Utility Functions
// ============================================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a random tracking token (22+ chars, base64url)
 */
export function generateTrackingToken(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Generate a problem code (e.g., JS-2026-1001-1234)
 */
export function generateProblemCode(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `JS-${year}-${month}${day}-${rand}`;
}

/**
 * Format a date for display
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format a date with time
 */
export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Calculate time remaining until deadline
 */
export function timeUntilDeadline(deadlineStr: string): {
  hours: number;
  minutes: number;
  isBreached: boolean;
  text: string;
} {
  const now = new Date();
  const deadline = new Date(deadlineStr);
  const diff = deadline.getTime() - now.getTime();

  if (diff <= 0) {
    const hoursAgo = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
    return {
      hours: -hoursAgo,
      minutes: 0,
      isBreached: true,
      text: `Breached ${hoursAgo}h ago`,
    };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return {
    hours,
    minutes,
    isBreached: false,
    text: `${hours}h ${minutes}m remaining`,
  };
}

/**
 * Get relative time string
 */
export function relativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '…';
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
export function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters
}

/**
 * Hash chain for audit log tamper-evidence
 */
export async function computeAuditHash(
  prevHash: string,
  before: unknown,
  after: unknown
): Promise<string> {
  const data = `${prevHash}|${JSON.stringify(before)}|${JSON.stringify(after)}`;
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Format number with Indian locale
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

/**
 * Get category icon emoji
 */
export function categoryIcon(category: string): string {
  const icons: Record<string, string> = {
    road_pothole: '🛣️',
    drainage: '🌊',
    sewer: '🚰',
    garbage: '🗑️',
    water_leak: '💧',
    contaminated_water: '⚠️',
    streetlight: '💡',
    public_infrastructure: '🏗️',
    other: '📋',
  };
  return icons[category] || '📋';
}
