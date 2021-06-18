import Agent from '../services/RequestInstance';
import { ServerError } from '../utils/helpers';

import config from '../config/Config';

const BACKEND_URL = config.BACKEND_URL;

function transferMoney(payload, cb) {
  Agent
    .fire('post', `${BACKEND_URL}/user/transfer`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}

function getHistory(payload, cb) {
  Agent
    .fire('get', `${BACKEND_URL}/ledger/history`)
    .query(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
export default {
    transferMoney,
    getHistory
}