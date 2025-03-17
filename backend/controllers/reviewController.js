import Review from '../models/review.js';

// Get all reviews for a product
export const getReviewsByItemId = async (req, res) => {
  try {
    const reviews = await Review.find({ itemId: req.params.itemId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { itemId, userId, username, comment, rating } = req.body;
    const newReview = new Review({ itemId, userId, username, comment, rating });
    await newReview.save();
    res.status(201).json({ message: "Review added successfully!", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error });
  }
};

// Like a review
export const likeReview = async (req, res) => {
  try {
    const { reviewId, userId } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.likedBy.includes(userId)) {
      // If user already liked, remove like
      review.likes -= 1;
      review.likedBy = review.likedBy.filter(id => id.toString() !== userId);
    } else {
      // Remove dislike if exists, then like
      review.dislikedBy = review.dislikedBy.filter(id => id.toString() !== userId);
      review.dislikes = review.dislikedBy.length;
      
      review.likedBy.push(userId);
      review.likes = review.likedBy.length;
    }

    await review.save();
    res.json({ likes: review.likes, dislikes: review.dislikes });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const dislikeReview = async (req, res) => {
  try {
    const { reviewId, userId } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.dislikedBy.includes(userId)) {
      // If user already disliked, remove dislike
      review.dislikes -= 1;
      review.dislikedBy = review.dislikedBy.filter(id => id.toString() !== userId);
    } else {
      // Remove like if exists, then dislike
      review.likedBy = review.likedBy.filter(id => id.toString() !== userId);
      review.likes = review.likedBy.length;

      review.dislikedBy.push(userId);
      review.dislikes = review.dislikedBy.length;
    }

    await review.save();
    res.json({ likes: review.likes, dislikes: review.dislikes });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { userId } = req.body; // Ensure userId is passed from frontend

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the user deleting the review is the author
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: "Review deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};


