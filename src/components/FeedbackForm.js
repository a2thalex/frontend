import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitFeedback } from '../redux/actions/feedbackActions';

const FeedbackForm = ({ trackId }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitFeedback(trackId, { rating, content }));
    setContent('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Submit Feedback</h3>
      <div>
        <label>Rating: </label>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your feedback here"
        required
      />
      <button type="submit" disabled={rating === 0}>Submit</button>
    </form>
  );
};

export default FeedbackForm;
