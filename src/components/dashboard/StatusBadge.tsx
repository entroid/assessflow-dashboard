import type { AssessmentStatus } from '@/types';
import { getStatusLabel, getStatusColors } from '@/lib/utils';

interface StatusBadgeProps {
    status: AssessmentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const colors = getStatusColors(status);
    const label = getStatusLabel(status);

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
            {label}
        </span>
    );
}
