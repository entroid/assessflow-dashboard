# AssessFlow Dashboard

A professional, responsive Patient Assessment Dashboard built with React, TypeScript, and Tailwind CSS. This project demonstrates a mobile-first approach to complex medical data visualization and management.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Local Installation
1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd assessflow-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```

## 🛠️ Tech Stack
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Components:** ShadCN UI (Primitives)
- **Icons:** Lucide React

## 💡 Engineering Approach

### 1. Feature-Based Architecture
The project follows a modular "Feature-Based Architecture". Instead of grouping files purely by type (components, hooks), related logic is grouped into functional features (e.g., `src/features/dashboard`). This makes the codebase highly scalable and easier to maintain as new domains (Patients, Reports) are added.

### 2. Design System & Tokens
A robust design system was implemented using CSS custom properties (`--space-1`, `--color-primary-600`, etc.). This ensures pixel-perfect consistency with the design specification across padding, margins, and visual elements while allowing for easy theme updates.

### 3. Responsive Strategy
The dashboard uses a layout-switching strategy:
- **Desktop:** A high-density data table with detailed actions.
- **Mobile:** A card-based list view optimized for touch and smaller viewports.
- **Shared Primitives:** Common data badges and score visualizations are shared across both layouts.

## 🧠 Key Decisions & Assumptions
- **Client-Side Processing:** As the project currently uses mock data, all filtering, searching, and pagination logic is handled in the frontend via a custom `useAssessments` hook.
- **Tailwind 4 Integration:** Leveraged the latest Tailwind CSS 4 features, including simplified configuration and better support for CSS variables.
- **Accessibility:** Built on top of Radix primitives (via ShadCN) to ensure proper keyboard navigation and screen reader support for complex components like the slide-over detail panel.

## ⏱️ Project Summary
- **Total Time Spent:** ~5 hours
- **Status:** Complete (Feature-complete & Verified Layout)
