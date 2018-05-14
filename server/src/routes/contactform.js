import { Router } from 'express';
import { sendEmail } from '../utils/mail';
let router = Router()

router.post('/', (req, res, next) => {
    let messageBody = `Name: ${req.body.name}
                       Email: ${req.body.email}
                       Message: ${req.body.message}`;
    sendEmail('alanpramuk9@gmail.com', 'no-reply-mg@covalence.io', 'New Contact Form', messageBody)
    .then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        next(err);
    })
})
export default router;