import { Eye, Download, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { ScoreBar } from './ScoreBar';
import { formatDateTime } from '@/lib/utils';
import type { Assessment } from '@/types';

interface AssessmentCardProps {
    assessment: Assessment;
    onClick: () => void;
}

export function AssessmentCard({ assessment, onClick }: AssessmentCardProps) {
    return (
        <div
            className="bg-white border border-[var(--color-gray-200)] rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={onClick}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-[var(--color-gray-100)] text-[var(--color-gray-600)] text-sm font-semibold">
                            {assessment.patient.initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-[var(--color-gray-900)]">
                            {assessment.patient.name}
                        </span>
                        <span className="text-xs text-[var(--color-gray-500)]">
                            {assessment.patient.id}
                        </span>
                    </div>
                </div>
                <StatusBadge status={assessment.status} />
            </div>

            {/* Body */}
            <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-gray-500)]">Assessment</span>
                    <span className="text-sm font-medium text-[var(--color-gray-900)]">{assessment.type}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-gray-500)]">Score</span>
                    <ScoreBar score={assessment.score} />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--color-gray-500)]">Date</span>
                    <span className="text-sm font-medium text-[var(--color-gray-900)]">
                        {formatDateTime(assessment.date)}
                    </span>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--color-gray-100)]" onClick={(e) => e.stopPropagation()}>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-[13px] h-8 border-[var(--color-gray-300)]"
                >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                </Button>
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-[var(--color-gray-400)] hover:text-[var(--color-gray-700)]"
                        title="Download Report"
                    >
                        <Download className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-[var(--color-gray-400)] hover:text-[var(--color-gray-700)]"
                        title="More Options"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
