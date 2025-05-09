import express from 'express';

import { 
  addCategory, 
  changeCategoryStatus, 
  fetchCategories, 
  deleteCategory, 
  fetchProductsByCategory,
  getCategoryNameById
} from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.post('/add', addCategory);
categoryRouter.put('/status', changeCategoryStatus);
categoryRouter.get('/list', fetchCategories);
categoryRouter.delete('/:id', deleteCategory);
categoryRouter.post("/by-category", fetchProductsByCategory);
categoryRouter.post("/getone", getCategoryNameById);


export default categoryRouter;
