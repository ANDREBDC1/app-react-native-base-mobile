import styled  from "styled-components/native";
import { Platform } from 'react-native'
import { Form } from '@unform/mobile';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 110 : 40}px;
`;

export const Title = styled.Text`
  color:  #fff;
  font-size: 20px;
  margin: 10px;
  
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 10px;
`;

 export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
 `;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding:  10px 0;

  
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #4cc9f0;
  font-size: 16px;
  margin-left: 16px;

`;

export const FormContainer = styled(Form)`
 width: 100%;
`