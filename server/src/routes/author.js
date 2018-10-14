import {Router} from 'express';
import Table from '../table';

let author = new Table('authors');
let router = Router();

router.post('/', (req, res) => {
    author.insert(req.body)
    .then(id => {
        res.json(id);
    }).catch((err) => {
        console.log(err);
    })
});


export default router;