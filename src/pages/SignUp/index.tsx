import React, { useCallback, useRef, useState } from 'react';
import { 
  Platform, 
  KeyboardAvoidingView, 
  View, 
  ScrollView,
  Alert,
  TextInput
 } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { AxiosResponse } from 'axios';
import Input from '../../components/Input';
import Button  from '../../components/Button';
import api from '../../services/api'
import user from '../../config/user'

import { 
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  FormContainer
 } from './styles';
 import LogoImg from '../../assets/logo.svg'
import getValidationErrors from '../../utils/getValidationErros';

interface SignUpData {
  name: string,
  email: string,
  password: string
}

interface PermissionData {
  id: string,
  descript: string
}

const SignUp: React.FC = () => {
  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const inputEmailRef =  useRef<TextInput>(null)
  const inputPasswordRef =  useRef<TextInput>(null)
  const [loading, setLoading] = useState(false)
  const handleSignUp = useCallback( async ( data : SignUpData) => {
    try{

      setLoading(true)

      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });



      await schema.validateSync(data, {
        abortEarly: false
      })

      const response: AxiosResponse<PermissionData[]> = await  api.get('/permissions/all')

      const permissions =  response.data

      const roles = permissions.filter(p => p.descript === user.type).map(p => p.id)


      await api.post('/users', {...data, roles})
      Alert.alert(
        'Cadastro realizado com sucesso!',
        'Você já pode fazer login na aplicação.',
      );
      navigation.goBack()

    }catch (err){
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        setLoading(false)
        return;
      }

      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro no cadastro, cheque as informações.',
      );

    }

    setLoading(false)

  }, [navigation])
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <View>
              <LogoImg width={120} height={120} fill="#fff" />
            </View>
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <FormContainer
              ref={formRef}
              onSubmit={handleSignUp}
            >
              <Input 
                name="name" 
                icon="user" 
                placeholder="Nome"
                returnKeyType='next'
                onSubmitEditing={() => {
                  inputEmailRef.current?.focus();
                }}
              />
              <Input 
                ref={inputEmailRef}
                name="email" 
                icon="mail" 
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType='next'
                onSubmitEditing={() => {
                  inputPasswordRef.current?.focus();
                }} 
              />
              <Input 
                ref={inputPasswordRef}
                name="password" 
                icon="lock" 
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}  
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                { loading ? 'Aguarde...':  'Cadastrar'}
              </Button>
            </FormContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Volta para login</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
