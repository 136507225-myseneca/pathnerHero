import React from 'react'
import '../SearchResult/SearchResult.css'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addTrack, deleteTrack } from '../../state/action-creators'
import { toast } from 'react-toastify'
import Remove from '../../assets/delete.png'
import Add from '../../assets/add.png'

const NewReleases = () => {
  const dispatch = useDispatch()

  const { user }: any = useSelector((state: any) => state.auth.user)
  const { newReleases }: any = useSelector((state: any) => state.newReleases)
  const { libary }: any = useSelector((state: any) => state.libary)

  const handleRemoveTrack = (trackId: string) => {
    let trackExist = newReleases.some((track: any) => track.trackId === trackId)

    if (!trackExist) {
      toast.warn('track does not exist in newReleases', {
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
      dispatch(deleteTrack(trackId))
    }
  }

  const handleAddTrack = (
    albumImage: string,
    trackName: string,
    albumName: string,
    trackId: string,
    artistName: string
  ) => {
    const data = {
      _id: user._id,
      albumImage,
      trackName,
      albumName,
      trackId,
      artistName,
    }

    let trackExist = newReleases.some((track: any) => track.trackId === trackId)

    if (trackExist) {
      toast.warn('track alread exist in newReleases', {
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
      dispatch(addTrack(data))
    }
  }

  return (
    <Container className='d-flex flex-column py-1 my-1 lib-border'>
      <div className='lib-heading'>New Releases</div>
      <Row>
        {newReleases?.length !== 0 ? (
          newReleases.map((track: any) => {
            const trackExist = libary.some(
              (libTrack: any) => libTrack.trackId === track.id
            )
            return (
              <Col key={track.id} sm={6} md={4} lg={3} className='lb-mg'>
                <div className='lib-item'>
                  <img
                    src={track.images[1].url}
                    alt='ablum-art'
                    className='bg-ablum-art'
                  />
                  <div className='lb-track-name'>{track.name}</div>
                  <div className='lb-track-artist'>{track.artists[0].name}</div>

                  {trackExist ? (
                    <div className='lb-icon-con'>
                      <img
                        src={Remove}
                        alt='icon'
                        className='remove-icon'
                        onClick={() => handleRemoveTrack(track.id)}
                      />
                    </div>
                  ) : (
                    <div className='lb-icon-con'>
                      <img
                        src={Add}
                        alt='icon'
                        className='remove-icon'
                        onClick={() =>
                          handleAddTrack(
                            track.images[1].url,
                            track.name,
                            track.name,
                            track.id,
                            track.artists[0].name
                          )
                        }
                      />
                    </div>
                  )}
                </div>
              </Col>
            )
          })
        ) : (
          <div>LOGIN TO SEARCH AND USE APP</div>
        )}
      </Row>
    </Container>
  )
}

export default NewReleases
