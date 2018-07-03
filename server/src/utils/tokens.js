import uuidv4 from 'uuid/v4';
import { createCipher, createDecipher } from 'crypto';
const ALGORITHM = 'aes-256-ctr';
const SECRET = 'aardvark';

function encode(value) {
    const cipher = createCipher(ALGORITHM, SECRET);
    let encoded = cipher.update(`${uuidv4()}_${value}`, 'ascii', 'base64');
    encoded += cipher.final('base64');

    return encoded;
}

function decode(value) {
    const decipher = createDecipher(ALGORITHM, SECRET);
    let decoded = decipher.update(value, 'base64', 'ascii');
    decoded += decipher.final('ascii');
    const tokenSplit = decoded.split('_');

    tokenSplit.shift();

    return tokenSplit.join('_');
}   

export { encode, decode };