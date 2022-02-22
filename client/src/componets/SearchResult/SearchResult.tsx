import React from 'react'
import './SearchResult.css'
import { useSelector, useDispatch } from 'react-redux'
import Add from '../../assets/plus.svg'
import Remove from '../../assets/minus.svg'
import { addTrack, deleteTrack } from '../../state/action-creators'
import { toast } from 'react-toastify'

const SearchResult = () => {
  const { searchval }: any = useSelector((state: any) => state.searchvalue)
  const { user }: any = useSelector((state: any) => state.auth.user)
  const { libary }: any = useSelector((state: any) => state.libary)

  const dispatch = useDispatch()

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

    let trackExist = libary.some((track: any) => track.trackId === trackId)

    if (trackExist) {
      toast.warn('track alread exist in libary', {
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

  return (
    <div className='results-con'>
      {searchval.length !== 0 && (
        <div className='lib-heading'>Search Result</div>
      )}
      {searchval.length !== 0 &&
        searchval.map((track: any) => {
          const smallestAlbumImage: any = track.album.images.reduce(
            (smallest: any, image: any) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          const trackExist = libary.some(
            (libTrack: any) => libTrack.trackId === track.id
          )
          return (
            <div key={track.id} className='track-con mt-2'>
              <div className='track-item'>
                <div className='flex-left'>
                  <div className='flex-con title-con'>
                    <div className='album-art '>
                      <img
                        src={smallestAlbumImage.url}
                        alt='album art'
                        className='album-art-icon'
                      />
                    </div>
                    <div className='song-title'>{track.name}</div>
                  </div>
                  <div className='flex-con name-con'>
                    <div className='album-name'>{track.album.name}</div>
                  </div>
                  <div className='flex-con'>
                    <div className='artist-name'>{track.artists[0].name}</div>
                  </div>
                </div>

                {trackExist ? (
                  <div className='flex-con lib'>
                    <img
                      src={Remove}
                      alt='icon'
                      className='lib-icon'
                      onClick={() => handleRemoveTrack(track.id)}
                    />
                  </div>
                ) : (
                  <div className='flex-con lib'>
                    <img
                      src={Add}
                      alt='icon'
                      className='lib-icon'
                      onClick={() =>
                        handleAddTrack(
                          track.album.images[1].url,
                          track.name,
                          track.album.name,
                          track.id,
                          track.artists[0].name
                        )
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default SearchResult
