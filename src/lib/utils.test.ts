import { describe, it, expect } from 'vitest';
import { filterAssessments, paginateItems, formatDate, formatTime } from './utils';
import type { Assessment, FilterState } from '@/types';

// Mock data
const mockAssessments: Assessment[] = [
    {
        id: '1',
        patient: { id: 'P1', name: 'John Doe', initials: 'JD', dateOfBirth: '1980-01-01', email: 'john@example.com' },
        type: 'MMPI-2',
        typeCode: 'mmpi',
        status: 'completed',
        date: '2023-10-01T10:00:00Z',
        score: 85,
        scoreInterpretation: 'Normal',
        duration: '30m',
        administeredBy: { id: 'D1', name: 'Dr. Smith', title: 'Psychologist' },
        notes: '',
        subscales: []
    },
    {
        id: '2',
        patient: { id: 'P2', name: 'Jane Smith', initials: 'JS', dateOfBirth: '1985-05-05', email: 'jane@example.com' },
        type: 'Beck Anxiety Inventory',
        typeCode: 'beck',
        status: 'in-progress',
        date: '2023-10-02T14:30:00Z',
        score: null,
        scoreInterpretation: null,
        duration: null,
        administeredBy: { id: 'D1', name: 'Dr. Smith', title: 'Psychologist' },
        notes: '',
        subscales: []
    },
];

describe('utils', () => {
    describe('filterAssessments', () => {
        it('should return all assessments when no filters are active', () => {
            const filters: FilterState = { search: '', status: '', type: '', last30Days: false };
            const result = filterAssessments(mockAssessments, filters);
            expect(result).toHaveLength(2);
        });

        it('should filter by search text (name)', () => {
            const filters: FilterState = { search: 'Jane', status: '', type: '', last30Days: false };
            const result = filterAssessments(mockAssessments, filters);
            expect(result).toHaveLength(1);
            expect(result[0].patient.name).toBe('Jane Smith');
        });

        it('should filter by status', () => {
            const filters: FilterState = { search: '', status: 'completed', type: '', last30Days: false };
            const result = filterAssessments(mockAssessments, filters);
            expect(result).toHaveLength(1);
            expect(result[0].status).toBe('completed');
        });

        it('should filter by type', () => {
            const filters: FilterState = { search: '', status: '', type: 'beck', last30Days: false };
            const result = filterAssessments(mockAssessments, filters);
            expect(result).toHaveLength(1);
            expect(result[0].typeCode).toBe('beck');
        });
    });

    describe('paginateItems', () => {
        const items = Array.from({ length: 10 }, (_, i) => i + 1);

        it('should return correct items for page 1', () => {
            const result = paginateItems(items, 1, 5);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        it('should return correct items for page 2', () => {
            const result = paginateItems(items, 2, 5);
            expect(result).toEqual([6, 7, 8, 9, 10]);
        });
    });

    describe('date formatting', () => {
        const dateStr = '2023-10-01T10:00:00Z';

        it('should format date correctly', () => {
            // Note: Output depends on locale, checking for basic structure or parts
            const result = formatDate(dateStr);
            expect(result).toContain('2023');
        });

        it('should format time correctly', () => {
            const result = formatTime(dateStr);
            expect(result).toBeTruthy();
        });
    });
});
