import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Review.css';
import Title from './Title';
import { FaThumbsUp, FaThumbsDown, FaTrash } from 'react-icons/fa';

const Review = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [username, setUsername] = useState('');

  const userId = localStorage.getItem("userId");

  // Fetch reviews and username on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/reviews/${productId}`);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchUsername = async () => {
      if (!userId) return;
      try {
        const { data } = await axios.get(`http://localhost:4000/api/user/user?id=${userId}`);
        setUsername(data.user.name);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchReviews();
    fetchUsername();
  }, [productId, userId]);

  // Add review
  const handleAddReview = async () => {
    if (!comment.trim()) return toast.error("Review cannot be empty!");
    if (!userId || !username) return toast.error("You must be logged in to submit a review!");

    try {
      const { data } = await axios.post("http://localhost:4000/api/reviews/add", {
        itemId: productId,
        userId,
        username,
        comment,
        rating,
      });

      setReviews([data.review, ...reviews]);
      setComment('');
      toast.success("Review added!");
    } catch (error) {
      toast.error("Error adding review!");
    }
  };

  // Like review
  const handleLike = async (reviewId) => {
    if (!userId) return toast.error("You need to be logged in to like a review!");

    try {
      const { data } = await axios.patch("http://localhost:4000/api/reviews/like", {
        reviewId,
        userId,
      });

      setReviews(reviews.map(review =>
        review._id === reviewId ? { ...review, likes: data.likes, dislikes: data.dislikes } : review
      ));
    } catch (error) {
      toast.error("Error liking review!");
    }
  };

  // Dislike review
  const handleDislike = async (reviewId) => {
    if (!userId) return toast.error("You need to be logged in to dislike a review!");

    try {
      const { data } = await axios.patch("http://localhost:4000/api/reviews/dislike", {
        reviewId,
        userId,
      });

      setReviews(reviews.map(review =>
        review._id === reviewId ? { ...review, likes: data.likes, dislikes: data.dislikes } : review
      ));
    } catch (error) {
      toast.error("Error disliking review!");
    }
  };

  // Delete review
  const handleDelete = async (reviewId) => {
    if (!userId) return toast.error("You need to be logged in to delete a review!");

    try {
      const { data } = await axios.delete(`http://localhost:4000/api/reviews/delete/${reviewId}`, {
        data: { userId },
      });

      if (data.message) {
        setReviews(reviews.filter(review => review._id !== reviewId));
        toast.success("Review deleted successfully!");
      }
    } catch (error) {
      toast.error("Error deleting review!");
    }
  };

  return (
    <div>
      <Title text1={'CUSTOMER'} text2={'REVIEWS'}></Title>

      <div className="review-section">
        <div className="review-input">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a review..."
          />
          <button onClick={handleAddReview}>Submit</button>
        </div>

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          // Sort reviews by most likes before displaying
          [...reviews]
            .sort((a, b) => b.likes - a.likes) // Sort in descending order
            .map(review => (
              <div key={review._id} className="review-card">
                <p><strong>{review.username}</strong>: {review.comment}</p>
                <div className="review-actions">
                  <button onClick={() => handleLike(review._id)}>
                    <FaThumbsUp /> {review.likes}
                  </button>
                  <button onClick={() => handleDislike(review._id)}>
                    <FaThumbsDown /> {review.dislikes}
                  </button>
                  {review.userId === userId && (
                    <button onClick={() => handleDelete(review._id)} className="delete-button">
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Review;
