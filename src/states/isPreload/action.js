import { hideLoading, showLoading } from "react-redux-loading-bar"
import api from "../../utils/api"
import { setAuthUserActionCreator } from "../authUser/action"

/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */
const ActionType = {
    SET_IS_PRELOAD: 'SET_IS_PRELOAD'
}

function setIsPreloadActionCreator(isPreload) {
    return {
        type: ActionType.SET_IS_PRELOAD,
        payload: {
            isPreload
        }
    }
}

// function thunk
function asyncPreloadProcess() {
    return async (dispatch) => {
        dispatch(showLoading())

        try {
            //  preload process
            const authUser = await api.getOwnProfile()
            dispatch(setAuthUserActionCreator(authUser))
        } catch (error) {
            // fallback process
            dispatch(setIsPreloadActionCreator(null))
        } finally {
            // end process
            dispatch(setIsPreloadActionCreator(false))
        }

        dispatch(hideLoading())
    }
}

export {
    ActionType,
    setIsPreloadActionCreator,
    asyncPreloadProcess
}