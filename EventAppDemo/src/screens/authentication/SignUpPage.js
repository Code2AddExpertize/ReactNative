import React, { useContext, useState } from 'react';
import { Text, View,SafeAreaView,Image, Alert} from 'react-native';
import Constants from '../../constants/Constants';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {CommonStyles} from '../../components/CommonStyles';
import {validateEmail} from '../../Utils/Validator';
import Spinner from 'react-native-loading-spinner-overlay';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { AuthContext } from '../../store/auth-context';
export default function SignUpPage({navigation}) {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const marginBetween=20;
    const [fullName, setFullName] = useState('');
    const handleFullNameChangeText = (text) => {
      const filteredText = text.replace(/[^a-zA-Z ]/g, '');
      setFullName(filteredText);
    };
      
    const [email, setEmail] = useState('');
    const handleEmailChangeText = (text) => {
      const filteredText = text.replace(/[^a-zA-Z@.0-9]/g, '');
        setEmail(filteredText);
      };
    const [password, setPassword] = useState('');
    const handlePasswordChangeText = (text) => {
        setPassword(text);
      };
    
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleconfirmPasswordChangeText = (text) => {
      setConfirmPassword(text);
      };
    const path ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShhZ8C0MlrxBBukdknfTwTeB1TIMARynYEwVDpG2mMmZ2qqiap6TNz3jpBxYkSymXOtE4&usqp=CAU';
    const isValid=validateEmail(email) && fullName!=="" && password === confirmPassword;

    const signUp = () =>{
      let name=JSON.stringify(fullName);
      const update = {
        displayName: `${name}`,
      };
      setLoading(true);
      try{
        createUserWithEmailAndPassword(FIREBASE_AUTH,email,password).then(
          (resp)=>{
            setLoading(false);
            const user= FIREBASE_AUTH.currentUser
            // console.log(`User:${JSON.stringify(user)}`);
            setLoading(true);
            updateProfile(user,update).then(()=>{
              // console.log(`User:${JSON.stringify(FIREBASE_AUTH.currentUser)}`);
              setLoading(false);
              // console.log(`Resp:${resp}`);
              authCtx.authenticate("SignUpToken");
            });
          }
        ).catch((error)=>{
          console.log(error);
          Alert(`Error:${error}`);
        });
        // console.log(response);
      }catch(error){
        // console.log(error);
        alert('Sign in failed:'+error);
      }finally{
        setLoading(false);
      }
    }

    const signUpCallBack=()=>{
      if(isValid){
        signUp();
        // console.log(`SignUp Callback:${isValid}`);
      }else{
        alert(`Either Name, Mail and Password is not Valid`);
      }
  };
  return (
    <SafeAreaView style={CommonStyles.container}>
      <Spinner visible={loading} 
        textContent={'Loading...'}
        textStyle={{
          color: '#FFF'
        }}
      />
        <Image style={CommonStyles.tinyLogo} source={{
          uri: path,
        }}/>
      <View height={marginBetween}/>
      <CustomTextInput 
        placeholderVal="Full Name"
        changeLstnr={handleFullNameChangeText}
        initialVal={fullName}
       />  
       <View height={marginBetween}/>
       <CustomTextInput 
        placeholderVal="E-mail"
        changeLstnr={handleEmailChangeText}
        initialVal={email}
       />  
       <View height={marginBetween}/>
      <CustomTextInput
        placeholderVal="Password"
        changeLstnr={handlePasswordChangeText}
        initialVal={password}
        isSecure={true}
      />
      <View height={marginBetween}/>
      <CustomTextInput
        placeholderVal="Confirm Password"
        changeLstnr={handleconfirmPasswordChangeText}
        initialVal={confirmPassword}
        isSecure={true}
      />
      <View height={marginBetween}/>  
      <CustomButton
        titleVal="Create account"
        onPressClbck={signUpCallBack}
      />
      <View height={marginBetween}/>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text>Already got an account?? </Text>
        <Text 
          style={{ color: 'blue'}} 
          onPress={()=> navigation.navigate(Constants.LoginPageStr)}>
            Log in
        </Text>
      </View>
    </SafeAreaView>
  );
}


