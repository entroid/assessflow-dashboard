import { Header } from './Header';

interface MainLayoutProps {
    children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--bg-secondary)]">
            <Header />
            <main className="flex-1 px-[var(--space-6)] py-[var(--space-8)] w-full max-w-[1280px] mx-auto">
                {children}
            </main>
        </div>
    );
}
