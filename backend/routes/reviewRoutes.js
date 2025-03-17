import express from 'express';
import { 
  getReviewsByItemId, 
  addReview, 
  likeReview, 
  dislikeReview, 
  deleteReview 
} from '../controllers/reviewController.js';

const router = express.Router();

router.get('/:itemId', getReviewsByItemId);
router.post('/add', addReview);
router.patch('/like', likeReview);
router.patch('/dislike', dislikeReview);
router.delete('/delete/:reviewId', deleteReview);

export default router;
