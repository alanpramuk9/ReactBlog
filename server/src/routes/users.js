import { Router } from 'express';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import Table from '../table';
import { generateHash } from '../utils/security';

let router = Router();

let users = new Table('authors');

router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
    res.json(req.user);
});

router.post('/', (req, res) => {
    
    generateHash(req.body.hash)
        .then((hash) => {
            users.insert({
                name: req.body.name,
                email: req.body.email,
                hash: hash
            })
        })
        .then((result) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err)
        })
})

export default router;