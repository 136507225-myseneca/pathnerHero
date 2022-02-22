import { ActionType } from "../action-types/index"
import { Action } from "../actions"

const initialState = {
    authenticated: false,
    user: {},
    error: '',
};

const reducer = (state: any = initialState, action: Action): object => {
    switch (action.type){
        case ActionType.USER_LOGIN:
            return   {
                error: '',
                user: action.payload,
                authenticated: true,
              }
        case ActionType.USER_LOGOUT:
            return   {
                error: '',
                user: {},
                authenticated: false,
            }
            case ActionType.REFRESH_TOKEN:
                return   {
                   ...state,
                    user: { ...action.payload , ...state.user},
                  
                  }
        default:
            return state
    }
}

export default reducer