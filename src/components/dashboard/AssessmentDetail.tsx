import {
    X,
    Calendar,
    User,
    Download,
    Edit3,
    MessageSquare
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
                <div className="p-6 border-b border-[var(--color-gray-200)] flex items-center justify-between">
                    <SheetTitle className="text-xl font-bold text-[var(--color-gray-900)]">
                        Assessment Details
                    </SheetTitle>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-[var(--color-gray-400)]">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Patient Header */}
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                            <AvatarFallback className="bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-xl font-bold">
                                {assessment.patient.initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-xl font-bold text-[var(--color-gray-900)]">
                                {assessment.patient.name}
                            </h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-gray-500)]">
                                <span className="flex items-center gap-1.5">
                                    <User className="w-4 h-4" />
                                    {assessment.patient.id}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(assessment.date)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Assessment Information Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                            Assessment Information
                        </h4>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-[var(--color-gray-500)]">Assessment Type</span>
                                <span className="font-medium text-[var(--color-gray-900)]">{assessment.type}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-[var(--color-gray-500)]">Status</span>
                                <div className="flex">
                                    <StatusBadge status={assessment.status} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-[var(--color-gray-500)]">Administered By</span>
                                <span className="font-medium text-[var(--color-gray-900)]">{assessment.administeredBy.name}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm text-[var(--color-gray-500)]">Duration</span>
                                <span className="font-medium text-[var(--color-gray-900)]">{assessment.duration || '—'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Overall Score Section */}
                    {assessment.score !== null && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                                Overall Score
                            </h4>
                            <div className="bg-[var(--color-gray-50)] rounded-xl p-8 flex flex-col items-center">
                                <ScoreGauge score={assessment.score} />
                                <div className="mt-4 px-3 py-1 bg-white border border-[var(--color-gray-200)] rounded-full text-xs font-semibold text-[var(--color-primary-700)]">
                                    {assessment.scoreInterpretation}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Subscale Scores Section */}
                    {assessment.subscales && assessment.subscales.length > 0 && (
                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                                Subscale Scores
                            </h4>
                            <div className="space-y-4">
                                {assessment.subscales.map((subscale, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-medium text-[var(--color-gray-700)]">{subscale.name}</span>
                                            <span className="font-bold text-[var(--color-gray-900)]">{subscale.score}</span>
                                        </div>
                                        {/* High logic for subscale: using same ScoreBar logic or just simple bar */}
                                        <ScoreBar score={subscale.score} showValue={false} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Clinician Notes Section */}
                    <div className="space-y-4 pb-4">
                        <h4 className="text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                            Clinician Notes
                        </h4>
                        <div className="bg-[var(--color-primary-50)] rounded-xl p-5 border border-[var(--color-primary-100)]">
                            <div className="flex items-center gap-2 mb-3 text-[var(--color-primary-700)] font-semibold text-sm">
                                <MessageSquare className="w-4 h-4" />
                                {assessment.administeredBy.name}
                            </div>
                            <p className="text-sm text-[var(--color-gray-700)] leading-relaxed italic">
                                "{assessment.notes}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[var(--color-gray-200)] flex gap-3">
                    <Button variant="outline" className="flex-1 gap-2 border-[var(--color-gray-300)] h-11">
                        <Download className="w-4 h-4" />
                        Download Report
                    </Button>
                    <Button className="flex-1 gap-2 bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white h-11">
                        <Edit3 className="w-4 h-4" />
                        Edit Assessment
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
