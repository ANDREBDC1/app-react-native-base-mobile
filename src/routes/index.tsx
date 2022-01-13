import React from 'react';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import Preload from '../pages/Preload'


import { useAuth } from '../Contexts/auth'

const Routes : React.FC = () =>{

  const { user, loading } = useAuth()

  if(loading){
    return <Preload />
  }

  return user ? <AppRoutes /> : <AuthRoutes />

}

export default Routes;