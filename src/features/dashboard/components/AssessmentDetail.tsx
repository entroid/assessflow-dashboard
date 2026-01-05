import {
    Calendar,
    Download,
    Edit3,
    IdCard,
    NotebookPen
} from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTitle,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { ScoreGauge } from './ScoreGauge';
import { ScoreBar } from './ScoreBar';
import { formatDate } from '@/lib/utils';
import type { AssessmentDetailProps } from '@/types';

export function AssessmentDetail({ assessment, isOpen, onClose }: AssessmentDetailProps) {
    if (!assessment) return null;

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-[500px] p-0 flex flex-col gap-0 border-l border-[var(--color-gray-200)]">
                {/* Header */}
                <div className="p-[var(--space-6)] border-b border-[var(--color-gray-200)]">
                    <SheetTitle className="text-xl font-bold text-[var(--color-gray-900)]">
                        Assessment Details
                    </SheetTitle>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-[var(--space-6)] space-y-[var(--space-8)]">
                    {/* Patient Header */}
                    <div className="flex gap-[var(--space-4)] items-center pb-[var(--space-6)] border-b border-[var(--color-gray-200)]">
                        <Avatar className="w-14 h-14">
                            <AvatarFallback className="bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-xl font-bold">
                                {assessment.patient.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-[var(--space-1)]">
                            <h3 className="text-xl font-bold text-[var(--color-gray-900)]">
                                {assessment.patient.name}
                            </h3>
                            <div className="flex flex-wrap gap-x-[var(--space-4)] gap-y-[var(--space-1)] text-sm text-[var(--color-gray-500)]">
                                <span className="flex items-center gap-[var(--space-2)]">
                                    <IdCard className="w-4 h-4" />
                                    {assessment.patient.id}
                                </span>
                                <span className="flex items-center gap-[var(--space-2)]">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(assessment.date)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Assessment Information Section */}
                    <div className="space-y-[var(--space-4)]">
                        <h4 className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                            Assessment Information
                        </h4>
                        <div className="grid grid-cols-2 gap-x-[var(--space-8)] gap-y-[var(--space-6)]">
                            <div className="flex flex-col gap-[var(--space-1)]">
                                <span className="text-xs text-[var(--color-gray-500)]">Assessment Type</span>
                                <span className="font-medium text-[var(--color-gray-900)] text-sm">{assessment.type}</span>
                            </div>
                            <div className="flex flex-col gap-[var(--space-1)]">
                                <span className="text-sm text-[var(--color-gray-500)]">Status</span>
                                <div className="flex w-full">
                                    <StatusBadge className="w-full" status={assessment.status} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-[var(--space-1)]">
                                <span className="text-sm text-[var(--color-gray-500)]">Administered By</span>
                                <span className="font-medium text-[var(--color-gray-900)] text-sm">{assessment.administeredBy.name}</span>
                            </div>
                            <div className="flex flex-col gap-[var(--space-1)]">
                                <span className="text-sm text-[var(--color-gray-500)]">Duration</span>
                                <span className="font-medium text-[var(--color-gray-900)] text-sm">{assessment.duration || '—'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Overall Score Section */}
                    {assessment.score !== null && (
                        <div className="space-y-[var(--space-4)]">
                            <h4 className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                                Overall Score
                            </h4>
                            <div className="bg-[var(--color-gray-50)] rounded-xl p-[var(--space-8)] flex flex-col items-center">
                                <ScoreGauge score={assessment.score} />
                                <div className="mt-[var(--space-4)] px-[var(--space-3)] py-[var(--space-1)] bg-white border border-[var(--color-gray-200)] rounded-full text-xs font-semibold text-[var(--color-primary-700)]">
                                    {assessment.scoreInterpretation}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Subscale Scores Section */}
                    {assessment.subscales && assessment.subscales.length > 0 && (
                        <div className="space-y-[var(--space-4)]">
                            <h4 className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                                Subscale Scores
                            </h4>
                            <div className="space-y-[var(--space-4)]">
                                {assessment.subscales.map((subscale, index) => (
                                    <div key={index} className="space-y-[var(--space-2)]">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-medium text-[var(--color-gray-700)]">{subscale.name}</span>
                                            <span className="font-bold text-[var(--color-gray-900)]">{subscale.score}</span>
                                        </div>
                                        {/* High logic for subscale: using same ScoreBar logic or just simple bar */}
                                        <ScoreBar className="w-full" score={subscale.score} showValue={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Clinician Notes Section */}
                    <div className="space-y-[var(--space-4)] pb-[var(--space-4)]">
                        <h4 className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                            Clinician Notes
                        </h4>
                        <div className="bg-[var(--color-gray-50)] rounded-xl p-[var(--space-5)] ">
                            <div className="flex items-center gap-[var(--space-2)] mb-[var(--space-3)]  font-semibold text-sm">
                                <NotebookPen className="w-4 h-4" />
                                {assessment.administeredBy.name}
                            </div>
                            <p className="text-sm text-[var(--color-gray-700)] leading-relaxed ">
                                {assessment.notes}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-[var(--space-6)] border-t border-[var(--color-gray-200)] flex gap-[var(--space-3)] bg-[var(--color-gray-50)] ">
                    <Button variant="outline" className="cursor-pointer flex-1 gap-[var(--space-2)] border-[var(--color-gray-300)] h-11">
                        <Download className="w-4 h-4" />
                        Download Report
                    </Button>
                    <Button className="cursor-pointer flex-1 gap-[var(--space-2)] bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white h-11">
                        <Edit3 className="w-4 h-4" />
                        Edit Assessment
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
