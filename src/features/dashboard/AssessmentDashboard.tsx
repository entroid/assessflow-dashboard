import {
    StatsCard,
    FilterBar,
    AssessmentTable,
    AssessmentCard,
    Pagination,
    AssessmentDetail
} from './components';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Plus, ClipboardX } from 'lucide-react';
import { useAssessments } from './hooks/useAssessments';

export function AssessmentDashboard() {
    const {
        stats,
        assessments,
        totalAssessments,
        assessmentTypes,
        statusOptions,
        filters,
        currentPage,
        pageSize,
        selectedAssessment,
        isDetailOpen,
        isLoading,
        onFilterChange,
        onPageChange,
        onSelectAssessment,
        onCloseDetail,
    } = useAssessments();

    return (
        <>
            {/* Page Header */}
            <div className="mb-[var(--space-8)]">
                <div className="flex items-start justify-between gap-[var(--space-4)] mb-[var(--space-6)]">
                    <div className="flex flex-col gap-[var(--space-1)]">
                        <h1 className="text-[28px] font-bold text-[var(--color-gray-900)] tracking-tight">
                            Assessments
                        </h1>
                        <p className="text-sm text-[var(--color-gray-500)]">
                            Manage and review patient psychological assessments
                        </p>
                    </div>
                    <Button className="bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white gap-[var(--space-2)] cursor-pointer">
                        <Plus className="w-4 h-4" />
                        New Assessment
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--space-4)] mb-[var(--space-6)]">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white border border-[var(--color-gray-200)] rounded-xl p-[var(--space-5)] flex flex-col gap-[var(--space-3)]">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="w-10 h-10 rounded-lg" />
                                    <Skeleton className="w-12 h-4 rounded" />
                                </div>
                                <Skeleton className="h-8 w-16" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        ))
                    ) : (
                        <>
                            <StatsCard
                                label="Total Assessments"
                                value={stats.totalAssessments}
                                trend={stats.totalAssessmentsTrend}
                                icon="document"
                                iconColor="blue"
                            />
                            <StatsCard
                                label="Completed"
                                value={stats.completed}
                                trend={stats.completedTrend}
                                icon="check"
                                iconColor="green"
                            />
                            <StatsCard
                                label="In Progress"
                                value={stats.inProgress}
                                trend={stats.inProgressTrend}
                                icon="clock"
                                iconColor="yellow"
                            />
                            <StatsCard
                                label="Active Patients"
                                value={stats.activePatients}
                                icon="users"
                                iconColor="purple"
                            />
                        </>
                    )}
                </div>

                {/* Filter Bar */}
                <FilterBar
                    filters={filters}
                    onFilterChange={onFilterChange}
                    assessmentTypes={assessmentTypes}
                    statusOptions={statusOptions}
                />
            </div>

            {/* Table Container - Desktop */}
            <div className="hidden md:block bg-white border border-[var(--color-gray-200)] rounded-xl overflow-hidden">
                <AssessmentTable
                    assessments={assessments}
                    onRowClick={onSelectAssessment}
                    isLoading={isLoading}
                />
                <Pagination
                    pagination={{
                        currentPage,
                        pageSize,
                        totalItems: totalAssessments,
                    }}
                    onPageChange={onPageChange}
                />
            </div>

            {/* Card Layout - Mobile */}
            <div className="md:hidden space-y-[var(--space-4)]">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white border border-[var(--color-gray-200)] rounded-xl p-4 space-y-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    ))
                ) : assessments.length === 0 ? (
                    <div className="border border-dashed border-[var(--color-gray-300)] rounded-lg bg-[var(--color-gray-50)]">
                        <EmptyState
                            icon={ClipboardX}
                            title="No assessments found"
                            description="No assessments match your current filters. Try generating a new assessment or adjusting your filters."
                        />
                    </div>
                ) : (
                    assessments.map((assessment) => (
                        <AssessmentCard
                            key={assessment.id}
                            assessment={assessment}
                            onClick={() => onSelectAssessment(assessment)}
                        />
                    ))
                )}
                {!isLoading && (
                    <div className="bg-white border border-[var(--color-gray-200)] rounded-xl overflow-hidden">
                        <Pagination
                            pagination={{
                                currentPage,
                                pageSize,
                                totalItems: totalAssessments,
                            }}
                            onPageChange={onPageChange}
                        />
                    </div>
                )}
            </div>

            {/* Detail Panel */}
            {isDetailOpen && (
                <AssessmentDetail
                    assessment={selectedAssessment}
                    isOpen={isDetailOpen}
                    onClose={onCloseDetail}
                />
            )}
        </>
    );
}
