import React, { useRef, useCallback} from 'react';
import { 
  Platform, 
  KeyboardAvoidingView, 
  View, 
  ScrollView,
  TextInput,
  Alert,
 } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErros';
import Button  from '../../components/Button';
import Input from '../../components/Input';
import {SignInCredentials, useAuth} from '../../Contexts/auth'


import { 
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
  FormContainer
 } from './styles';
 import LogoImg from '../../assets/logo.svg'

const SinIn: React.FC = () => {

  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const handleSignIn = useCallback( async ( credentials : SignInCredentials) => {
    try{

      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });


      await schema.validateSync(credentials, {
        abortEarly: false
      })

      await signIn(credentials)

      Alert.alert(
        'Login realizado com sucesso!'
      );

    }catch (err){
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        console.log(errors);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais.',
      );

    }

  }, [signIn])

  const navigation = useNavigation()
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
              <Title>Faça seu login</Title>
            </View>
            <FormContainer ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="email"
                icon="mail"
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
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
                Entar
              </Button>
            </FormContainer>

            <ForgotPassword
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SinUp')}>
        <Icon name="log-in" size={20} color="#4cc9f0" />
        <CreateAccountButtonText>Criar sua conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SinIn;
