import React, {useCallback } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { BottomTabBarProps } from  '@react-navigation/bottom-tabs'
import  { useAuth } from   '../../Contexts/auth'

import { 
  Container,
  TabItem,
  TabItemCenter,
  AvatarIcon 
} from './styles'

const TabBar : React.FC<BottomTabBarProps> = ({ state, navigation, ...rest }) =>{
 
  const { user } = useAuth()

  
  const gotTo = useCallback((screenName: string) => {

  navigation.navigate(screenName)

 }, []); 

  return (
    <Container>
      <TabItem onPress={() => gotTo('Home')}>
        <Icon
          name="home"
          size={35}
          color="#ffffff"
          style={{ opacity: state.index === 0 ? 1 : 0.5 }}
        />
      </TabItem>
      <TabItem onPress={() => gotTo('Search')}>
        <Icon
          name="search"
          size={35}
          color="#ffffff"
          style={{ opacity: state.index === 1 ? 1 : 0.5 }}
        />
      </TabItem>
      <TabItem onPress={() => gotTo('Appointments')}>
        <Icon
          name="today"
          size={35}
          color="#ffffff"
          style={{ opacity: state.index === 2 ? 1 : 0.5 }}
        />
      </TabItem>
      <TabItem onPress={() => gotTo('Profile')}>
        {user.avatar ? (
          <AvatarIcon style={{ opacity: state.index === 3 ? 1 : 0.5 }} source={{ uri: `${user.avatar}` }} />
        ) : (
          <Icon
            name="person"
            size={35}
            color="#ffffff"
            style={{ opacity: state.index === 3 ? 1 : 0.5 }}
          />
        )}
      </TabItem>
    </Container>
  );
}

export default TabBar;