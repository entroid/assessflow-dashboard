import { FileText, CheckCircle, Clock, Users, TrendingUp, TrendingDown } from 'lucide-react';
import type { StatsCardProps } from '@/types';

const iconMap = {
    document: FileText,
    check: CheckCircle,
    clock: Clock,
    users: Users,
};

const colorMap = {
    blue: {
        bg: 'bg-[var(--color-primary-50)]',
        text: 'text-[var(--color-primary-600)]',
    },
    green: {
        bg: 'bg-[var(--color-success-50)]',
        text: 'text-[var(--color-success-500)]',
    },
    yellow: {
        bg: 'bg-[var(--color-warning-50)]',
        text: 'text-[var(--color-warning-500)]',
    },
    purple: {
        bg: 'bg-[var(--color-purple-50)]',
        text: 'text-[var(--color-purple-500)]',
    },
};

export function StatsCard({ label, value, trend, icon, iconColor }: StatsCardProps) {
    const Icon = iconMap[icon];
    const colors = colorMap[iconColor];

    return (
        <div className="bg-white border border-[var(--color-gray-200)] rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.bg}`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                {trend !== undefined && (
                    <span className={`flex items-center gap-1 text-xs font-medium ${trend >= 0 ? 'text-[var(--color-success-500)]' : 'text-[var(--color-error-500)]'
                        }`}>
                        {trend >= 0 ? (
                            <TrendingUp className="w-3.5 h-3.5" />
                        ) : (
                            <TrendingDown className="w-3.5 h-3.5" />
                        )}
                        {Math.abs(trend)}%
                    </span>
                )}
            </div>
            <div className="text-[32px] font-bold text-[var(--color-gray-900)] tracking-tight leading-none">
                {value}
            </div>
            <div className="text-[13px] text-[var(--color-gray-500)]">
                {label}
            </div>
        </div>
    );
}
