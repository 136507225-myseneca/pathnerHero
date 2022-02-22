import { combineReducers } from "redux";

import authReducer from "./authReducer"
import searchReducer from "./searchReducer"
import libaryReducer from './libaryReducer'
import newReleasesReducer from './NewRelases'

const reducers = combineReducers({

    auth: authReducer,
    searchvalue: searchReducer,
    libary: libaryReducer,
    newReleases:newReleasesReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>