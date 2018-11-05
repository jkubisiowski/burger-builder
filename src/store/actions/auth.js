import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDO4C-yLJgH6ty-EJtxhOpV0eL7l_HyKQY";

    if (isSignUp) {
      url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDO4C-yLJgH6ty-EJtxhOpV0eL7l_HyKQY";
    }

    dispatch(authStart());
    axios
      .post(url, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .then(response => {
        console.log(response.data);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};
