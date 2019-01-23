import { Router } from 'express';
import Table from '../table';

let router = Router();

const imagesTable = new Table('images');

router.get('/', (req, res) => {
    imagesTable.getAllImages()
    .then((images) => {

        let result = images.map((image) => {
            return({
                id: image.id,
                filename: image.filename.toString('utf8')
            });
        })

        console.log(result);
        res.send(result);
    })
});

export default router;