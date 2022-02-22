import React, { FC, ChangeEvent, useState, useEffect } from 'react'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import Search from '../../assets/search.svg'
import Avatar from '../../assets/avatar.svg'
import Login from '../../assets/login.svg'
import Logout from '../../assets/logout.svg'
import Libary from '../../assets/libary.svg'
import useAuth from '../../util/useAuth'
import { Dropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'

import {
  removeUser,
  updateSearch,
  setNewReleases,
} from '../../state/action-creators'
import { toast } from 'react-toastify'
import SpotifyWebApi from 'spotify-web-api-node'

type Props = {
  children?: any
  onClick?: React.MouseEventHandler<HTMLElement>
}

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.React_App_clientID,
  clientSecret: process.env.React_App_clientSecret,
})

const Header: FC<Props> = (props: Props) => {
  const navigate = useNavigate()
  const accessToken = useAuth()
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [search, setSearch] = useState<string | null>('')

  const authenticated: boolean = useSelector(
    (state: any) => state.auth.authenticated
  )

  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 200) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  const dispatch = useDispatch()
  let navbarClasses = ['header']

  useEffect(() => {
    if (!accessToken) {
      toast.info(' Login to Search for Songs ', {
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
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi
      .getNewReleases({ limit: 8, offset: 0, country: 'AM' })
      .then((res: any) => {
        dispatch(setNewReleases(res.body.albums.items))
        console.log(res.body.albums.items)
      })
  }, [accessToken])

  useEffect(() => {
    if (!search) {
      dispatch(updateSearch([]))
    } else {
      if (!accessToken) return

      spotifyApi.searchTracks(search).then((res: any) => {
        dispatch(updateSearch(res.body.tracks.items))
      })
    }
  }, [search, accessToken, dispatch])

  const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  if (scrolled) {
    navbarClasses.push('scrolled')
  }

  const CustomToggle = React.forwardRef<Props>(
    ({ children, onClick }: Props, ref: any) => (
      <div
        ref={ref}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault()
          if (onClick) onClick(e)
        }}
      >
        {children}
      </div>
    )
  )
  const handleLogin = () => {
    window.open(
      `${process.env.React_App_API_URL}/api/users/auth/spotify`,
      '_self'
    )
  }
  const handelGetLibary = () => {
    if (!authenticated) {
      toast.info(' Login to View Libary', {
        position: 'top-center',
        theme: 'dark',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      navigate('/libary')
    }
  }
  const handleLogout = () => {
    dispatch(removeUser())
  }

  return (
    <div className={navbarClasses.join(' ')}>
      <div className='header-con'>
        <div className='header-info-con'>
          {authenticated ? (
            <NavLink to='/' className='header-info'>
              <img src={Avatar} alt='avatar' className='avatar-img' />

              <div className='header-name'>Tobe Segun</div>
            </NavLink>
          ) : null}
        </div>

        <div className='search-container'>
          <img src={Search} alt='search-icon' className='search-icon' />

          <input className='search-input' type='text' onChange={handelChange} />
        </div>

        <div className='right-nav '>
          <div className='header-libary' onClick={handelGetLibary}>
            <img src={Libary} className='img-icon' alt='libary' />
            <div className='text'>Libary </div>
          </div>

          {authenticated ? (
            <div className='header-logout' onClick={handleLogout}>
              <img src={Logout} alt='avatar' className='img-icon' />
              <div className='text'>logout</div>
            </div>
          ) : (
            <div className='header-logout' onClick={handleLogin}>
              <img src={Login} alt='avatar' className='img-icon' />
              <div className='text'>login</div>
            </div>
          )}
        </div>

        <Dropdown className='header-info-con2'>
          <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
            <div className='header-info'>
              <img src={Avatar} alt='avatar' className='avatar-img' />

              {authenticated && <div className='header-name'>Tobe Segun</div>}
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>
              <div className='header-libary' onClick={handelGetLibary}>
                <img src={Libary} className='img-icon' alt='libary' />
                <div className='text'>Libary </div>
              </div>
            </Dropdown.Item>
            {authenticated ? (
              <Dropdown.Item href='#/action-2'>
                <div className='header-logout' onClick={handleLogout}>
                  <img src={Login} alt='avatar' className='img-icon' />
                  <div className='text'>logout</div>
                </div>
              </Dropdown.Item>
            ) : (
              <Dropdown.Item href='#/action-2'>
                <div className='header-logout' onClick={handleLogin}>
                  <img src={Login} alt='avatar' className='img-icon' />
                  <div className='text'>login</div>
                </div>
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
