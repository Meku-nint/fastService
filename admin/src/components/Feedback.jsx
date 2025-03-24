import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([{
    text: '',
    name: '',
    date: '',
  }]);
  const [response, setResponse] = useState('');

  const deleteFeedbackHandler = async (feedbackId) => {
    try {
      const res = await axios.delete('http://localhost:3000/abc/deleteFeedback', { data: { feedbackId } });
      setResponse(res.data.message);
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== feedbackId));
    } catch (error) {
      setResponse(error.response?.data?.message || 'Error deleting feedback');
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/abc/fetchFeedback');
        setFeedbacks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div>
          <NavBar/>
      <div className="max-w-3xl mx-auto p-6 mt-16 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">Customer Feedbacks</h1>
        {feedbacks.length === 0 ? (
          <p className="text-gray-600">No feedback available</p>
        ) : (
          feedbacks.map((feedback, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md space-y-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{feedback.date.split('T')[0]}</p>
                <p className="text-sm text-gray-700 font-semibold">{feedback.name}</p>
                <button
                  onClick={() => deleteFeedbackHandler(feedback._id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  title="Delete Feedback"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <p className="text-gray-600">{feedback.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;
