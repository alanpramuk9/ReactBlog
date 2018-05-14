import mailgunloader from 'mailgun-js';
import config from '../config';
//let api_key = 'cfg.mailgun_api_key';
let domain = 'sandboxe08fbb44d35e48d9aa500535b31d9d39.mailgun.org';

console.log(config);

let mailgun = mailgunloader({apiKey: config.MAILGUN_API_KEY, domain: domain });

function sendEmail(to, from, subject, content) {
    let data ={
        from,
        to, 
        subject, 
        html: content
    };
    return mailgun.messages().send(data);
}

export { sendEmail };