import express from 'express';
import {loginUser,registerUser,adminLogin, getAllUsers, removeUser} from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/list',getAllUsers)
userRouter.post('/remove',removeUser)

export default userRouter;