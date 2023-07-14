import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

/**
 * @TODO: Define all the actions (creator) for the authUser state
 */
const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USE: 'UNSET_AUTH_USE',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USE,
    payload: {
      authUser: null,
    },
  };
}

// function thunk

function asyncSetAuthUser({id, password}) {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      const token = await api.login({id, password})
      api.putAccessToken(token)

      const authUser = await api.getOwnProfile()
      dispatch(setAuthUserActionCreator(authUser))
    } catch (error) {
      alert(error.message)
    }

    dispatch(hideLoading())
  }
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(unsetAuthUserActionCreator())
    api.putAccessToken('')
    dispatch(hideLoading())
  }
}

export { 
  ActionType, 
  setAuthUserActionCreator, 
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
