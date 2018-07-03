import { Router } from 'express';
import blogRouter from './blogs';
import authRouter from './auth';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw'
import usersRouter from './users';
import authorRouter from './author';
import contactRouter from './contactform';
import stripeDonationsRouter from './stripeDonations';

let router = Router();

router.use('/auth', authRouter);
router.use('/donate', stripeDonationsRouter);
router.use('/contact', contactRouter );
router.route('/blogs')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.route('/auth')
    .post(tokenMiddleware, isLoggedIn);
router.use('/blogs', blogRouter );
router.use('/users', usersRouter);
router.use('/author', authorRouter);
export default router;