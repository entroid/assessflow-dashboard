import { getScoreColors } from '@/lib/utils';

interface ScoreBarProps {
    score: number | null;
    showValue?: boolean;
}

export function ScoreBar({ score, showValue = true }: ScoreBarProps) {
    if (score === null) {
        return (
            <div className="flex items-center gap-2.5">
                <span className="text-[13px] font-semibold text-[var(--color-gray-400)]">—</span>
            </div>
        );
    }

    const colors = getScoreColors(score);

    return (
        <div className="flex items-center gap-2.5">
            <div className="w-[60px] h-1.5 bg-[var(--color-gray-200)] rounded-full overflow-hidden">
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
