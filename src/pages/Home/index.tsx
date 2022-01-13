import React from 'react'
import { useAuth } from '../../Contexts/auth'

import {
  Container,
  Title
} from './styles'



const Home : React.FC = () =>{

  const { signOut, user } = useAuth()

  return (
    <Container>
      <Title>Home</Title>
    </Container>
  )
}

export default Home;