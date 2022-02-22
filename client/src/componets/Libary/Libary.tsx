import React from 'react'
import './Libary.css'

import Remove from '../../assets/delete.png'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTrack } from '../../state/action-creators'
import { toast } from 'react-toastify'
const Libary = () => {
  const dispatch = useDispatch()

  const handleRemoveTrack = (trackId: string) => {
    let trackExist = libary.some((track: any) => track.trackId === trackId)

    if (!trackExist) {
      toast.warn('track does not exist in libary', {
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

  const { libary }: any = useSelector((state: any) => state.libary)
  return (
    <Container className='d-flex flex-column py-1 my-1 lib-border'>
      <div className='lib-heading'>Libary</div>
      <Row>
        {libary?.length !== 0 ? (
          libary.map((track: any) => {
            return (
              <Col key={track.id} sm={6} md={4} lg={3} className='lb-mg'>
                <div className='lib-item'>
                  <img
                    src={track.albumImage}
                    alt='ablum-art'
                    className='bg-ablum-art'
                  />
                  <div className='lb-track-name'>{track.trackName}</div>
                  <div className='lb-track-artist'>{track.artistName}</div>
                  <div className='lb-icon-con'>
                    <img
                      src={Remove}
                      alt='icon'
                      className='remove-icon'
                      onClick={() => handleRemoveTrack(track.trackId)}
                    />
                  </div>
                </div>
              </Col>
            )
          })
        ) : (
          <div>Libary Empty</div>
        )}
      </Row>
    </Container>
  )
}

export default Libary
