import { ActionType } from '../action-types/index'
import { Action } from '../actions'



const initialState = {
  newReleases: [],
}

const reducer = (state: any = initialState, action: Action): object => {
  switch (action.type) {
    case ActionType.NEW_RELEASES:
      return {
        newReleases: action.payload,
      }
  
    default:
      return state
  }
}

export default reducer