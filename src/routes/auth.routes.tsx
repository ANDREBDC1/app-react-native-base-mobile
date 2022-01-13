import React from "react";

import { createStackNavigator } from '@react-navigation/stack'


import ForgotPassword from '../pages/ForgotPassword';
import SinIn from "../pages/SignIn";
import SinUp from "../pages/SignUp";
// import Preload from '../pages/Preload'

const Auth = createStackNavigator();


const AuthRoutes : React.FC = () =>{


  return (
    <Auth.Navigator
      initialRouteName="SinIn"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312E38'}
      }}
    >
      {/* <Auth.Screen name="Preload" component={Preload} /> */}
      <Auth.Screen name="SinIn" component={SinIn} />
      <Auth.Screen name="SinUp" component={SinUp} />
      <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
    </Auth.Navigator>
  );
}

export default AuthRoutes;