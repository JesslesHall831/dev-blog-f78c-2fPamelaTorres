import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes safely with clsx support.
 * @see https://github.com/dcastil/tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a Date object to 'YYYY-MM-DD' string.
 * @param date - Date instance or ISO string
 * @returns Formatted date string
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Truncates a string to a maximum length and appends ellipsis if truncated.
 * @param str - Input string
 * @param maxLength - Maximum allowed length before truncation
 * @returns Truncated string with ellipsis
 */
export function truncate(str: string, maxLength: number = 120): string {
  if (!str || typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Generates a URL-safe slug from a string (e.g., title → title-slug).
 * Removes special chars, replaces spaces with hyphens, lowercases.
 * @param str - Input string
 * @returns Slugified string
 */
export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Safely parses JSON, returns undefined on failure.
 * @param text - JSON string to parse
 * @returns Parsed object or undefined
 */
export function safeParseJSON<T>(text: string): T | undefined {
  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined;
  }
}

/**
 * Deep merges two objects (shallow for arrays, recursive for plain objects).
 * Used for config overrides or fallback merging.
 * @param target - Target object to merge into
 * @param source - Source object to merge from
 * @returns Merged object
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T {
  const output = { ...target } as T;

  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value) && key in target) {
      output[key as keyof T] = deepMerge(
        target[key as keyof T] as Record<string, unknown>,
        value as Partial<Record<string, unknown>>
      ) as T[keyof T];
    } else {
      output[key as keyof T] = value as T[keyof T];
    }
  }

  return output;
}

/**
 * Returns a random item from an array.
 * @param arr - Array to pick from
 * @returns Random element or undefined if empty
 */
export function randomItem<T>(arr: T[]): T | undefined {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Capitalizes the first letter of a string.
 * @param str - Input string
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str || typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Checks if a value is defined and not null.
 * @param val - Value to check
 * @returns Boolean indicating presence
 */
export function isDefined<T>(val: T | null | undefined): val is T {
  return val !== null && val !== undefined;
}

/**
 * Memoizes a function result based on arguments (shallow equality only).
 * Intended for lightweight, deterministic utility functions.
 * @param fn - Function to memoize
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  } as T;
}