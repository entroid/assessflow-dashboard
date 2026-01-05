import { getScoreColors, cn } from '@/lib/utils';

interface ScoreBarProps {
    score: number | null;
    showValue?: boolean;
    className?: string;
}

export function ScoreBar({ score, showValue = true, className }: ScoreBarProps) {
    if (score === null) {
        return (
            <div className="flex items-center gap-[var(--space-2)]">
                <span className="text-[13px] font-semibold text-[var(--color-gray-400)]">—</span>
            </div>
        );
    }

    const colors = getScoreColors(score);

    return (
        <div className="flex items-center gap-[var(--space-2)]">
            <div className={cn("h-1.5 bg-[var(--color-gray-200)] rounded-full overflow-hidden", className)}>
                <div
                    className={`h-full rounded-full transition-all duration-300 ${colors.bar}`}
                    style={{ width: `${score}%` }}
                />
            </div>
            {showValue && (
                <span className={`text-[13px] font-semibold min-w-[36px] ${colors.text}`}>
                    {score}
                </span>
            )}
        </div>
    );
}
