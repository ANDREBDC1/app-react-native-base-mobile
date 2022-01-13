import React from 'react'
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs'
// import { useAuth } from '../../Contexts/auth'
import TabBar from '../../components/TabBar'
import Home from '../Home'
import Search from '../Search'
import Appointments from '../Appointments'
import Profile from '../Profile'

const Tab = createBottomTabNavigator()

const Dashboard : React.FC = () =>{

  // const { signOut, user } = useAuth()

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{headerShown: false}}
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Appointments" component={Appointments} />
      {/* <Tab.Screen name="Profile" component={Home} /> */}
    </Tab.Navigator>
  );
}

export default Dashboard;