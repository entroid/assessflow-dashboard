import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPageNumbers } from '@/lib/utils';
import type { PaginationProps } from '@/types';

export function Pagination({ pagination, onPageChange }: PaginationProps) {
    const { currentPage, pageSize, totalItems } = pagination;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    const pageNumbers = getPageNumbers(currentPage, totalPages);

    if (totalItems === 0) {
        return null;
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-[var(--space-4)] px-[var(--space-6)] py-[var(--space-4)] border-t border-[var(--color-gray-200)] bg-[var(--color-gray-50)]">
            <span className="text-[13px] text-[var(--color-gray-500)]">
                Showing {startItem}-{endItem} of {totalItems} assessments
            </span>

            <div className="flex items-center gap-[var(--space-2)]">
                {/* Previous Button */}
                <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 border-[var(--color-gray-300)]"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Button>

                {/* Page Numbers */}
                {pageNumbers.map((page, index) =>
                    page === null ? (
                        <Button
                            key={`ellipsis-${index}`}
                            variant="outline"
                            size="icon"
                            className="w-9 h-9 border-[var(--color-gray-300)]"
                            disabled
                        >
                            ...
                        </Button>
                    ) : (
                        <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            size="icon"
                            className={`w-9 h-9 ${page === currentPage
                                ? 'bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)]'
                                : 'border-[var(--color-gray-300)]'
                                }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Button>
                    )
                )}

                {/* Next Button */}
                <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 border-[var(--color-gray-300)]"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
