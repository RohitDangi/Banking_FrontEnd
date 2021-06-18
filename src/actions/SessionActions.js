// import alt from '../altInstance';
import Agent from '../services/RequestInstance';
import { ServerError } from '../utils/helpers';

import config from '../config/Config';
import Cookies from 'universal-cookie';

const cookie = new Cookies();
const BACKEND_URL = config.BACKEND_URL;

function signIn(payload, cb) {
    console.log("payload",payload);
  Agent
    .fire('post', `${BACKEND_URL}/auth/signin`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      let userData = JSON.parse(JSON.stringify((res && res.body && res.body.data) || {}))
      if (!error) {
        console.log("req",res.body);
        let loginType = userData.loginType
        let jwt = userData.token;
        // user = userData;
        cookie.set('user', (userData || {}), { path: '/' });
        cookie.set('token', jwt, { path: '/' });
        cookie.set('loginType', loginType, { path: '/' });
      }
      if (typeof cb === 'function') return cb(error, userData);
    });
}

function signInCompany(payload, cb) {
Agent
  .fire('post', `${BACKEND_URL}/auth/company/signin`)
  .send(payload)
  .end((err, res) => {
    var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
    let userData = JSON.parse(JSON.stringify((res && res.body && res.body.data) || {}))
    if (!error) {
      console.log("req",res.body);
      let loginType = userData.loginType
      let jwt = userData.token;
      // user = userData;
      cookie.set('user', (userData || {}), { path: '/' });
      cookie.set('token', jwt, { path: '/' });
      cookie.set('loginType', loginType, { path: '/' });
    }
    if (typeof cb === 'function') return cb(error, userData);
  });
}
function getSessionUser() {
  return cookie.get("user")
}



function signUp(payload, cb) {
  Agent
    .fire('post', `${BACKEND_URL}/user/signup`, true)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}

function changePassword(payload, cb) {
  Agent
    .fire('post', `${BACKEND_URL}/auth/changePassword`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
};

function forgotPassword(payload, cb) {
  Agent
    .fire('post', `${BACKEND_URL}/auth/forgotPassword`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
};

function resetPassword(type, userid, token,payload, cb) {
  Agent
  .fire('post', `${BACKEND_URL}/auth/forgotPassword/${type}/${userid}/${token}`)
    .send(payload)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
};
function verifyEmail(type, userid, token, cb) {
  Agent
  .fire('get', `${BACKEND_URL}/auth/verify-email/${type}/${userid}/${token}`)
  .end((err, res) => {
    var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
    if (typeof cb === 'function') return cb(error, res && res.body);
  });
}
function resetDefaultPassword(type, userid, cb) {
  Agent
  .fire('get', `${BACKEND_URL}/auth/resetPassword/${type}/${userid}`)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
};
function resendLink(type, mail, cb) {
  Agent
  .fire('get', `${BACKEND_URL}/auth/resend-verification/${type}/${mail}`)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
};

function changeRole(roleId, cb) {
  let token = cookie.get('token', { path: '/' });
  console.log("token",token);
  
  Agent
  .fire('get', `${BACKEND_URL}/auth/changeRole/${token}/${roleId}`)
  .end((err, res) => {
    var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
    let userData = JSON.parse(JSON.stringify((res && res.body && res.body.data) || {}))
    console.log("userData",userData);
    
    if (!error) {
      let loginType = userData && userData.user && userData.user.loginType
      let jwt = userData.token;
      // cookie.remove('user', { path: '/' });
      // cookie.remove('token', { path: '/' });
      // cookie.remove('loginType', { path: '/' });
      // user = userData.user;
      console.log("jwt",jwt);
      
      cookie.set('user', (userData.user || {}), { path: '/' });
      cookie.set('token', jwt, { path: '/' });
      cookie.set('loginType', loginType, { path: '/' });
    }
    if (typeof cb === 'function') return cb(error, userData);
  });
};
function logout() {
  cookie.remove('user', { path: '/' });
  cookie.remove('token', { path: '/' });
  cookie.remove('loginType', { path: '/' });
  window.location.reload()
}
function getUserDetails( cb) {
  Agent
    .fire('get', `${BACKEND_URL}/auth/me`)
    .end((err, res) => {
      var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
      if (typeof cb === 'function') return cb(error, res && res.body);
    });
}
export default {  
  signIn,
  signUp,
  getUserDetails,
  signInCompany,
  getSessionUser,
//   getPreferredCourses,
  verifyEmail,
  changePassword,
  forgotPassword,
  resetPassword,
  resetDefaultPassword,
  resendLink,
  changeRole,
  logout
}
// export default alt.createActions(SessionActions);

// class SessionActions {

//   signIn(payload, cb) {
//     return (dispatch) => {
//       Agent
//         .fire('post', `${BACKEND_URL}/auth/signin`)
//         .send(payload)
//         .end((err, res) => {
//           var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;

//           dispatch({
//             error: error,
//             data: res && res.body && res.body.data,
//           });
//           if (typeof cb === 'function') return cb(error);
//         });
//     }
//   }
// }
// export default alt.createActions(SessionActions);
