import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type {
  Assessment,
  FilterState,
  ScoreRange,
  AssessmentStatus
} from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================
// Score Utilities
// ============================================

/**
 * Determines the score range category based on the numeric score
 * Used for color-coding score displays
 */
export function getScoreRange(score: number): ScoreRange {
  if (score >= 60) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

/**
 * Returns Tailwind classes for score-based colors
 */
export function getScoreColors(score: number): { bar: string; text: string } {
  const range = getScoreRange(score);

  const colorMap = {
    high: {
      bar: 'bg-emerald-500',
      text: 'text-emerald-700'
    },
    medium: {
      bar: 'bg-amber-500',
      text: 'text-amber-700'
    },
    low: {
      bar: 'bg-red-500',
      text: 'text-red-700'
    }
  };

  return colorMap[range];
}

// ============================================
// Date Utilities
// ============================================

/**
 * Formats an ISO date string to display format
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Formats an ISO date string to time format
 */
export function formatTime(isoDate: string): string {
  const date = new Date(isoDate);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Formats an ISO date string to combined date and time
 */
export function formatDateTime(isoDate: string): string {
  return `${formatDate(isoDate)} • ${formatTime(isoDate)}`;
}

// ============================================
// Filter Utilities
// ============================================

/**
 * Filters assessments based on the current filter state
 */
export function filterAssessments(
  assessments: Assessment[],
  filters: FilterState
): Assessment[] {
  return assessments.filter(assessment => {
    // Search filter - checks patient name and assessment ID
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        assessment.patient.name.toLowerCase().includes(searchLower) ||
        assessment.patient.id.toLowerCase().includes(searchLower) ||
        assessment.id.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status && assessment.status !== filters.status) {
      return false;
    }

    // Type filter
    if (filters.type && assessment.typeCode !== filters.type) {
      return false;
    }

    // Last 30 days filter
    if (filters.last30Days) {
      const assessmentDate = new Date(assessment.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      if (assessmentDate < thirtyDaysAgo) {
        return false;
      }
    }

    return true;
  });
}

// ============================================
// Pagination Utilities
// ============================================

/**
 * Paginates an array of items
 */
export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number
): T[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return items.slice(startIndex, endIndex);
}

/**
 * Calculates total number of pages
 */
export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

/**
 * Generates an array of page numbers for pagination display
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 7
): (number | null)[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | null)[] = [];

  pages.push(1);

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push(null);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push(null);
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

// ============================================
// Status Utilities
// ============================================

/**
 * Returns the display label for a status
 */
export function getStatusLabel(status: AssessmentStatus): string {
  const labels: Record<AssessmentStatus, string> = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'pending': 'Pending',
    'cancelled': 'Cancelled'
  };

  return labels[status];
}

/**
 * Returns Tailwind classes for status badge styling
 */
export function getStatusColors(status: AssessmentStatus): {
  bg: string;
  text: string;
  dot: string
} {
  const colorMap: Record<AssessmentStatus, { bg: string; text: string; dot: string }> = {
    'completed': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500'
    },
    'in-progress': {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      dot: 'bg-blue-500'
    },
    'pending': {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      dot: 'bg-amber-500'
    },
    'cancelled': {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      dot: 'bg-gray-400'
    }
  };

  return colorMap[status];
}

/**
 * Generates initials from a full name
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);

  if (parts.length === 0) return '??';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
