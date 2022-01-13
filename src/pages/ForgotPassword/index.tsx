import React, { useCallback, useRef, useState } from 'react';
import { Platform, KeyboardAvoidingView, View, ScrollView, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import Imput from '../../components/Input';
import Button  from '../../components/Button';
import api from '../../services/api'

import { 
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  FormContainer
 } from './styles';
 import LogoImg from '../../assets/logo.svg'
import getValidationErrors from '../../utils/getValidationErros';



const ForgotPassword: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null);
  const handleSignUp = useCallback( async ( email : string) => {
    try{

      setLoading(true)

      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validateSync(email, {
        abortEarly: false
      })

      await api.post('/users/forgotpassword', email)
      Alert.alert(
        'Operação realizado com sucesso!',
        'Verifique seu email para resetar sua senha.',
      );

      // setLoading(false)
      navigation.goBack()

    }catch (err){
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        setLoading(false)
        return;
      }

      Alert.alert(
        'Erro ao enviar email',
        'Ocorreu um erro ao enviar, verifique o email digitado!',
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
              <Title>Digite seu email</Title>
            </View>
            <FormContainer
              ref={formRef}
              onSubmit={handleSignUp}
            >
              
              <Imput 
                name="email" 
                icon="mail" 
                placeholder="Email"
                keyboardType="email-address" 
              />
              <Button
                enabled={!loading}
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                {loading ? 'Aguarde...': 'Enviar'}
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

export default ForgotPassword;
