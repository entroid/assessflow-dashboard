import type { AssessmentDetailProps } from '@/types';

// Placeholder - to be fully implemented in next phase
export function AssessmentDetail({ assessment, isOpen, onClose }: AssessmentDetailProps) {
    if (!isOpen || !assessment) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            {/* Panel */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Assessment Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                <p className="text-gray-600">
                    Detail panel for: <strong>{assessment.patient.name}</strong>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    (Full implementation in next phase)
                </p>
            </div>
        </div>
    );
}
