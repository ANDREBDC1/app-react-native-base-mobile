import React from 'react'
import { useAuth } from '../../Contexts/auth'

import {
  Container,
  Title
} from './styles'



const Search : React.FC = () =>{

  const { signOut, user } = useAuth()

  return (
    <Container>
      <Title>Search</Title>
    </Container>
  )
}

export default Search;