import { MainLayout } from './components/layout';
import {
  StatsCard,
  FilterBar,
  AssessmentTable,
  Pagination,
  AssessmentDetail
} from './components/dashboard';
import { Button } from './components/ui/button';
import { Plus } from 'lucide-react';

function App() {
  return (
    <MainLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] font-bold text-[var(--color-gray-900)] tracking-tight">
              Assessments
            </h1>
            <p className="text-sm text-[var(--color-gray-500)]">
              Manage and review patient psychological assessments
            </p>
          </div>
          <Button className="bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white gap-2">
            <Plus className="w-4 h-4" />
            New Assessment
          </Button>
        </div>

        {/* Stats Grid - Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />
        </div>

        {/* Filter Bar - Placeholder */}
        <FilterBar />
      </div>

      {/* Table Container - Placeholder */}
      <div className="bg-white border border-[var(--color-gray-200)] rounded-xl overflow-hidden">
        <AssessmentTable />
        <Pagination />
      </div>

      {/* Detail Panel - Placeholder */}
      <AssessmentDetail />
    </MainLayout>
  );
}

export default App;
