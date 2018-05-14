import * as baseService from './base';

function sendContactEmail(name, email, message) {
    return baseService.post('/api/contact', {
        //body of post request
        name: name,
        email: email,
        message: message
    })
}

export { sendContactEmail }