import Agent from '../services/RequestInstance';
import { ServerError } from '../utils/helpers';

import config from '../config/Config';

const BACKEND_URL = config.BACKEND_URL;

function getDashBoardData(cb) {
  Agent
    .fire('get', `${BACKEND_URL}/dashboard/data`)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}


function getUsersList(payload, cb) {
  Agent
    .fire('get', `${BACKEND_URL}/user/list`)
    .query(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}


function addCancellationReason(payload, cb) {
  Agent
    .fire('post', `${BACKEND_URL}/cancellationReason`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}

function getParticularCancellationReason(id, cb) {
  Agent
    .fire('get', `${BACKEND_URL}/cancellationReason/${id}`)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
function editCancellationReason(payload, id, cb) {
  Agent
    .fire('patch', `${BACKEND_URL}/cancellationReason/${id}`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
function block(payload, id, cb) {
  Agent
    .fire('post', `${BACKEND_URL}/block/${id}`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}

function deleteCancellationReason(id, cb) {
    Agent
      .fire('delete', `${BACKEND_URL}/cancellationReason/${id}`)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
export default {
    getUsersList,
    addCancellationReason,
    getParticularCancellationReason,
    editCancellationReason,
    deleteCancellationReason,
    getDashBoardData,
    block
}