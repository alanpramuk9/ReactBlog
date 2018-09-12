import { Router } from 'express';
import passport from 'passport';
import { encode } from '../utils/tokens';
import {generateHash } from '../utils/security';
let router = Router();

//login route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, token, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else if (!token) {
            return res.status(401).json(info);
        } else {
            return res.status(201).json(token);
        }
    })(req, res, next);
});

//securing the route
router.get('/generate/:pw', (req, res, next) => {
    generateHash(req.params.pw)
    .then((hash) =>{
        res.send(hash);
    }).catch((err) => {
        next(err)
    })
})

//checking if user can signup
router.post('/signup', (req, res, next) => {
    passport.authenticate('local', (err, token, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else if (!token) {
            return res.status(401).json(info);
        } else {
            return res.status(201).json(token);
        }
    })(req, res, next);
});
export default router;
