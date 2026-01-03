import { Eye, Download, MoreVertical, FileText } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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

export function AssessmentTable({ assessments, onRowClick }: AssessmentTableProps) {
    if (assessments.length === 0) {
        return (
            <div className="p-12 text-center">
                <p className="text-[var(--color-gray-500)]">No assessments found matching your criteria.</p>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-[var(--color-gray-50)] hover:bg-[var(--color-gray-50)]">
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider pl-6">
                        Patient
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                        Assessment Type
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                        Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                        Score
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                        Date
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-[var(--color-gray-500)] uppercase tracking-wider pr-6">
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
                        <TableCell className="pl-6">
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
                        </TableCell>

                        {/* Assessment Type Cell */}
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-md bg-[var(--color-gray-100)] flex items-center justify-center">
                                    <FileText className="w-3.5 h-3.5 text-[var(--color-gray-600)]" />
                                </div>
                                <span className="font-medium text-[var(--color-gray-800)]">
                                    {assessment.type}
                                </span>
                            </div>
                        </TableCell>

                        {/* Status Cell */}
                        <TableCell>
                            <StatusBadge status={assessment.status} />
                        </TableCell>

                        {/* Score Cell */}
                        <TableCell>
                            <ScoreBar score={assessment.score} />
                        </TableCell>

                        {/* Date Cell */}
                        <TableCell>
                            <div className="flex flex-col gap-0.5">
                                <span className="font-medium text-[var(--color-gray-800)]">
                                    {formatDate(assessment.date)}
                                </span>
                                <span className="text-xs text-[var(--color-gray-500)]">
                                    {formatTime(assessment.date)}
                                </span>
                            </div>
                        </TableCell>

                        {/* Actions Cell */}
                        <TableCell className="pr-6" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 text-[var(--color-gray-400)] hover:text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]"
                                    title="View Details"
                                >
                                    <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 text-[var(--color-gray-400)] hover:text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]"
                                    title="Download Report"
                                >
                                    <Download className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 text-[var(--color-gray-400)] hover:text-[var(--color-gray-700)] hover:bg-[var(--color-gray-100)]"
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
