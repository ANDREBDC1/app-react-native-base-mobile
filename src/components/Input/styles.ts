import styled, {css} from "styled-components/native";
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean
  isError: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border: 2px solid #232129;

  ${(props) => props.isError &&
    css`border-color: #c53030;` 
  }

  ${(props) => props.isFocused &&
    css`border-color: #2196f3;` 
  }
  
` 
export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  
  
`

export const Icon = styled(FeatherIcon)`
  margin-right: 5px;
`