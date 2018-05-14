import mailgunloader from 'mailgun-js';
import cfg from '../config/env/development';
//let api_key = 'cfg.mailgun_api_key';
let api_key = 'key-5307bc90cff63a3a5707307a7984ea19';
let domain = 'sandboxe08fbb44d35e48d9aa500535b31d9d39.mailgun.org';

let mailgun = mailgunloader({apiKey: api_key, domain: domain });

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