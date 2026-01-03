import { getScoreColors } from '@/lib/utils';

interface ScoreGaugeProps {
    score: number;
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
    const colors = getScoreColors(score);

    // Calculate stroke-dasharray for a semicircle
    // Circumference of a circle with radius 40 is 2 * PI * 40 = 251.3
    // Semicircle is 125.6
    // Offset for the fill: 125.6 * (1 - score/100)
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const semiCircumference = circumference / 2;
    const dashOffset = semiCircumference * (1 - score / 100);

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-48 h-24 overflow-hidden">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                    {/* Background Arc */}
                    <path
                        d="M 10 50 A 40 40 0 0 1 90 50"
                        fill="none"
                        stroke="var(--color-gray-200)"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />
                    {/* Score Fill Arc */}
                    <path
                        d="M 10 50 A 40 40 0 0 1 90 50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeLinecap="round"
                        className={`transition-all duration-1000 ease-out ${colors.text.replace('text-', 'stroke-')}`}
                        style={{
                            strokeDasharray: `${semiCircumference} ${circumference}`,
                            strokeDashoffset: dashOffset,
                        }}
                    />
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
                    <span className="text-4xl font-bold text-[var(--color-gray-900)] leading-none">
                        {score}
                    </span>
                </div>
            </div>
            <div className="mt-2 text-sm font-medium text-[var(--color-gray-500)]">
                Composite Score
            </div>
        </div>
    );
}
