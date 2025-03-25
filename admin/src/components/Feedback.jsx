import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [response, setResponse] = useState('');

  const deleteFeedbackHandler = async (feedbackId) => {
    try {
      const res = await axios.delete('https://fastservice.onrender.com/abc/deleteFeedback', { data: { feedbackId } });
      setResponse(res.data.message);
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== feedbackId));
    } catch (error) {
      setResponse(error.response?.data?.message || 'Error deleting feedback');
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get('https://fastservice.onrender.com/abc/fetchFeedback');
        setFeedbacks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="max-w-3xl mx-auto p-4 sm:p-6 mt-10 space-y-4 sm:space-y-6 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2">
        <h1 className="text-2xl mt-4 sm:text-3xl font-semibold text-gray-800 text-center">Customer Feedbacks</h1>
        {feedbacks.length === 0 ? (
          <p className="text-gray-600 text-center">No feedback available</p>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback._id} className="p-3 sm:p-4 bg-white rounded-lg shadow-md border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <p className="text-xs sm:text-sm text-gray-500">{feedback.date.split('T')[0]}</p>
                <p className="text-sm sm:text-base text-gray-700 font-semibold">{feedback.name}</p>
                <button
                  onClick={() => deleteFeedbackHandler(feedback._id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  title="Delete Feedback"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              <p className="text-gray-600 text-sm sm:text-base mt-2">{feedback.text}</p>
            </div>
          ))
        )}
        {response && <p className='text-center text-green-500 text-sm sm:text-base'>{response}</p>}
      </div>
    </div>
  );
};
export default Feedback;