import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackForm from '../FeedbackForm';

describe('FeedbackForm', () => {
  it('renders textarea and submit button', () => {
    render(<FeedbackForm onSubmit={() => {}} />);
    expect(screen.getByPlaceholderText(/write your feedback here/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit feedback/i })).toBeInTheDocument();
  });

  it('calls onSubmit with textarea content when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<FeedbackForm onSubmit={mockOnSubmit} />);
    
    const textarea = screen.getByPlaceholderText(/write your feedback here/i);
    const submitButton = screen.getByRole('button', { name: /submit feedback/i });

    fireEvent.change(textarea, { target: { value: 'Test feedback' } });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('Test feedback');
  });

  it('shows error message when submitting empty feedback', () => {
    render(<FeedbackForm onSubmit={() => {}} />);
    
    const submitButton = screen.getByRole('button', { name: /submit feedback/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/feedback cannot be empty/i)).toBeInTheDocument();
  });
});
