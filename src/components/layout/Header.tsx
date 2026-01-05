import { FileText } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Header() {
    return (
        <header className="bg-white border-b border-[var(--color-gray-200)] px-[var(--space-6)] py-[var(--space-4)] sticky top-0 z-50">
            <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-[var(--space-4)]">
                {/* Logo */}
                <a href="#" className="flex items-center gap-[var(--space-2)] no-underline">
                    <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] rounded-lg flex items-center justify-center">
                        <FileText className="w-[18px] h-[18px] text-white" />
                    </div>
                    <span className="text-xl font-bold text-[var(--color-gray-900)] tracking-tight">
                        AssessFlow
                    </span>
                </a>

                {/* Navigation - Hidden on mobile */}
                <nav className="hidden md:flex items-center gap-[var(--space-2)]">
                    <a
                        href="#"
                        className="px-[var(--space-4)] py-[var(--space-2)] text-sm font-medium bg-[var(--color-primary-50)] text-[var(--color-primary-700)] rounded-md no-underline"
                    >
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="px-[var(--space-4)] py-[var(--space-2)] text-sm font-medium text-[var(--color-gray-600)] hover:bg-[var(--color-gray-100)] hover:text-[var(--color-gray-900)] rounded-md transition-colors no-underline"
                    >
                        Patients
                    </a>
                    <a
                        href="#"
                        className="px-[var(--space-4)] py-[var(--space-2)] text-sm font-medium text-[var(--color-gray-600)] hover:bg-[var(--color-gray-100)] hover:text-[var(--color-gray-900)] rounded-md transition-colors no-underline"
                    >
                        Reports
                    </a>
                    <a
                        href="#"
                        className="px-[var(--space-4)] py-[var(--space-2)] text-sm font-medium text-[var(--color-gray-600)] hover:bg-[var(--color-gray-100)] hover:text-[var(--color-gray-900)] rounded-md transition-colors no-underline"
                    >
                        Settings
                    </a>
                </nav>

                {/* User Avatar */}
                <div className="flex items-center gap-[var(--space-3)]">
                    <Avatar className="w-9 h-9 cursor-pointer hover:ring-2 hover:ring-[var(--color-primary-200)] transition-shadow">
                        <AvatarFallback className="bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-sm font-semibold">
                            DR
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
