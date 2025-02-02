import express from 'express';
import {loginUser,registerUser,adminLogin, getAllUsers, removeUser, addToCart, getUserById, getCartItems,removeFromCart, getUserItems} from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/list',getAllUsers)
userRouter.post('/remove',removeUser)
userRouter.get('/user', getUserById);
userRouter.post('/add-to-cart', addToCart);
// userRouter.post("/cart", getCartData);
userRouter.get('/:userId/cart', getCartItems);
userRouter.delete('/cart/:userId/:productId', removeFromCart);
userRouter.get("/:userId/items", getUserItems);




export default userRouter;