import React, 
{ 
  createContext, 
  useContext, 
  useCallback, 
  useState,
  useEffect
 } from "react";

 import { Alert } from 'react-native'

 import AsyncStorage from '@react-native-community/async-storage'; 
 import { AxiosResponse } from 'axios';
 import api from '../services/api'

interface UserData {
  [key: string] : string | number
}

interface AuthState {
  token: string,
  user: UserData
}

export interface SignInCredentials {
  email: string
  password : string
}

export interface User{
  id: string;
  name: string;
  email: string;
  avatar: string;

}

interface AuthContexData {
  signIn(credentials : SignInCredentials) : void 
  signOut() : void,
  updateUser(user: User): void
  user: UserData,
  loading: boolean
}


const AuthContext = createContext({} as AuthContexData)

const AuthProvider: React.FC = ({ children }) =>{

  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loading, setLoading] = useState(true)

  const signOut = useCallback( async () => {
    await AsyncStorage.multiRemove([
      '@AppBarber:token',
    ])

    setData({} as AuthState)
  }, [])

  useEffect(() => {
    async function loadStoragedData() : Promise<void> {
      const tokenRefresh = await AsyncStorage.getItem('@AppBarber:token');
      
      try {

        if(tokenRefresh){
          api.defaults.headers.common['Authorization'] = `Bearer ${tokenRefresh}` 

          api.defaults.validateStatus = (status) => {

            if(status === 401){
              Alert.alert('Sessão expirada, faça login novamente!')
              setData({} as AuthState)
              return false;
            }

            if(status === 200){

              return true

            }

            return false
          }

          const response = await api.get<AuthState>('/sessions/refreshToken')

          const {token, user} = response.data

          if(token){

            await AsyncStorage.setItem('@AppBarber:token', token)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            

            setData({ token, user})

          }
        }
      } catch (err) {
        api.defaults.headers.common['Authorization'] = '';
        await AsyncStorage.multiRemove(['@AppBarber:token']);
        setData({} as AuthState);
      }

      setLoading(false);
    }
   
    loadStoragedData();

  },[signOut])

  const signIn = useCallback( async ( { email, password }) => {
    
    const response : AxiosResponse<AuthState>  = await api.post('/sessions', {
      email, 
      password
    })

    const {token, user} = response.data;

    await AsyncStorage.multiSet([
      ['@AppBarber:token', token]
    ])

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setData({token, user})

  }, [])

  const updateUser = useCallback(({name, email, avatar, id}: User) => {
    const user  = { id, name, email, avatar}
    // await AsyncStorage.setItem(
    //   '@AppBarber:user', 
    //   JSON.stringify(user));

    // api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

    setData({
      token: data.token,
      user,
    });
  }, [data.token, setData]);

  return (
    <AuthContext.Provider value={{ 
      loading, 
      user: data.user, 
      signIn, 
      signOut,
      updateUser
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth( ) : AuthContexData {

  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthContext');
  }

  return context;

}

export { AuthProvider, useAuth }



