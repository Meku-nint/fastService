import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedbackResponse, setFeedbackResponse] = useState('');
  const [feedback, setFeedback] = useState({
    text: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const feedbackHandler = (event) => {
    const { name, value } = event.target;
    setFeedback((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const feedbackPost = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:3000/abc/feedback', feedback);
      setFeedbackResponse(res.data.message);
      setFeedback({
        text: '',
        name: ''
      });
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-16">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">We Value Your Feedback</h2>
      
      <form onSubmit={feedbackPost} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={feedback.name}
            required
            onChange={feedbackHandler}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="text" className="block text-lg font-semibold text-gray-700 mb-2">Your Feedback:</label>
          <textarea
            name="text"
            value={feedback.text}
            cols="40"
            rows="4"
            required
            minLength={20}
            maxLength={500}
            onChange={feedbackHandler}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter your feedback (min 20 characters)"
          />
        </div>

        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 ${isLoading ? 'bg-gray-400' : 'hover:bg-blue-700'}`}
        >
          {isLoading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
      {feedbackResponse && (
        <div className="mt-6 text-green-600 text-center text-lg font-semibold">{feedbackResponse}</div>
      )}
    </div>
  );
};
export default Feedback;
