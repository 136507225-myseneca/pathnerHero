import { ActionType } from "../action-types/index"
import { Action } from "../actions"

const initialState = {
    searchval: [],
};

const reducer = (state: any = initialState, action: Action): object => {
    switch (action.type){
        case ActionType.SET_SEARCH_RESULT:
            return Object.assign({}, state, {
                searchval: action.payload,
              });
   
        default:
            return state
    }
}

export default reducer