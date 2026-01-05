import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAssessments } from '../useAssessments';

describe('useAssessments', () => {
    it('should return initial state correctly', () => {
        const { result } = renderHook(() => useAssessments());

        expect(result.current.currentPage).toBe(1);
        expect(result.current.filters.search).toBe('');
        expect(result.current.selectedAssessment).toBeNull();
        expect(result.current.assessments.length).toBeGreaterThan(0);
    });

    it('should update filters and reset page', () => {
        const { result } = renderHook(() => useAssessments());

        act(() => {
            result.current.onPageChange(2);
        });
        expect(result.current.currentPage).toBe(2);

        act(() => {
            result.current.onFilterChange({
                ...result.current.filters,
                search: 'Test'
            });
        });

        expect(result.current.filters.search).toBe('Test');
        expect(result.current.currentPage).toBe(1);
    });

    it('should select an assessment', () => {
        const { result } = renderHook(() => useAssessments());
        const assessment = result.current.assessments[0];

        act(() => {
            result.current.onSelectAssessment(assessment);
        });

        expect(result.current.selectedAssessment).toBe(assessment);
        expect(result.current.isDetailOpen).toBe(true);

        act(() => {
            result.current.onCloseDetail();
        });

        expect(result.current.selectedAssessment).toBeNull();
        expect(result.current.isDetailOpen).toBe(false);
    });
});
