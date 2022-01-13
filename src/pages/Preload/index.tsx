import React, { useEffect } from 'react';
import Logo from '../../assets/logo.svg'
import { 
  Container,
  LoadigIcon
} from './styles';

const SinIn: React.FC = () => {
  return (
    <Container>
     <Logo width={200} height={200} fill="#fff" />
     <LoadigIcon size='large' color='#999' />
    </Container>
  );
};

export default SinIn;
