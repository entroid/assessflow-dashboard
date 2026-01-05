import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: React.ReactNode;
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center p-[var(--space-12)]",
                className
            )}
        >
            <div className="w-12 h-12 rounded-full bg-[var(--color-gray-100)] flex items-center justify-center mb-[var(--space-4)]">
                <Icon className="w-6 h-6 text-[var(--color-gray-400)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-gray-900)] mb-[var(--space-2)]">
                {title}
            </h3>
            <p className="text-sm text-[var(--color-gray-500)] max-w-sm mb-[var(--space-6)]">
                {description}
            </p>
            {action && (
                <div>
                    {action}
                </div>
            )}
        </div>
    );
}
