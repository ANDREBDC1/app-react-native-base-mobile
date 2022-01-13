import styled, {css} from "styled-components/native";



export const Container = styled.View`
  
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  
`;

export const TabItem = styled.TouchableOpacity`
  padding: 10px 10px;
`;


export const TabItemCenter = styled.TouchableOpacity`
`;

export const AvatarIcon = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;
