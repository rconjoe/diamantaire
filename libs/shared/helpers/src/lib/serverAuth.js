import crypto from 'crypto';
import CryptoJS from 'crypto-js'; //webkpack does not work with node crypto API
import getEnvConfig from '../env';
const { SIGNING_SECRET } = getEnvConfig();

/**
 * Function to be used as a middleware on some routes for authentication and data integrity
 * Each request from the client will contain a timestamp and the HMAC signature in the header
 * The HMAC is created from the payload along with the timestamp for extra security
 * @param {} req header containing the signature and timestamp
 * @param {*} res http response
 * @param {*} next return the next function
 * @returns
 */
export const verifySignature = (req, res, next) => {
  const checksum = req.headers['x-signature']; //signature
  const timestamp = req.headers['x-timestamp'];
  const payload = JSON.stringify(req.body);
  const time = Math.floor(new Date().getTime() / 1000);

  //make the time short, so the same timestamp can't be used in another request
  if (Math.abs(time - timestamp) > 30) {
    return res.status(400).send('timestamp too far in the past');
  }

  if (!checksum || !timestamp) {
    return res.status(400).send('Missing fields');
  }

  const payloadString = 'vo:' + timestamp + ':' + payload;
  const hmac = crypto.createHmac('sha256', SIGNING_SECRET);
  const digest = hmac.update(payloadString, 'utf-8').digest('hex');

  const digestBuffer = Buffer.from(digest, 'utf-8');
  const checksumBuffer = Buffer.from(checksum, 'utf-8');

  //compare signatures...
  // use the same amout of time to compare the clients checksum and the servers digest - can prevent timing attacks
  if (
    digestBuffer.length === checksumBuffer.length &&
    crypto.timingSafeEqual(digestBuffer, checksumBuffer)
  ) {
    next();
  } else {
    return res.status(400).send('Verification failed');
  }
};

/**
 * Use on the client side to generate an HMAC signature
 * @param {} payload request containing the data
 * @returns a timestamp and the hmac signature
 */
export const createClientHMACAuth = paylod => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const payloadData = JSON.stringify(paylod);
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SIGNING_SECRET);
  const payloadString = 'vo:' + timestamp + ':' + payloadData;
  const digest = hmac.update(payloadString).finalize();

  return {
    timestamp: timestamp,
    signature: digest,
  };
};
