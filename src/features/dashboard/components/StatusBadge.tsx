import { cn } from '@/lib/utils';
import type { AssessmentStatus } from '@/types';
import { getStatusLabel, getStatusColors } from '@/lib/utils';

interface StatusBadgeProps {
    status: AssessmentStatus;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const colors = getStatusColors(status);
    const label = getStatusLabel(status);

    return (
        <span className={cn(
            "inline-flex items-center gap-[var(--space-1)] px-[var(--space-2)] py-[var(--space-1)] text-xs font-medium rounded-full",
            colors.bg,
            colors.text,
            className
        )}>
            <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
            {label}
        </span>
    );
}
