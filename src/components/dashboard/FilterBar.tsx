import { Search, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { FilterBarProps } from '@/types';

export function FilterBar({
    filters,
    onFilterChange,
    assessmentTypes,
    statusOptions
}: FilterBarProps) {
    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 flex-wrap">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px] max-w-full md:max-w-[320px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-gray-400)] pointer-events-none" />
                <Input
                    type="text"
                    placeholder="Search patients or assessments..."
                    value={filters.search}
                    onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                    className="pl-10 h-10 border-[var(--color-gray-300)] focus:border-[var(--color-primary-500)] focus:ring-[var(--color-primary-100)]"
                />
            </div>

            {/* Status Filter */}
            <Select
                value={filters.status || 'all'}
                onValueChange={(value) => onFilterChange({ ...filters, status: value === 'all' ? '' : value as typeof filters.status })}
            >
                <SelectTrigger className="w-full md:w-[140px] h-10 border-[var(--color-gray-300)]">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select
                value={filters.type || 'all'}
                onValueChange={(value) => onFilterChange({ ...filters, type: value === 'all' ? '' : value as typeof filters.type })}
            >
                <SelectTrigger className="w-full md:w-[160px] h-10 border-[var(--color-gray-300)]">
                    <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {assessmentTypes.map((type) => (
                        <SelectItem key={type.code} value={type.code}>
                            {type.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Date Filter Button */}
            <Button
                variant="outline"
                className="h-10 gap-2 border-[var(--color-gray-300)] text-[var(--color-gray-700)] font-medium hover:border-[var(--color-gray-400)]"
            >
                <Calendar className="w-4 h-4 text-[var(--color-gray-500)]" />
                Last 30 days
            </Button>
        </div>
    );
}
