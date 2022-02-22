import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { Action } from '../actions/index'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

export const setUser = (payload: object) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.USER_LOGIN,
      payload: payload,
    })
  }
}

export const removeUser = () => {
  return async (dispatch: Dispatch<Action>) => {
    await axios
      .get(`${process.env.React_App_API_URL}/api/users/auth/logout`, {
        withCredentials: true,
      })
      .catch((err) => {
        console.log(err)
      })
    dispatch({
      type: ActionType.USER_LOGOUT,
    })
  }
}

export const updateSearch = (payload: Array<object>) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_SEARCH_RESULT,
      payload: payload,
    })
  }
}

export const getLibary = (spotifyId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const { data }: AxiosResponse | any = await axios
      .get(
        `${process.env.React_App_API_URL}/api/users/auth/libary/${spotifyId}`,
        {
          withCredentials: true,
        }
      )
      .catch((err) => {
        console.log(err)
      })

    dispatch({
      type: ActionType.FETCH_LIBARY,
      payload: data,
    })
 
  }
}

export const addTrack = (track: object) => {
  return async (dispatch: Dispatch<Action>) => {
    const { data }: AxiosResponse | any = await axios
      .post(`${process.env.React_App_API_URL}/api/users/auth/libary`, track, { withCredentials: true })
      .catch((err) => {
        console.log(err)
      })

    dispatch({
      type: ActionType.ADD_TRACK,
      payload: data,
    })

    if (data) {
      toast.success('Song Add to Libary', {
        position: 'top-center',
        theme: 'dark',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  
  }
}

export const deleteTrack = (id: any) => {
  return async (dispatch: Dispatch<Action>) => {
    const { data }: AxiosResponse | any = await axios
      .delete(`${process.env.React_App_API_URL}/api/users/auth/libary/${id}`, {
          withCredentials: true,
        
      })
      .catch((err) => {
        console.log(err)
      })

    dispatch({
      type: ActionType.DELETE_TRACK,
      payload: id,
    })
    if (data) {
        toast.success('Song has been Removed Libary', {
          position: 'top-center',
          theme: 'dark',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
  }
}

export const setNewReleases = (payload: Array<object>) => {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: ActionType.NEW_RELEASES,
        payload: payload,
      })
    }
  }