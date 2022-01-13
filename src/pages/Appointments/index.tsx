import React from 'react'
import { useAuth } from '../../Contexts/auth'

import {
  Container,
  Title
} from './styles'



const Appointments : React.FC = () =>{

  const { signOut, user } = useAuth()

  return (
    <Container>
      <Title>Appointments</Title>
    </Container>
  )
}

export default Appointments;