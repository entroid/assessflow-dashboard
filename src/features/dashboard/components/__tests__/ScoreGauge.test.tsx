import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScoreGauge } from '../ScoreGauge';

describe('ScoreGauge', () => {
    it('renders the score correctly', () => {
        render(<ScoreGauge score={75} />);
        expect(screen.getByText('75')).toBeInTheDocument();
        expect(screen.getByText('Composite Score')).toBeInTheDocument();
    });

    it('renders with 0 score', () => {
        render(<ScoreGauge score={0} />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders with 100 score', () => {
        render(<ScoreGauge score={100} />);
        expect(screen.getByText('100')).toBeInTheDocument();
    });
});
