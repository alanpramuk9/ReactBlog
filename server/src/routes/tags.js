import { Router } from 'express';
import Table from '../table';
let router = Router();

let blogs = new Table('blogs');
let tags = new Table('tags');
let blogTags = new Table('blogTags');

router.get('/:id?', (req, res) => {
    let id = req.params.id;

    if (!id) {
    tags.getAll()
        .then((tags) => {
            res.json(tags);
        });
    
    } else {
        tags.getOne(id)
            .then((tag) => {
                res.json(tag);
        });
    }
});
 
export default router;