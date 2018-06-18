import crypto from 'crypto-browserify';

export default (s) => {
    var md5 = crypto.createHash('md5');
    return md5.update(s).digest('hex');
}