import * as React from 'react'
import { Container } from 'react-bootstrap'
import SearchResult from '../componets/SearchResult/SearchResult'
import NewReleases from '../componets/NewReleases/NewRelease'

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <Container className='d-flex flex-column py-1 my-1'>
      <NewReleases />
      <SearchResult />
    </Container>
  )
}
