import { ActionType } from "../action-types/index"


interface Login {
    type: ActionType.USER_LOGIN,
    payload: object
}
interface Logout {
    type: ActionType.USER_LOGOUT,

}
interface refreshToken {
    payload: object;
    type: ActionType.REFRESH_TOKEN,

}

interface searchResult {
    payload: Array<object>;
    type: ActionType.SET_SEARCH_RESULT,

}

interface fetchLibary {
    payload: Array<object>;
    type: ActionType.FETCH_LIBARY,

}


interface addTrack {
    payload: object;
    type: ActionType.ADD_TRACK,

}

interface deleteTrack {
    payload: string;
    type: ActionType.DELETE_TRACK,

}

interface newReleases {
    payload:  Array<object>;
    type: ActionType.NEW_RELEASES,

}








export type Action = Login|Logout|refreshToken|searchResult|fetchLibary|addTrack|deleteTrack|newReleases;