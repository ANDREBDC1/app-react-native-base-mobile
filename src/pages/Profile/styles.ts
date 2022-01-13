import styled  from "styled-components/native";
import { Form } from '@unform/mobile';
import { Platform } from 'react-native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  align-content: center;
  background-color: #63c2d1;
`;

export const BackToDashbod = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  left: 5px;

`;


export const Hearder = styled.View`
  height: 70px;
  
`;

export const ContainerAvatar = styled.View`
 
  margin-top: -50px;
  margin-right: 150px;
  
  
`;

export const ButtonAvatar = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  border-radius: 20px;
  border-width: 4px;
  border-color: #fff;
  margin-left: 30px;
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

export const ContainerBody = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #312E38;
  border-top-left-radius: 60px ;
  padding: 0 30px ${Platform.OS === 'android' ? 180 : 40}px;
  
`;

export const Title = styled.Text`
  color:  #fff;
  font-size: 20px;
  margin: 10px;
  margin-top: 10px;
  text-align: center;
  
`;

export const FormContainer = styled(Form)`
 flex: 1;
`



