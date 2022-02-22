import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export default function useAuth() {
  const navigate = useNavigate()
  const user: any = useSelector((state: any) => state.auth.user.user)
  const [accessToken2, setAccessToken] = useState()
  const [_id, set_Id] = useState()
  const [refreshToken2, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState<number>()

  useEffect(() => {
    setAccessToken(user?.accessToken)
    setExpiresIn(62)
    setRefreshToken(user?.refreshToken)
    set_Id(user?._id)
  }, [user])

  useEffect(() => {
    if (!refreshToken2 || !expiresIn) return

    const interval = setInterval(() => {
      axios
        .post(`/api/users/auth/refresh`, {
          refreshToken2,
          _id,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          navigate('/')
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken2, expiresIn])

  return accessToken2
}
