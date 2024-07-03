import React, { useState } from 'react';
import Profile from '../assets/profileicon.jpg';
import ReactMarkdown from 'react-markdown';

const ReviewsSection = ({ reviews }) => {
  const [expandedReviews, setExpandedReviews] = useState([]);
  const [loadedReviews, setLoadedReviews] = useState(3);

  const toggleExpandReview = (index) => {
    setExpandedReviews((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const loadMoreReviews = () => {
    setLoadedReviews((prev) => prev + 3);
  };

  return (
    <div className="w-4/5 mt-10">
      <h2 className="text-white text-2xl font-bold mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.slice(0, loadedReviews).map((review, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={Profile}
                    alt={review.author}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  {console.log(review.author_details.avatar_path)}
                  <div className="text-white font-semibold">{review.author}</div>
                </div>
                <div className="text-gray-400 text-sm">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="text-sky-500 mt-2">
                {review.author_details.rating
                  ? '★'.repeat(review.author_details.rating)
                  : 'No rating'}
              </div>
              <div className="text-gray-200 text-[16px] mt-2">
                <ReactMarkdown skipHtml={true}>
                  {review.content.length > 300 && !expandedReviews.includes(index)
                    ? review.content.slice(0, 200) + '...'
                    : review.content}
                </ReactMarkdown>
              </div>
              {review.content.length > 300 && (
                <button
                  onClick={() => toggleExpandReview(index)}
                  className="text-blue-400 mt-2"
                >
                  {expandedReviews.includes(index) ? 'Show Less' : 'More'}
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-400">No reviews available</div>
        )}
      </div>
      {loadedReviews < reviews.length && (
        <button onClick={loadMoreReviews} className="text-blue-400 mt-4">
          Load More Reviews
        </button>
      )}
    </div>
  );
};

export default ReviewsSection;
