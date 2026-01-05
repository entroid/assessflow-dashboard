import { Eye, Download, MoreVertical, FileText, ClipboardX } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { StatusBadge } from './StatusBadge';
import { ScoreBar } from './ScoreBar';
import { formatDate, formatTime } from '@/lib/utils';
import type { AssessmentTableProps } from '@/types';

interface ExtendedAssessmentTableProps extends AssessmentTableProps {
    isLoading?: boolean;
}

export function AssessmentTable({ assessments, onRowClick, isLoading }: ExtendedAssessmentTableProps) {
    if (isLoading) {
        return (
            <Table>
                <TableHeader>
                    <TableRow className="bg-[var(--color-gray-50)] hover:bg-[var(--color-gray-50)]">
                        <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)] pl-[var(--space-6)]">
                            Patient
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)]">
                            Assessment Type
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)]">
                            Status
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)]">
                            Score
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)]">
                            Date
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)] pr-[var(--space-6)]">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index} className="hover:bg-transparent">
                            <TableCell className="pl-[var(--space-6)] py-[var(--space-4)]">
                                <div className="flex items-center gap-[var(--space-3)]">
                                    <Skeleton className="w-10 h-10 rounded-full" />
                                    <div className="flex flex-col gap-[var(--space-2)]">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="py-[var(--space-4)]">
                                <div className="flex items-center gap-[var(--space-2)]">
                                    <Skeleton className="w-7 h-7 rounded-md" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            </TableCell>
                            <TableCell className="py-[var(--space-4)]">
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </TableCell>
                            <TableCell className="py-[var(--space-4)]">
                                <Skeleton className="h-2 w-[60px] rounded-full" />
                            </TableCell>
                            <TableCell className="py-[var(--space-4)]">
                                <div className="flex flex-col gap-[var(--space-2)]">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </TableCell>
                            <TableCell className="pr-[var(--space-6)]">
                                <div className="flex items-center gap-[var(--space-1)]">
                                    <Skeleton className="w-8 h-8 rounded-md" />
                                    <Skeleton className="w-8 h-8 rounded-md" />
                                    <Skeleton className="w-8 h-8 rounded-md" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    if (assessments.length === 0) {
        return (
            <div className="border border-dashed border-[var(--color-gray-300)] rounded-lg bg-[var(--color-gray-50)]">
                <EmptyState
                    icon={ClipboardX}
                    title="No assessments found"
                    description="No assessments match your current filters. Try generating a new assessment or adjusting your filters."
                />
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-[var(--color-gray-50)] hover:bg-[var(--color-gray-50)]">
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)] pl-[var(--space-6)]">
                        Patient
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)]">
                        Assessment Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)]">
                        Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)]">
                        Score
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)]">
                        Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider py-[var(--space-4)] pr-[var(--space-6)]">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {assessments.map((assessment) => (
                    <TableRow
                        key={assessment.id}
                        className="cursor-pointer hover:bg-[var(--color-gray-50)] transition-colors"
                        onClick={() => onRowClick(assessment)}
                    >
                        {/* Patient Cell */}
                        <TableCell className="pl-[var(--space-6)] py-[var(--space-4)]">
                            <div className="flex items-center gap-[var(--space-3)]">
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback className="bg-[var(--color-gray-100)] text-[var(--color-gray-600)] text-sm font-semibold">
                                        {assessment.patient.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-[var(--space-1)]">
                                    <span className="font-semibold text-[var(--color-gray-900)]">
                                        {assessment.patient.name}
                                    </span>
                                    <span className="text-xs text-[var(--color-gray-500)]">
                                        {assessment.patient.id}
                                    </span>
                                </div>
                            </div>
                        </TableCell>

                        {/* Assessment Type Cell */}
                        <TableCell className="py-[var(--space-4)]">
                            <div className="flex items-center gap-[var(--space-2)]">
                                <div className="w-7 h-7 rounded-md bg-[var(--color-gray-100)] flex items-center justify-center">
                                    <FileText className="w-3.5 h-3.5 text-[var(--color-gray-600)]" />
                                </div>
                                <span className="font-medium text-[var(--color-gray-800)]">
                                    {assessment.type}
                                </span>
                            </div>
                        </TableCell>

                        {/* Status Cell */}
                        <TableCell className="py-[var(--space-4)]">
                            <StatusBadge status={assessment.status} />
                        </TableCell>

                        {/* Score Cell */}
                        <TableCell className="py-[var(--space-4)]">
                            <ScoreBar className="w-[60px]" score={assessment.score} />
                        </TableCell>

                        {/* Date Cell */}
                        <TableCell className="py-[var(--space-4)]">
                            <div className="flex flex-col gap-[var(--space-1)]">
                                <span className="font-medium text-[var(--color-gray-800)]">
                                    {formatDate(assessment.date)}
                                </span>
                                <span className="text-xs text-[var(--color-gray-500)]">
                                    {formatTime(assessment.date)}
                                </span>
                            </div>
                        </TableCell>

                        {/* Actions Cell */}
                        <TableCell className="pr-[var(--space-6)]" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-[var(--space-1)]">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 text-[var(--color-gray-400)] hover:text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)] cursor-pointer"
                                    title="View Details"
                                >
                                    <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 text-[var(--color-gray-400)] hover:text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)] cursor-pointer"
                                    title="Download Report"
                                >
                                    <Download className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 text-[var(--color-gray-400)] hover:text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)] cursor-pointer"
                                    title="More Options"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
