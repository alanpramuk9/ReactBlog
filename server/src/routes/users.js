import { Router } from 'express';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import Table from '../table';
import { generateHash } from '../utils/security';
import { isAdmin } from '../middleware/admin.mw';

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

router.get('/admin', tokenMiddleware, isAdmin, (req, res) => {
    res.json(req.user);
});

export default router;