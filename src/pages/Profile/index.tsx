import React, { useCallback, useState, useRef, useEffect  } from 'react'
import { 
  Alert, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput, 
  Image
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import Person from '../../assets/person.svg'
import api from '../../services/api'
import { useAuth, User } from '../../Contexts/auth'
import ImagemPicker from '../../components/ImgemPicker';
import getValidationErrors from '../../utils/getValidationErros'
import Input from '../../components/Input';
import Button  from '../../components/Button';
import {
  Container,
  Title,
  Hearder,
  BackToDashbod,
  ButtonAvatar,
  Avatar,
  FormContainer,
  ContainerAvatar,
  ContainerBody
} from './styles'

interface ImagemFileData {
  path: string,
  mime: string
}

interface UserData {
  name: string,
  email: string,
  password: string
}


const Profile : React.FC = () =>{

  const navigation = useNavigation()
  const { updateUser, user } = useAuth()
  const avatarRef = useRef<Image>()
  const formRef = useRef<FormHandles>(null)
  const sheetRef = useRef<RBSheet>(null);
  const inputEmailRef =  useRef<TextInput>(null)
  const inputPasswordRef =  useRef<TextInput>(null)
  const inputPasswordConfirmationRef=  useRef<TextInput>(null)
  const [loading, setLoading] = useState(false)
  
  const handleUpdateUser = useCallback( async ( data : UserData) => {
    try{

      setLoading(true)

      

      formRef.current?.setErrors({});

      const validations = !data.password 
      ? {
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
            password: Yup.string().notRequired(),
            password_confirmation: Yup.string().notRequired()
        }
      : {
        name: Yup.string().required('Nome Obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Confirmação incorreta"),
      }

      const schema = Yup.object().shape({...validations})

      await schema.validateSync(data, {
        abortEarly: false
      })

      const response  = await api.put<User>('/users', {...data})

      updateUser(response.data)
      Alert.alert(
        'Operação realizada com sucesso!',
      );
      

    }catch (err){
      
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        setLoading(false)
        return;
      }

      Alert.alert(
        'Erro na atualização dos dados do perfil',
        'Ocorreu um erro na atualização dos dados do perfil, cheque as informações.',
      );

    }

    setLoading(false)

  },[updateUser])
  const handleUpdateAvatar = useCallback( async (fileData : Object) => {

    try{

      const {path, mime} = fileData as ImagemFileData
      const data = new FormData();

      data.append('avatar', {
        type: mime,
        name: `${user.id}.jpg`,
        uri: path,
      })

      const response = await api.patch<User>('/users/avatar', data)

     updateUser(response.data)

    }catch(err) {
      console.log(err)
    }finally{
      sheetRef.current?.close()
    }

  },[user.id, updateUser])

  const handleSelectedAvatar = useCallback( async () => {
    sheetRef.current?.open();
  },[])

  return (
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
          <BackToDashbod onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={30} color="#515455" />
          </BackToDashbod>
          <Hearder />

          <ContainerBody>
            <ContainerAvatar>
              <ButtonAvatar onPress={handleSelectedAvatar}>
                {user.avatar ? (
                  <Avatar
                    resizeMode="contain"
                    source={{ uri: `${user.avatar}` }}
                  />
                ) : (
                  <Person width='110' height='110' fill='#FFF' />
                )}
              </ButtonAvatar>
            </ContainerAvatar>
            <Title>Perfil</Title>

            <FormContainer
              ref={formRef}
              onSubmit={handleUpdateUser}
              initialData={user}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
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
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputPasswordRef.current?.focus();
                }}
              />

              <Input
                ref={inputPasswordRef}
                name="password"
                icon="lock"
                placeholder="Nova Senha"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  inputPasswordConfirmationRef.current?.focus();
                }}
              />
              <Input
                ref={inputPasswordConfirmationRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirma Nova Senha"
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
                {loading ? 'Aguarde...' : 'Confirmar mudanças'}
              </Button>
            </FormContainer>
          </ContainerBody>
        </Container>
        <ImagemPicker ref={sheetRef} onFileSelected={handleUpdateAvatar} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Profile;