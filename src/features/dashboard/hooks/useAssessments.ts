import { useState, useMemo, useEffect } from 'react';
import assessmentData from '@/data/assessments.json';
import { filterAssessments, paginateItems } from '@/lib/utils';
import type { Assessment, FilterState, AssessmentData } from '@/types';

const PAGE_SIZE = 5;

const data = assessmentData as AssessmentData;

export function useAssessments() {
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        status: '',
        type: '',
        last30Days: false,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);

    // Simulate network delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // Filter assessments based on current filters
    const filteredAssessments = useMemo(() => {
        return filterAssessments(data.assessments, filters);
    }, [filters]);

    // Paginate filtered results
    const paginatedAssessments = useMemo(() => {
        return paginateItems(filteredAssessments, currentPage, PAGE_SIZE);
    }, [filteredAssessments, currentPage]);

    // Reset to page 1 when filters change
    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSelectAssessment = (assessment: Assessment) => {
        setSelectedAssessment(assessment);
    };

    const handleCloseDetail = () => {
        setSelectedAssessment(null);
    };

    return {
        // Data
        stats: data.stats,
        assessments: paginatedAssessments,
        totalAssessments: filteredAssessments.length,
        assessmentTypes: data.assessmentTypes,
        statusOptions: data.statusOptions,

        // State
        isLoading,
        filters,
        currentPage,
        pageSize: PAGE_SIZE,
        selectedAssessment,
        isDetailOpen: selectedAssessment !== null,

        // Actions
        onFilterChange: handleFilterChange,
        onPageChange: handlePageChange,
        onSelectAssessment: handleSelectAssessment,
        onCloseDetail: handleCloseDetail,
    };
}
