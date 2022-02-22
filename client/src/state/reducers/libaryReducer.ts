import { ActionType } from '../action-types/index'
import { Action } from '../actions'

const initialState = {
  libary: [],
}

const reducer = (state: any = initialState, action: Action): object => {
  switch (action.type) {
    case ActionType.FETCH_LIBARY:
      return {
        libary: action.payload,
      }
    case ActionType.ADD_TRACK:
      console.log(action.payload)
      return {
        libary: [action.payload, ...state.libary],
      }
    case ActionType.DELETE_TRACK:
      return {
        libary: state.libary.filter((x: any) => x.trackId !== action.payload),
      }

    default:
      return state
  }
}

export default reducer
